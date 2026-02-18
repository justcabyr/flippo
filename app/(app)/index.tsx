import { Body, Button, Card, Input, Link, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useAddFriend, useFriends } from "@/db/hooks/useFriends";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

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
      onError: (e) => Alert.alert("Error", e.message),
    });
  };

  return (
    <Screen>
      <Card style={styles.headerCard}>
        <Title>Welcome, {user?.display_name || "User"}</Title>
        <Subtitle>Manage your connections below.</Subtitle>
        <View style={styles.friendSection}>
          <Input placeholder="Enter Friend UUID" value={friendId} onChangeText={setFriendId} />
          <Button title="Add Friend" onPress={handleAddFriend} />
        </View>

        {/* Constrained list container */}
        <View style={{ height: "25%" }}>
          <FlatList
            data={friends}
            ItemSeparatorComponent={() => (
              <View style={{ height: 10, backgroundColor: "yellow" }}></View>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({ item }) => (
              <View style={styles.friendRow}>
                <Body style={styles.uuidText}>{item.display_name}</Body>
              </View>
            )}
            ListEmptyComponent={<Body style={styles.emptyText}>No friends in your list yet.</Body>}
            style={styles.list}
          />
        </View>

        <Link href="/profile" style={styles.profileLink}>
          View Profile
        </Link>
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    headerCard: {
      margin: theme.spacing.md,
      gap: 10,
    },
    friendSection: {
      marginTop: theme.spacing.md,
      gap: 10,
    },
    profileLink: {
      textAlign: "center",
      marginTop: theme.spacing.sm,
    },
    list: {
      borderColor: "red",
      borderWidth: 1,
      marginTop: theme.spacing.sm,
    },
    friendRow: {
      paddingVertical: theme.spacing.xs,
      borderColor: "blue",
      borderWidth: 1,
    },
    uuidText: {
      fontSize: 14,
      opacity: 0.8,
    },
    emptyText: {
      textAlign: "center",
      marginTop: theme.spacing.md,
      opacity: 0.5,
    },
  });
