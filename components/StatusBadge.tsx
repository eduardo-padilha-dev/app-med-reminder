import { Badge, Text, useTheme } from "@andresjesse/bobber-ui";
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
      size="lg"
      containerStyle={{
        marginTop: 2,
        backgroundColor: colors.bg,
      }}
      textStyle={{
        color: colors.text,
        fontSize: 10,
        fontWeight: "500",
        fontStyle: "normal",
      }}
    >
      <Text color={colors.text} fontSize={12} fontWeight={"700"}>
        {statusLabel[status]}
      </Text>
    </Badge>
  );
}
