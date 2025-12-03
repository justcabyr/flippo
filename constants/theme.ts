// theme.ts

export const lightTheme = {
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

export const darkTheme = {
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

// Optional — for easy imports throughout app
// export const theme = {
//   light: lightTheme,
//   dark: darkTheme,
// };

export default lightTheme