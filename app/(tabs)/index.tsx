import { ScreenWrapper, Text } from "@andresjesse/bobber-ui";
import HomeMedicationCard from "../../components/HomeMedicationCard";
import { router } from "expo-router";
import { useMedicationStore } from "../../store/useMedicationStore";

export default function Screen() {
  const medications = useMedicationStore((state) => state.medications);

  return (
    <ScreenWrapper.Scrollable>
      {medications
        .filter((item) => item.active)
        .map((medication) => (
          <HomeMedicationCard
            key={medication.id}
            name={medication.name}
            dose={medication.dose}
            time={medication.times[0] ?? "--:--"}
            onPress={() =>
              router.push({
                pathname: "/medication/[id]",
                params: { id: String(medication.id) },
              })
            }
          />
        ))}

      {!medications.length && <Text>Nenhum medicamento cadastrado.</Text>}
    </ScreenWrapper.Scrollable>
  );
}
