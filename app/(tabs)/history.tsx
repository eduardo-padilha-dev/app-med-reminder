import { ScreenWrapper, Text } from "@andresjesse/bobber-ui";
import { useMedicationStore } from "../../store/useMedicationStore";
import HistoryMedicationCard from "../../components/HistoryMedicationCard";
import { router } from "expo-router";
import { format } from "date-fns";

export default function HistoryScreen() {
  const medicationLogs = useMedicationStore((state) => state.medicationLogs);
  const medications = useMedicationStore((state) => state.medications);

  const medicationById = Object.fromEntries(
    medications.map((medication) => [medication.id, medication]),
  );

  const sortedMedicationLogs = [...medicationLogs].sort(
    (a, b) =>
      new Date(b.scheduled_time).getTime() -
      new Date(a.scheduled_time).getTime(),
  );

  return (
    <ScreenWrapper.Scrollable>
      {sortedMedicationLogs.map((log) => {
        const medication = medicationById[log.medication_id];

        return (
          <HistoryMedicationCard
            key={log.id}
            name={medication?.name ?? `Medicamento #${log.medication_id}`}
            time={format(log.scheduled_time, "HH:mm")}
            status={log.status}
            onPress={() =>
              router.push({
                pathname: "/medication/[id]",
                params: { id: String(log.medication_id) },
              })
            }
          />
        );
      })}

      {!sortedMedicationLogs.length && <Text>Nenhum Histórico.</Text>}
    </ScreenWrapper.Scrollable>
  );
}
