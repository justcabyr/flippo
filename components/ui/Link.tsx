import { Text, StyleSheet } from "react-native";
import { Link as ExpoLink, LinkProps } from "expo-router";
import { useTheme, Theme } from "@/constants/theme";

export default function Link({ href, children, style }: LinkProps) {
  const { styles } = useTheme(makeStyles);

  return (
    <ExpoLink href={href} style={[styles.link, style]}>
      <Text style={[styles.linkText]}>{children}</Text>
    </ExpoLink>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    link: {
      marginHorizontal: theme.spacing.md,
    },
    linkText: {
      color: theme.colors.primary,
      fontSize: 15,
    },
  });
