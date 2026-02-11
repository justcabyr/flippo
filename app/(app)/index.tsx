import { Button, Card, Input, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { addFriend } from "@/db/rpc";
import { getFriends } from "@/db/users";
import { useState } from "react"; // Added useState
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
  const { user, logout } = useAuth();
  const { styles } = useTheme(makeStyles);

  const [friendId, setFriendId] = useState(""); // State for the input
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  const handleAddFriend = async () => {
    setLoading(true);

    try {
      await addFriend(friendId);
      Alert.alert("Success", "Friendship created!");
      setFriendId("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetFriends = async () => {
    const friends = await getFriends(user!.id);
    console.log(friends);
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome to Flippo</Title>
        <Subtitle>{`You are logged in as, ${user?.display_name}`}</Subtitle>

        <View style={styles.friendSection}>
          <Input placeholder="Enter Friend UUID" value={friendId} onChangeText={setFriendId} />
          <Button title={loading ? "Adding..." : "Add Friend"} onPress={handleAddFriend} />
          <Button title="Get friends" onPress={handleGetFriends} />
        </View>

        <Button title="Logout" onPress={handleLogout} />
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    friendSection: {
      marginVertical: theme.spacing.lg,
      gap: 10,
    },
    linksRow: {
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      marginTop: theme.spacing.lg,
    },
  });
