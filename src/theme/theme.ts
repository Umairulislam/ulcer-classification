import { createTheme, alpha, type ThemeOptions } from "@mui/material/styles"
import {
  colors,
  fontFamily,
  fontWeight,
  fontSize,
  radius,
  shadow,
  spacingUnit,
  transition,
} from "./tokens"

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------

const palette: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    light: colors.primary[300],
    main: colors.primary[600],
    dark: colors.primary[700],
    contrastText: colors.neutral[0],
  },
  secondary: {
    light: colors.accent[300],
    main: colors.accent[600],
    dark: colors.accent[700],
    contrastText: colors.neutral[0],
  },
  success: {
    light: colors.success[100],
    main: colors.success[600],
    dark: colors.success[700],
    contrastText: colors.neutral[0],
  },
  warning: {
    light: colors.warning[100],
    main: colors.warning[600],
    dark: colors.warning[700],
    contrastText: colors.neutral[0],
  },
  error: {
    light: colors.error[100],
    main: colors.error[600],
    dark: colors.error[700],
    contrastText: colors.neutral[0],
  },
  info: {
    light: colors.info[100],
    main: colors.info[600],
    dark: colors.info[700],
    contrastText: colors.neutral[0],
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[500],
    disabled: colors.neutral[300],
  },
  divider: colors.neutral[200],
  background: {
    default: colors.neutral[50],
    paper: colors.neutral[0],
  },
  grey: {
    50: colors.neutral[50],
    100: colors.neutral[100],
    200: colors.neutral[200],
    300: colors.neutral[300],
    400: colors.neutral[400],
    500: colors.neutral[500],
    600: colors.neutral[600],
    700: colors.neutral[700],
    800: colors.neutral[800],
    900: colors.neutral[900],
  },
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

