// components/typography.tsx
import { Text, StyleSheet } from "react-native";
import { useTheme, Theme } from "@/constants/theme";

type TypographyProps = {
  children: React.ReactNode;
  style?: any;
};

export function Title({ children, style }: TypographyProps) {
  const { theme } = useTheme(makeStyles);
  const styles = makeStyles(theme);

  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function Subtitle({ children, style }: TypographyProps) {
  const { theme } = useTheme(makeStyles);
  const styles = makeStyles(theme);

  return <Text style={[styles.subtitle, style]}>{children}</Text>;
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: theme.spacing.xs,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 15,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
      color: theme.colors.subtitle,
    },
  });
