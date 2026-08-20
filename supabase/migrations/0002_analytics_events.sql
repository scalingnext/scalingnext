-- ScalingNext — first-party analytics events
--
-- Run this in the Supabase SQL Editor AFTER 0001_community_leads.sql.
--
-- Why first-party instead of the GA4 API: no Google Cloud project, no service
-- account JSON, and — critically — ad blockers cannot strip it, so the numbers
-- in /admin are complete rather than the ~60-80% GA4 typically sees.
--
-- NOTE: counting starts the moment this ships. It cannot backfill history.

create table if not exists public.analytics_events (
  id          bigserial   primary key,
  event       text        not null check (event in ('pageview', 'whatsapp_click', 'form_submit')),
  path        text        not null,
  referrer    text,
  country     text,
  -- Coarse device bucket only. We deliberately do NOT store IP addresses, raw
  -- user-agent strings, or any cross-session identifier: nothing here can
  -- re-identify a visitor, which keeps this outside GDPR consent territory.
  device      text        check (device in ('desktop', 'mobile', 'tablet')),
  created_at  timestamptz not null default now()
);

-- Every dashboard query filters on a time window, most also group by event.
create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_event_created_idx
  on public.analytics_events (event, created_at desc);

create index if not exists analytics_events_path_idx
  on public.analytics_events (path);

alter table public.analytics_events enable row level security;

-- Same posture as community_leads: server-side service_role only.
grant select, insert on public.analytics_events to service_role;
revoke all on public.analytics_events from anon, authenticated;
