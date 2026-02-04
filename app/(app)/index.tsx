import { Button, Card, Link, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
  const { user, logout } = useAuth();
  const { styles } = useTheme(makeStyles);
  const [movies, setMovies] = useState<any[]>([]);

  const updateMovies = async () => {
    const { data } = await supabase.from("movies").select();
    setMovies(data || []);
  };

  useEffect(() => {
    updateMovies();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Now returns a Promise
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  const insertMovies = async () => {
    const { data, error } = await supabase
      .from("movies")
      .insert({
        name: "The third One",
        description: "Stalker begins Jedi training with Yoda.",
      })
      .select();
    console.log(data);
    if (error) console.error(error);
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome to Flippo</Title>
        <Subtitle>{`You are logged in as, ${user?.display_name}`}</Subtitle>
        <Subtitle>{`There are ${movies.length} movies`}</Subtitle>
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Insert movies" onPress={insertMovies} />
        <Button title="Update movies" onPress={updateMovies} />
        <View style={styles.linksRow}>
          <Link href="/profile">Profile</Link>
        </View>
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    linksRow: {
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      marginTop: theme.spacing.lg,
    },
  });
