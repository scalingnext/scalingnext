-- Widen community_leads.source to cover the LinkedIn and direct signup pages.
--
-- /linkedin and /join were added after 0001, whose CHECK constraint only
-- allowed twitter/instagram/youtube. Without this, a signup from either page
-- fails with 23514 (check_violation) and the visitor sees a 500.
--
-- Run this in the Supabase SQL Editor after 0003.

alter table public.community_leads
  drop constraint if exists community_leads_source_check;

alter table public.community_leads
  add constraint community_leads_source_check
  check (source in ('twitter', 'instagram', 'youtube', 'linkedin', 'direct'));
