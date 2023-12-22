import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gszvunydprcmvtwapoik.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenZ1bnlkcHJjbXZ0d2Fwb2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNzU1OTMsImV4cCI6MjAxNjg1MTU5M30.DfcEKOKu6Qv2c7yLJovNQiUsfdhm580Fqtc58ONtQZ4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
