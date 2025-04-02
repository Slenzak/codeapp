import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rujaqwykhtxupgsfwjfs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1amFxd3lraHR4dXBnc2Z3amZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODIyNTQsImV4cCI6MjA1OTE1ODI1NH0.fBLoF630Gf3TkYt2e4-ELQTMTGkeNhNRrrj3InEVnaQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;