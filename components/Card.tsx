// components/Card.tsx
import { View, StyleSheet, ViewProps } from "react-native";
import { Theme, useTheme } from "@/constants/theme";

export default function Card({ children, style }: ViewProps) {
  const { styles } = useTheme(makeStyles);

  return <View style={[styles.card, style]}>{children}</View>;
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: "100%",
      backgroundColor: theme.colors.card,
      padding: theme.spacing.xl,
      borderRadius: theme.radius.lg,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },
  });
