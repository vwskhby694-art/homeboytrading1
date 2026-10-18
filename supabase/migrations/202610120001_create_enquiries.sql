create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_version text not null check (char_length(form_version) between 1 and 64),
  lead_status text not null default 'new' check (lead_status in ('new', 'reviewing', 'contacted', 'closed')),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 7 and 32),
  country text not null check (char_length(country) between 2 and 80),
  preferred_package text not null check (preferred_package in ('core', 'advanced', 'elite')),
  preferred_service text not null check (preferred_service in ('automation', 'technology')),
  trading_experience text not null check (trading_experience in ('New to trading', 'Some experience', 'Experienced', 'Professional or institutional')),
  message text check (message is null or char_length(message) <= 1000),
  privacy_accepted boolean not null check (privacy_accepted = true),
  consent_version text not null check (char_length(consent_version) between 1 and 64),
  campaign_attribution jsonb not null default '{}'::jsonb,
  landing_page text check (landing_page is null or char_length(landing_page) <= 500),
  referrer text check (referrer is null or char_length(referrer) <= 500),
  constraint campaign_attribution_is_object check (jsonb_typeof(campaign_attribution) = 'object')
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_lead_status_idx on public.enquiries (lead_status, created_at desc);

alter table public.enquiries enable row level security;
alter table public.enquiries force row level security;

revoke all on table public.enquiries from public, anon, authenticated;
grant usage on schema public to service_role;
grant select, insert on table public.enquiries to service_role;

comment on table public.enquiries is 'Private NexaAI website enquiries. Access is server-side only; no public RLS policies are defined.';
comment on column public.enquiries.campaign_attribution is 'Allowlisted UTM keys only: utm_source, utm_medium, utm_campaign, utm_term, and utm_content.';