const typography: ThemeOptions["typography"] = {
  fontFamily: fontFamily.body,
  h1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["5xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: 1.25,
    letterSpacing: -0.25,
  },
  h3: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: 1.35,
  },
  h5: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: 1.5,
    color: colors.neutral[600],
  },
  subtitle2: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: 1.5,
    color: colors.neutral[500],
  },
  body1: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: 1.55,
    color: colors.neutral[600],
  },
  button: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.5,
    textTransform: "none",
    letterSpacing: 0.1,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    color: colors.neutral[500],
  },
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: 1.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.neutral[500],
  },
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export const theme = createTheme({
  palette,
  typography,
  spacing: spacingUnit,
  shape: {
    borderRadius: radius.md,
  },
  shadows: [
    "none",
    shadow.xs,
    shadow.sm,
    shadow.sm,
    shadow.md,
    shadow.md,
    shadow.md,
    shadow.lg,
    shadow.lg,
    shadow.lg,
    shadow.lg,
    shadow.xl,
    shadow.xl,
    shadow.xl,
    shadow.xl,
    shadow.xl,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
    shadow.overlay,
  ] as ThemeOptions["shadows"],

  components: {
    // -----------------------------------------------------------------
    // Global CSS baseline
    // -----------------------------------------------------------------
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.neutral[50],
          scrollbarWidth: "thin",
          scrollbarColor: `${colors.neutral[300]} transparent`,
        },
        "*::-webkit-scrollbar": { width: 8, height: 8 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: colors.neutral[300],
          borderRadius: radius.full,
        },
        "*::-webkit-scrollbar-track": { backgroundColor: "transparent" },
      },
    },

    // -----------------------------------------------------------------
    // Surfaces — Paper / Card
    // -----------------------------------------------------------------
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${colors.neutral[200]}`,
          boxShadow: shadow.card,
        },
        rounded: {
          borderRadius: radius.lg,
        },
        elevation0: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          border: `1px solid ${colors.neutral[200]}`,
          boxShadow: shadow.card,
          transition: `box-shadow ${transition.base}, border-color ${transition.base}`,
          "&:hover": {
            boxShadow: shadow.cardHover,
            borderColor: colors.neutral[300],
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: { padding: "20px 24px 0" },
        title: {
          fontFamily: fontFamily.display,
          fontSize: fontSize.lg,
          fontWeight: fontWeight.semibold,
          color: colors.neutral[900],
        },
        subheader: {
          fontSize: fontSize.sm,
          color: colors.neutral[500],
          marginTop: 2,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": { paddingBottom: 24 },
        },
      },
    },

    // -----------------------------------------------------------------
    // Buttons
    // -----------------------------------------------------------------
    MuiButtonBase: {
      defaultProps: { disableRipple: false },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          padding: "9px 18px",
          transition: `all ${transition.fast}`,
        },
        sizeSmall: { padding: "6px 12px", fontSize: fontSize.xs },
        sizeLarge: { padding: "12px 24px", fontSize: fontSize.md },
        contained: {
          boxShadow: shadow.xs,
          "&:hover": { boxShadow: shadow.sm },
          "&:active": { boxShadow: "none" },
        },
        containedPrimary: {
          background: `linear-gradient(180deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
          "&:hover": {
            background: `linear-gradient(180deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
          },
        },
        outlined: {
          borderColor: colors.neutral[300],
          "&:hover": {
            borderColor: colors.primary[400],
            backgroundColor: colors.primary[50],
          },
        },
        outlinedPrimary: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5 },
        },
        text: {
          "&:hover": { backgroundColor: colors.primary[50] },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          transition: `background-color ${transition.fast}`,
          "&:hover": { backgroundColor: colors.neutral[100] },
        },
      },
    },

    // -----------------------------------------------------------------
    // Chip / Badge
    // -----------------------------------------------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          fontWeight: fontWeight.medium,
          fontSize: fontSize.xs,
        },
        filled: {
          backgroundColor: colors.neutral[100],
          color: colors.neutral[700],
        },
        colorPrimary: {
          "&.MuiChip-filled": {
            backgroundColor: colors.primary[50],
            color: colors.primary[700],
          },
        },
        colorSuccess: {
          "&.MuiChip-filled": {
            backgroundColor: colors.success[50],
            color: colors.success[700],
          },
        },
        colorWarning: {
          "&.MuiChip-filled": {
            backgroundColor: colors.warning[50],
            color: colors.warning[700],
          },
        },
        colorError: {
          "&.MuiChip-filled": {
            backgroundColor: colors.error[50],
            color: colors.error[700],
          },
        },
        outlined: {
          borderColor: colors.neutral[300],
        },
        label: { paddingLeft: 10, paddingRight: 10 },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: fontWeight.semibold,
          fontSize: 10,
          border: `2px solid ${colors.neutral[0]}`,
          padding: "0 4px",
        },
        colorError: { backgroundColor: colors.error[500] },
        colorSuccess: { backgroundColor: colors.success[500] },
      },
    },

    // -----------------------------------------------------------------
    // Header — AppBar / Toolbar
    // -----------------------------------------------------------------
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.neutral[0], 0.8),
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${colors.neutral[200]}`,
          color: colors.neutral[900],
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: 64, paddingLeft: 24, paddingRight: 24 },
      },
    },

    // -----------------------------------------------------------------
    // Drawer
    // -----------------------------------------------------------------
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
          boxShadow: shadow.overlay,
          backgroundColor: colors.neutral[0],
          backgroundImage: "none",
        },
      },
    },

    // -----------------------------------------------------------------
    // Inputs — TextField / Select / Switch
    // -----------------------------------------------------------------
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          backgroundColor: colors.neutral[0],
          transition: `box-shadow ${transition.fast}, border-color ${transition.fast}`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.neutral[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.neutral[400],
          },
          "&.Mui-focused": {
            boxShadow: shadow.focus(alpha(colors.primary[500], 0.15)),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.primary[500],
            borderWidth: 1.5,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.error[500],
          },
          "&.Mui-disabled": {
            backgroundColor: colors.neutral[50],
          },
        },
        input: {
          padding: "11px 14px",
          fontSize: fontSize.base,
          "&::placeholder": { color: colors.neutral[400], opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: fontSize.base,
          color: colors.neutral[500],
          "&.Mui-focused": { color: colors.primary[600] },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: fontSize.xs, marginLeft: 2, marginTop: 6 },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: colors.neutral[500] },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: radius.md,
          border: `1px solid ${colors.neutral[200]}`,
          boxShadow: shadow.dropdown,
          marginTop: 4,
        },
        list: { padding: 6 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: radius.xs,
          fontSize: fontSize.base,
          padding: "8px 10px",
          "&.Mui-selected": {
            backgroundColor: colors.primary[50],
            color: colors.primary[700],
            "&:hover": { backgroundColor: colors.primary[100] },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { width: 40, height: 24, padding: 0 },
        switchBase: {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: colors.neutral[0],
            "& + .MuiSwitch-track": {
              backgroundColor: colors.primary[600],
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 20,
          height: 20,
          boxShadow: shadow.xs,
        },
        track: {
          borderRadius: radius.full,
          backgroundColor: colors.neutral[300],
          opacity: 1,
        },
      },
    },

    // -----------------------------------------------------------------
    // Avatar
    // -----------------------------------------------------------------
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily.display,
          fontWeight: fontWeight.semibold,
          backgroundColor: colors.primary[100],
          color: colors.primary[700],
        },
        rounded: { borderRadius: radius.sm },
      },
    },

    // -----------------------------------------------------------------
    // Icons
    // -----------------------------------------------------------------
    MuiSvgIcon: {
      styleOverrides: {
        root: { fontSize: 20 },
        fontSizeSmall: { fontSize: 16 },
        fontSizeLarge: { fontSize: 28 },
      },
    },

    // -----------------------------------------------------------------
    // Table
    // -----------------------------------------------------------------
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          border: `1px solid ${colors.neutral[200]}`,
          backgroundColor: colors.neutral[0],
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.neutral[0],
          "& .MuiTableCell-root": {
            fontSize: fontSize.xs,
            fontWeight: fontWeight.semibold,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            color: colors.neutral[500],
            borderBottom: `1px solid ${colors.neutral[200]}`,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-of-type .MuiTableCell-root": { borderBottom: "none" },
          "&.MuiTableRow-hover:hover": {
            backgroundColor: colors.neutral[50],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "14px 16px",
          fontSize: fontSize.base,
          borderBottom: `1px solid ${colors.neutral[100]}`,
        },
      },
    },

    // -----------------------------------------------------------------
    // Tooltip
    // -----------------------------------------------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.neutral[800],
          color: colors.neutral[0],
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
          borderRadius: radius.xs,
          padding: "6px 10px",
          boxShadow: shadow.md,
        },
        arrow: { color: colors.neutral[800] },
      },
    },

    // -----------------------------------------------------------------
    // Alert
    // -----------------------------------------------------------------
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          fontSize: fontSize.sm,
          border: "1px solid transparent",
        },
        standardSuccess: {
          backgroundColor: colors.success[50],
          color: colors.success[700],
          borderColor: colors.success[100],
        },
        standardWarning: {
          backgroundColor: colors.warning[50],
          color: colors.warning[700],
          borderColor: colors.warning[100],
        },
        standardError: {
          backgroundColor: colors.error[50],
          color: colors.error[700],
          borderColor: colors.error[100],
        },
        standardInfo: {
          backgroundColor: colors.info[50],
          color: colors.info[700],
          borderColor: colors.info[100],
        },
        icon: { opacity: 1 },
      },
    },

    // -----------------------------------------------------------------
    // Pagination
    // -----------------------------------------------------------------
    MuiPagination: {
      styleOverrides: {
        root: {},
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: radius.xs,
          fontSize: fontSize.sm,
          fontWeight: fontWeight.medium,
          color: colors.neutral[600],
          "&.Mui-selected": {
            backgroundColor: colors.primary[600],
            color: colors.neutral[0],
            "&:hover": { backgroundColor: colors.primary[700] },
          },
        },
      },
    },

    // -----------------------------------------------------------------
    // Divider
    // -----------------------------------------------------------------
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: colors.neutral[200] },
      },
    },
  },
})

export default theme
