import { createClient } from '@refinedev/supabase';

const SUPABASE_URL = 'https://xgzcywcmtvoybqtvpxnz.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnemN5d2NtdHZveWJxdHZweG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyODA1NTYsImV4cCI6MjAwMjg1NjU1Nn0.e5IkKNoOxrF7RsDR0-ZHHYjGn_nBfGgJQARjx9A5QnY';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: true,
  },
});
