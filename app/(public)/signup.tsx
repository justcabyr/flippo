import { Button, Card, Input, Link, Screen, Subtitle, Title } from "@/components/ui";
import { Theme, useTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();
  const { styles } = useTheme(makeStyles);

  const handleSignup = async () => {
    try {
      if (email && password && name) {
        await signup(email, password, name);
        // Optional: Alert.alert("Success", "Logged in!");
      }
    } catch (error: any) {
      console.error("email:", error);
      Alert.alert("Sign up Failed", error.message);
    }
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome to Flippo</Title>
        <Subtitle>Please sign up to continue</Subtitle>

        <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false}/>
        <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Input placeholder="Name" value={name} onChangeText={setName} autoComplete="off" />

        <Button title="Sign up" onPress={handleSignup} />

        <View style={styles.linksRow}>
          <Link href="/">Already have an account? Log In</Link>
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
