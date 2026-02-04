import Button from "@/components/ui/Button";
import Screen from "@/components/ui/Screen";
import { Subtitle, Title } from "@/components/ui/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { fetchMovies, insertMovies } from "@/db/movies";
import { useEffect, useState } from "react";

export default function Profile() {
  const [movies, setMovies] = useState<any[]>([]);
  const { user } = useAuth();

    const updateMovies = async () => {
      const movies = await fetchMovies();
      setMovies(movies);
    };

  const insertMovie = async () => {
    await insertMovies("The last one", "This is a subtitle");
    await updateMovies();
  };

    useEffect(() => {
      updateMovies();
    }, []);

  return (
    <Screen>
      <Title>Profile Page</Title>
      <Subtitle>{user!.email}</Subtitle>
      <Subtitle>{movies.length}</Subtitle>
      <Button title="Insert movies" onPress={insertMovie} />
    </Screen>
  );
}
