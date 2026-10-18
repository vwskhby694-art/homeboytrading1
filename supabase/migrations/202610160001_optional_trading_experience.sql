-- Trading experience is no longer collected by the website form; the sales team asks for it directly.
-- The existing check constraint still applies when a value is present (NULL passes a CHECK constraint).
alter table public.enquiries alter column trading_experience drop not null;
