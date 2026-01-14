import { Theme, useTheme } from "@/constants/theme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function Input(props: TextInputProps) {
  const { theme } = useTheme(makeStyles);
  const styles = makeStyles(theme);

  return <TextInput {...props} placeholderTextColor={theme.colors.subtitle} style={styles.input} />;
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
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
      color: theme.colors.text,
    },
  });
