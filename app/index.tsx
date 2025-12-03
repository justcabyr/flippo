import { Theme, useTheme } from "@/constants/theme";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme, styles } = useTheme(makeStyles);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please log in to continue</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.colors.subtitle}
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.colors.subtitle}
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.linksRow}>
          <Link href="/about" style={styles.link}>
            About
          </Link>
          <Link href="/profile" style={styles.link}>
            Profile
          </Link>
        </View>
      </View>
    </View>
  );
}


const makeStyles = (theme: Theme) => {
  // console.log("making stles"); - figure out how this works.
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
    },
    formCard: {
      width: "100%",
      backgroundColor: theme.colors.card,
      padding: theme.spacing.xl,
      borderRadius: theme.radius.lg,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: theme.spacing.xs,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.subtitle,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    input: {
      width: "100%",
      backgroundColor: theme.colors.inputBg,
      paddingHorizontal: theme.spacing.md,
      height: 50,
      borderRadius: theme.radius.md,
      fontSize: 16,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    button: {
      backgroundColor: theme.colors.primary,
      height: 50,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.sm,
    },
    buttonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },
    linksRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing.lg,
    },
    link: {
      color: theme.colors.primary,
      marginHorizontal: theme.spacing.md,
      fontSize: 15,
    },
  });
};
