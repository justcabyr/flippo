import { supabase } from "@/lib/supabase";

export async function addFriend(id: string) {
  const { error } = await supabase.rpc("add_friend", {
    friend_id: id,
  });
  if (error) throw error;
}
