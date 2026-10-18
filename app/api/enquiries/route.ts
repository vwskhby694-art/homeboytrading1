import { NextRequest, NextResponse } from "next/server";
import { validateEnquiry } from "@/app/lib/enquiry-validation";
import { getSupabaseAdmin } from "@/app/lib/supabase-server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestWindows = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 24_000) return NextResponse.json({ message: "Request is too large." }, { status: 413 });

  const clientId = getClientId(request);
  if (!withinRateLimit(clientId)) {
    return NextResponse.json({ message: "Too many enquiries. Please wait before trying again." }, { status: 429 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 24_000) return NextResponse.json({ message: "Request is too large." }, { status: 413 });
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const validation = validateEnquiry(body);
  if (!validation.data) return NextResponse.json({ message: "Review the enquiry fields.", errors: validation.errors }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        message: "The enquiry service is not configured. No delivery was attempted."
      },
      { status: 503 }
    );
  }

  const value = validation.data;
  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      form_version: "2026-10-16-nexaai-v2",
      lead_status: "new",
      full_name: value.fullName,
      email: value.email,
      phone: value.phone,
      country: value.country,
      preferred_package: value.preferredPackage,
      preferred_service: value.preferredService || null,
      trading_experience: value.experience || null,
      message: value.message || null,
      privacy_accepted: value.privacyAccepted,
      consent_version: "privacy-enquiry-v1",
      campaign_attribution: value.attribution,
      landing_page: value.landingPage || null,
      referrer: value.referrer || null
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Supabase enquiry insert failed", { code: error?.code, details: error?.details });
    return NextResponse.json({ message: "The enquiry service did not confirm delivery. No success was recorded." }, { status: 502 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}

function getClientId(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function withinRateLimit(clientId: string) {
  const now = Date.now();
  const active = (requestWindows.get(clientId) ?? []).filter((time) => now - time < WINDOW_MS);
  if (active.length >= MAX_REQUESTS) return false;
  active.push(now);
  requestWindows.set(clientId, active);
  if (requestWindows.size > 2000) {
    for (const [key, values] of requestWindows) {
      if (!values.some((time) => now - time < WINDOW_MS)) requestWindows.delete(key);
    }
  }
  return true;
}
