import { supabase } from "@/lib/supabase";
import { Movie, MovieInsert } from "./types";

export async function fetchMovies() {
  const { data, error } = await supabase.from("movies").select<"*", Movie>();
  if (error) throw error;
  return data;
}

export async function insertMovie(movie: MovieInsert) {
  const { error } = await supabase.from("movies").insert(movie);
  if (error) throw error;
}
