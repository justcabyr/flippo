import { Button, Card, Input, Link, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { user, login, logout } = useAuth(); // Use the context hook
  const { styles } = useTheme(makeStyles);

  const handleLogin = () => {
    if (email && password) login(email);
  };

  const handleLogout = () => {
    logout();
    setEmail("");
    setPassword("");
  };

  return (
    <Screen>
      <Card>
        {!user ? (
          <>
            <Title>Welcome Back</Title>
            <Subtitle>Please log in to continue</Subtitle>
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
            <View style={styles.linksRow}><Link href="/about">About</Link></View>
          </>
        ) : (
          <>
            <Title>{`Hello, ${user.email}`}</Title>
            <Subtitle>You are logged in</Subtitle>
            <Button title="Logout" onPress={handleLogout} />
            <View style={styles.linksRow}><Link href="/profile">Profile</Link></View>
          </>
        )}
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  linksRow: { flexDirection: "row", gap: 10, justifyContent: "center", marginTop: theme.spacing.lg },
});