import { palette } from "@/styles/colors";

const lightColors = {
  primary: palette.secondary,
  text: {
    primary: palette.white,
    secondary: palette.quaternary,
    disabled: palette.tertiary,
    inverse: palette.primary,
    link: palette.tertiary,
  },
  background: {
    screen: palette.primary,
    card: palette.secondary,
    input: palette.secondary,
    overlay: palette.blackInt,
  },
  border: {
    default: palette.secondary,
  },
  status: {
    success: palette.quinary,
    error: palette.red500,
    warning: palette.yellow500,
  },
};

const darkColors = {
  primary: palette.blue500,
  text: {
    primary: palette.gray50,
    secondary: palette.gray400,
    disabled: palette.gray500,
    inverse: palette.gray900,
    link: palette.blue400,
  },
  background: {
    screen: palette.gray950,
    card: palette.gray800,
    input: palette.gray700,
    overlay: palette.blackInt,
  },
  border: {
    default: palette.gray700,
  },
  status: {
    success: palette.quinary,
    error: palette.red500,
    warning: palette.yellow500,
  },
};

export const theme = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 28,
      xxxl: 32,
    },
    weights: {
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
};
