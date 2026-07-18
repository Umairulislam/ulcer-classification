/**
 * Design tokens — single source of truth for the theme.
 * Nothing here is MUI-specific; theme.ts consumes these to build the MUI theme.
 */

// ---------------------------------------------------------------------------
// Color
// ---------------------------------------------------------------------------
// Indigo as the primary brand color, paired with a cool slate neutral scale
// (rather than MUI's default warm grey) so surfaces feel calm and clinical —
// appropriate for a medical classification tool.

export const colors = {
  primary: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8",
    500: "#6366F1",
    600: "#4F46E5", // main
    700: "#4338CA",
    800: "#3730A3",
    900: "#312E81",
  },
  // Muted teal accent — used sparingly for secondary actions and data viz,
  // never competing with indigo for attention.
  accent: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    300: "#67E8F9",
    500: "#06B6D4",
    600: "#0891B2",
    700: "#0E7490",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
  },
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
  },
  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },
  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
  },
} as const

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
// "Lexend" carries headings — a grotesque built for reading clarity, which
// fits a clinical tool better than a purely decorative display face.
// "Inter" handles body copy and UI chrome. "IBM Plex Mono" is reserved for
// tabular/numeric data (patient IDs, measurements, timestamps) so figures
// stay legible and easy to scan in tables.

export const fontFamily = {
  display: '"Lexend", "Inter", "Helvetica Neue", Arial, sans-serif',
  body: '"Inter", "Helvetica Neue", Arial, sans-serif',
  mono: '"IBM Plex Mono", "Roboto Mono", monospace',
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

// Type scale (px) — a fairly tight, data-dense scale suited to dashboards.
export const fontSize = {
  xs: 12,
  sm: 13,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 30,
  "5xl": 36,
} as const

// ---------------------------------------------------------------------------
// Shape
// ---------------------------------------------------------------------------

export const radius = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
} as const

// ---------------------------------------------------------------------------
// Shadow
// ---------------------------------------------------------------------------
// MUI's default elevation shadows are flat grey and read dated. These use a
// low-opacity slate tint with a tighter spread, closer to what product UIs
// (Linear, Vercel, Stripe dashboard) use — soft, directional, barely-there
// at rest, and a touch stronger on hover/focus states.

const tint = (opacity: number) => `rgba(15, 23, 42, ${opacity})`

export const shadow = {
  xs: `0 1px 2px ${tint(0.04)}`,
  sm: `0 1px 2px ${tint(0.04)}, 0 1px 3px ${tint(0.06)}`,
  md: `0 2px 4px ${tint(0.03)}, 0 4px 10px ${tint(0.07)}`,
  lg: `0 4px 8px ${tint(0.03)}, 0 10px 24px ${tint(0.09)}`,
  xl: `0 8px 16px ${tint(0.04)}, 0 20px 40px ${tint(0.12)}`,
  // Cards/Paper at rest — subtle, mostly a hairline border does the work.
  card: `0 1px 2px ${tint(0.03)}, 0 1px 8px ${tint(0.05)}`,
  cardHover: `0 4px 10px ${tint(0.04)}, 0 12px 24px ${tint(0.1)}`,
  // Floating surfaces — menus, dropdowns, popovers.
  dropdown: `0 4px 6px ${tint(0.03)}, 0 12px 28px ${tint(0.12)}`,
  // Drawer / modal — deliberately heavier so it reads as "above everything".
  overlay: `0 12px 24px ${tint(0.08)}, 0 24px 48px ${tint(0.18)}`,
  // Focus ring companion shadow for inputs (paired with an outline color).
  focus: (rgbColor: string) => `0 0 0 4px ${rgbColor}`,
} as const

// ---------------------------------------------------------------------------
// Spacing / layout
// ---------------------------------------------------------------------------

export const spacingUnit = 8 // px — MUI theme.spacing() base

export const layout = {
  headerHeight: 64,
  drawerWidth: 264,
  drawerWidthCollapsed: 80,
  contentMaxWidth: 1440,
} as const

export const transition = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "320ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const
