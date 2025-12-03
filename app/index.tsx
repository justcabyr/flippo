import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Screen from "@/components/Screen";
import { Subtitle, Title } from "@/components/Typography";
import { Theme, useTheme } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { styles } = useTheme(makeStyles);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome Back</Title>
        <Subtitle>Please log in to continue</Subtitle>

        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <Button title="Login" onPress={handleLogin} />

        <View style={styles.linksRow}>
          <Link href="/about">About</Link>
          {/* <Link href="/profile">Profile</Link> */}
        </View>
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    linksRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing.lg,
    },
  });
