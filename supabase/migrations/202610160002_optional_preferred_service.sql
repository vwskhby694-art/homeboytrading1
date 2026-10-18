-- The website form no longer asks for a preferred conversation; only the funding profile is required.
-- The existing check constraint still applies when a value is present (NULL passes a CHECK constraint).
alter table public.enquiries alter column preferred_service drop not null;
