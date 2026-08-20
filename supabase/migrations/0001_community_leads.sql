-- ScalingNext — community signup leads
--
-- Captures signups from the /twitter, /insta, and /yt landing pages.
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
--
-- One table with a `source` discriminator rather than three near-identical
-- tables: keeps queries and the future admin panel simple.

create table if not exists public.community_leads (
  id                uuid primary key default gen_random_uuid(),
  name              text        not null check (char_length(name) between 1 and 120),
  email             text        not null check (position('@' in email) > 1),
  country           text        not null default 'India',
  phone_code        text        not null default '+91',
  phone             text        not null,
  knows_coding      boolean     not null,
  role              text        not null,
  experience        text        not null,
  marketing_opt_in  boolean     not null default true,
  source            text        not null check (source in ('twitter', 'instagram', 'youtube')),
  created_at        timestamptz not null default now()
);

-- Scoped per source: the same person may legitimately join via all three
-- channels, but not twice through the same one. lower(email) so that
-- Someone@Example.com and someone@example.com collide.
create unique index if not exists community_leads_email_source_key
  on public.community_leads (lower(email), source);

create index if not exists community_leads_created_at_idx
  on public.community_leads (created_at desc);

-- RLS on with NO policies: anon and authenticated roles get zero access.
-- Only the service-role key (used server-side in the Route Handler, which
-- bypasses RLS by design) can read or write this table.
alter table public.community_leads enable row level security;

-- Explicit privileges, so this table's access does not depend on the
-- "Automatically expose new tables" dashboard toggle being set either way.
-- service_role bypasses RLS by design and is only ever used server-side.
grant select, insert, update, delete on public.community_leads to service_role;

-- Belt and braces: RLS with no policies already blocks these roles, but making
-- it explicit means the intent survives someone later adding a policy without
-- thinking about grants. When the admin panel needs authenticated reads, add a
-- policy AND a grant then — deliberately.
revoke all on public.community_leads from anon, authenticated;
