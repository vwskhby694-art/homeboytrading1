# NexaAI Supabase setup

The application uses Supabase PostgreSQL as the exclusive enquiry store. The migration and end-to-end insert were verified on 2026-10-12. No legacy application fallback remains.

## 1. Create and configure the project

1. Create the owner-approved Supabase project and select the required region.
2. Copy `.env.example` to `.env.local`.
3. Confirm `SUPABASE_URL` and set a server-only `SUPABASE_SECRET_KEY` from the Supabase dashboard.
4. If a database password or API secret has been pasted into chat, terminal history, source control, or another shared channel, rotate or revoke it before storing the replacement locally.
5. Never prefix the secret key with `NEXT_PUBLIC_`, commit credentials, paste them into client code, or expose them in logs.

The public website does not currently need a publishable key, Supabase Auth, or Supabase Storage.

## 2. Apply the database migration

Apply `supabase/migrations/202610120001_create_enquiries.sql` through the Supabase SQL Editor or an approved migration workflow. It creates the `public.enquiries` table, validation constraints, indexes, and Row Level Security with no public policies.

No PostgreSQL connection string is required by the application. `SUPABASE_URL` is the HTTPS project API URL, not a database connection string. Apply the migration in the dashboard SQL Editor so no database URL or password needs to be added to the application environment.

The application inserts only through `POST /api/enquiries`. The server secret bypasses RLS, so the route performs validation, honeypot checking, payload limits, attribution allowlisting, and a basic rate limit before insertion.

## 3. Verification checklist

1. Submit valid and invalid enquiries in a non-production environment.
2. Confirm a successful response contains the inserted UUID.
3. Confirm the row contains normalized contact data, consent version, package, service, and only permitted UTM keys.
4. Confirm anonymous clients cannot select, insert, update, or delete `public.enquiries`.
5. Exercise missing-configuration, validation, rate-limit, and database-error states.
6. Confirm owner access and retention procedures.
7. Confirm the client reports an error rather than falling back when Supabase is unavailable.

The in-memory route rate limit is a best-effort application control. Before production launch, add durable platform-level rate limiting and an approved bot challenge such as Turnstile if the deployment threat model requires it.
