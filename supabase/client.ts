import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pcotsuubigvtlmdqfkdr.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_P-VoswuB8-XvpJJKNJP10w_AnfB7zft";

export const supabase = createClient(supabaseUrl!, supabaseKey!);