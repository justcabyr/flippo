// theme.ts
import { useColorScheme } from "react-native";

// 1. Create a Theme type
export type Theme = {
  colors: {
    background: string;
    card: string;
    primary: string;
    text: string;
    subtitle: string;
    border: string;
    inputBg: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
};

// 2. Build typed themes using the Theme type
export const lightTheme: Theme = {
  colors: {
    background: "#F2F2F2",
    card: "#FFFFFF",
    primary: "#007AFF",
    text: "#222222",
    subtitle: "#555555",
    border: "#DDDDDD",
    inputBg: "#F4F4F4",
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 12,
  },
};

export const darkTheme: Theme = {
  colors: {
    background: "#000000",
    card: "#1A1A1A",
    primary: "#0A84FF",
    text: "#FFFFFF",
    subtitle: "#BBBBBB",
    border: "#333333",
    inputBg: "#222222",
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 12,
  },
};

// (Optional) Exporting both themes together
export const theme = {
  light: lightTheme,
  dark: darkTheme,
};

// // 3. Typed hook that returns the correct theme
// export function useTheme(makeStyles?: (theme: Theme) => any) {
//   const scheme = useColorScheme();
//   const theme = scheme === "dark" ? darkTheme : lightTheme;

//   // If caller passed makeStyles, generate styles
//   const styles = makeStyles ? makeStyles(theme) : undefined;

//   return { theme, styles };
// }

export function useTheme<T>(makeStyles: (theme: Theme) => T) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  const styles = makeStyles(theme);
  return { theme, styles };
}

// 4. Default export for convenience
export default lightTheme;
