import { Button, Card, Link, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useInsertMovie, useMovies } from "@/db/hooks/useMovies";
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
  const { user, logout } = useAuth();
  const { styles } = useTheme(makeStyles);
  const { mutate } = useInsertMovie();

  const { data: movies, isPending, error } = useMovies();
  console.log(movies, isPending, error);

  const handleLogout = async () => {
    try {
      await logout(); // Now returns a Promise
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  const insertMovie = async () => {
    mutate({ name: "The last one", description: "This is a subtitle" });
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome to Flippo</Title>
        <Subtitle>{`You are logged in as, ${user?.display_name}`}</Subtitle>
        <Subtitle>{`There are ${movies?.length} movies`}</Subtitle>
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Insert movies" onPress={insertMovie} />
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
