import { Button, Card, Screen, Subtitle, Title } from "@/components/ui/";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, StyleSheet, View } from "react-native";

export default function Profile() {
  const { user, logout } = useAuth();
  const { styles } = useTheme(makeStyles);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <Screen>
      <Card>
        <Title>Profile Page</Title>
        <Subtitle>{user?.display_name || "User"}</Subtitle>

        <View style={styles.infoSection}>
          <Subtitle style={styles.emailText}>{user?.email}</Subtitle>
        </View>

        <View style={styles.actionSection}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    infoSection: {
      marginVertical: theme.spacing.lg,
      alignItems: "center",
    },
    emailText: {
      opacity: 0.7,
    },
    actionSection: {
      marginTop: theme.spacing.xl,
      gap: 10,
    },
  });
