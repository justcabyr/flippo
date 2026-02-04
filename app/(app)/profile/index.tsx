import Screen from "@/components/ui/Screen";
import { Subtitle, Title } from "@/components/ui/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Profile() {
  const [movies, setMovies] = useState<any[]>([]);
  const { user } = useAuth();

  const updateMovies = async () => {
    const { data } = await supabase.from("movies").select();
    setMovies(data || []);
  };

  useEffect(() => {
    updateMovies();
  }, []);

  return (
    <Screen>
      <Title>Profile Page</Title>
      <Subtitle>{user!.email}</Subtitle>
    </Screen>
  );
}
