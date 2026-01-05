import { createSupabaseClient } from '../config/supabase.js';

export async function testSupabaseConnection() {
  const supabase = createSupabaseClient();

  const { error } = await supabase.auth.getSession();

  if (error) {
    return { connected: false, error: error.message };
  }

  return { connected: true };
}
