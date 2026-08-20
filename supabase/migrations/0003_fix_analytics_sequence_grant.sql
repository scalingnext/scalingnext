-- Fix: bigserial creates a sequence, and table-level grants do not cover it.
-- Without this, inserts into analytics_events fail with
--   "permission denied for sequence analytics_events_id_seq"
--
-- Run this in the Supabase SQL Editor after 0002_analytics_events.sql.

grant usage, select on sequence public.analytics_events_id_seq to service_role;
