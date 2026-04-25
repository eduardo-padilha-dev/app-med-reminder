import { Badge, useTheme } from "@andresjesse/bobber-ui";
import { getStatusBadgeColors } from "../constants/colors";

export type MedicationStatus = "tomado" | "pendente" | "pulado";

interface StatusBadgeProps {
  status: MedicationStatus;
}

const statusLabel: Record<MedicationStatus, string> = {
  tomado: "Tomado",
  pendente: "Pendente",
  pulado: "Pulado",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { theme } = useTheme();
  const colors = getStatusBadgeColors(status, theme.colorScheme);

  return (
    <Badge
      size="sm"
      containerStyle={{
        marginTop: 2,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: 1,
      }}
      textStyle={{
        color: colors.text,
        fontWeight: "700",
        fontStyle: "normal",
      }}
    >
      {statusLabel[status]}
    </Badge>
  );
}
