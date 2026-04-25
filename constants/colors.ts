export const LIGHT_COLORS = {
  // Base UI
  primary: "#0A58CA",
  primaryAlt: "#2563EB",
  white: "#FFFFFF",
  background: "#F3F4F6",
  backgroundAlt: "#E5E7EB",
  surface: "#ECECEC",
  textPrimary: "#20232A",
  textSecondary: "#4B5563",
  textMuted: "#374151",

  // Medication status
  success: "#27AE60",
  successLight: "#EAF7EF",
  warning: "#F39C12",
  warningLight: "#FEF3E2",
  error: "#E74C3C",
  errorLight: "#FDEDEC",
};

export const DARK_COLORS = {
  // Base UI
  primary: "#60A5FA",
  primaryAlt: "#93C5FD",
  white: "#FFFFFF",
  background: "#0F172A",
  backgroundAlt: "#111827",
  surface: "#1F2937",
  textPrimary: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textMuted: "#9CA3AF",

  // Medication status
  success: "#4ADE80",
  successLight: "#14532D",
  warning: "#FBBF24",
  warningLight: "#431407",
  error: "#F87171",
  errorLight: "#450A0A",
};

export const COLORS = LIGHT_COLORS;

export type AppColorScheme =
  | "light"
  | "dark"
  | "unspecified"
  | null
  | undefined;

export function getAppColors(colorScheme: AppColorScheme) {
  return colorScheme === "dark" ? DARK_COLORS : LIGHT_COLORS;
}

type MedicationStatus = "tomado" | "pendente" | "pulado";

export function getStatusBadgeColors(
  status: MedicationStatus,
  colorScheme: AppColorScheme,
) {
  const palette = getAppColors(colorScheme);

  switch (status) {
    case "tomado":
      return {
        bg: palette.successLight,
        text: palette.success,
        border: palette.success,
      };
    case "pendente":
      return {
        bg: palette.warningLight,
        text: palette.warning,
        border: palette.warning,
      };
    case "pulado":
      return {
        bg: palette.errorLight,
        text: palette.error,
        border: palette.error,
      };
  }
}
