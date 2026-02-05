import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies, insertMovie } from "../movies";
import { MovieInsert } from "../types";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
}

export function useInsertMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movie: MovieInsert) => insertMovie(movie),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}
