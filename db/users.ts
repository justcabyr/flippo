import { supabase } from "@/lib/supabase";
import { User } from "./types";

export async function fetchUser(id: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select<"", User>()
    .eq("id", id)
    .single();
  if (error) throw error;
  return user;
}

export async function getFriends(id: string) {
  const { data, error } = await supabase.from("users").select<"", User>().neq("id", id);
  if (error) throw error;
  return data;
}
