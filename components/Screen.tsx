// components/Screen.tsx
import { Theme, useTheme } from "@/constants/theme";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Screen({ children }: ViewProps) {
  const { styles } = useTheme(makeStyles);

  return <View style={[styles.container]}>{children}</View>;
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      justifyContent: "center",
      alignItems: "center",
    },
  });
