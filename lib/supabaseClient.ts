import { createClient } from "@supabase/supabase-js";

// These are the Supabase PROJECT URL and ANON (public) key. Supabase
// designs the anon key to be safely embedded in client-side code —
// the real access control lives in the Row Level Security policies
// on each table (public can read, only a logged-in user can write).
// Do not put the service_role key here or anywhere in this repo.
const SUPABASE_URL = "https://cfuscjjvypbqpbrdyoks.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdXNjamp2eXBicXBicmR5b2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2MTUyNDAsImV4cCI6MjEwNTE5MTI0MH0.65e9vdBANpYAE9LElHgUyJoeICphef8TlXXETcP7DPg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
