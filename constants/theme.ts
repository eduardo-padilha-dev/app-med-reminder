import { type CustomTheme } from "@andresjesse/bobber-ui";
import { DARK_COLORS, LIGHT_COLORS } from "./colors";

const APP_BLUE_SCALE = [
  "#DBEAFE",
  "#BFDBFE",
  "#93C5FD",
  "#60A5FA",
  "#3B82F6",
  LIGHT_COLORS.primaryAlt,
  LIGHT_COLORS.primary,
  "#1D4ED8",
  "#1E40AF",
  "#1E3A8A",
];

const APP_GREEN_SCALE = [
  "#ECFDF3",
  "#D1FADF",
  "#A6F4C5",
  "#6CE9A6",
  "#32D583",
  "#12B76A",
  LIGHT_COLORS.success,
  "#1A7F47",
  "#166534",
  "#14532D",
];

const APP_YELLOW_SCALE = [
  "#FFFBEB",
  "#FEF3C7",
  "#FDE68A",
  "#FCD34D",
  "#FBBF24",
  "#F59E0B",
  LIGHT_COLORS.warning,
  "#B45309",
  "#92400E",
  "#78350F",
];

const APP_RED_SCALE = [
  "#FEF2F2",
  "#FEE2E2",
  "#FECACA",
  "#FCA5A5",
  "#F87171",
  "#EF4444",
  LIGHT_COLORS.error,
  "#B91C1C",
  "#991B1B",
  "#7F1D1D",
];

const APP_GRAY_SCALE = [
  "#F9FAFB",
  "#F3F4F6",
  "#E5E7EB",
  "#D1D5DB",
  "#9CA3AF",
  "#6B7280",
  "#4B5563",
  "#374151",
  "#1F2937",
  "#111827",
];

const APP_DARK_SCALE = [
  "#D1D5DB",
  "#9CA3AF",
  "#6B7280",
  "#4B5563",
  "#374151",
  DARK_COLORS.surface,
  DARK_COLORS.backgroundAlt,
  DARK_COLORS.background,
  "#0B1220",
  "#05080F",
];

export const APP_CUSTOM_THEME: CustomTheme = {
  primaryColor: "blue",
  backgroundColor: {
    light: "gray",
    dark: "dark",
  },
  foregroundColor: {
    light: "gray",
    dark: "gray",
  },
  colors: {
    blue: APP_BLUE_SCALE,
    green: APP_GREEN_SCALE,
    yellow: APP_YELLOW_SCALE,
    red: APP_RED_SCALE,
    gray: APP_GRAY_SCALE,
    dark: APP_DARK_SCALE,
  } as any,
};
