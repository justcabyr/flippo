import { Button, Screen } from "@/components/ui/";
import { Subtitle, Title } from "@/components/ui/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useInsertMovie, useMovies } from "@/db/hooks/useMovies";

export default function Profile() {
  const { user } = useAuth();
  const { data: movies } = useMovies();
  const { mutate } = useInsertMovie();

  const handleInsertMovie = async () => {
    mutate({ name: "The last one", description: "This is a subtitle" });
  };

  return (
    <Screen>
      <Title>Profile Page</Title>
      <Subtitle>{user!.email}</Subtitle>
      <Subtitle>{movies?.length}</Subtitle>
      <Button title="Insert movies" onPress={handleInsertMovie} />
    </Screen>
  );
}
