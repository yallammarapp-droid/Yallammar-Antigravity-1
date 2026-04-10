import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseKey === 'placeholder_key') {
  console.warn('Supabase URL or Key is missing. Check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
