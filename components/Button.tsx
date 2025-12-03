// components/ThemedButton.tsx
import { Theme, useTheme } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
};

export default function Button({ title, onPress, style, textStyle }: Props) {
  const { styles } = useTheme(makeStyles);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      height: 50,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.sm,
    },
    pressed: {
      opacity: 0.7, // simple press feedback
    },
    buttonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },
  });
