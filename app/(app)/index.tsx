import { Body, Button, Card, Input, Link, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useAddFriend, useFriends } from "@/db/hooks/useFriends";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
  const { user } = useAuth();
  const { styles } = useTheme(makeStyles);
  const [friendId, setFriendId] = useState("");

  const { data: friends } = useFriends();
  const { mutate: insertFriend } = useAddFriend();

  const handleAddFriend = async () => {
    insertFriend(friendId, {
      onSuccess: () => {
        Alert.alert("Success", "Friendship created!");
        setFriendId("");
      },
      onError: (e) => {
        Alert.alert("Error", e.message);
      },
    });
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome to Flippo</Title>
        <Subtitle>{`You are logged in as, ${user?.display_name}`}</Subtitle>
        <Body>{`You have ${friends?.length} friends`}</Body>

        <View style={styles.friendSection}>
          <Input placeholder="Enter Friend UUID" value={friendId} onChangeText={setFriendId} />
          <Button title="Add Friend" onPress={handleAddFriend} />
        </View>

        <View style={styles.linksRow}>
          <Link href="/profile">Profile</Link>
        </View>
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
