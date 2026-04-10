import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)?.[1] || '';
const supabaseKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1] || '';

console.log('supabaseUrl:', supabaseUrl.substring(0, 10) + '...');
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('services').select('id, title, icon');
  console.log('Services:', data);
  if (error) console.error('GET Error:', error);

  const { data: gallery, error: err2 } = await supabase.from('gallery').select('id, category');
  console.log('Gallery:', gallery);
  if (err2) console.error('GET Error:', err2);
}

test();
