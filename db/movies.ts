import { supabase } from "@/lib/supabase";
import { Movie } from "./types";

export async function fetchMovies() {
  const { data, error } = await supabase.from("movies").select<"*", Movie>();
  if (error) throw error;
  return data;
}

export async function insertMovies(name: string, description: string) {
  const { data, error } = await supabase.from("movies").insert({
    name,
    description,
  }).select();
  console.log(data);
  if (error) throw error;
  return data;
}
