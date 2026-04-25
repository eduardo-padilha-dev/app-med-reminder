import { Button, ScreenWrapper, Text } from "@andresjesse/bobber-ui";
import MedicationCard from "../../components/MedicationCard";
import { router } from "expo-router";

export default function Screen() {
  return (
    <ScreenWrapper.Scrollable>
      <MedicationCard
        name="Metformina"
        dose="500 mg"
        time="08:00 AM"
        status="tomado"
        onPress={() => router.push("/medication/metformina")}
      />
      <MedicationCard
        name="Atorvastatina"
        dose="20 mg"
        time="20:00 PM"
        status="pendente"
        onPress={() => router.push("/medication/atorvastatina")}
      />
      <MedicationCard
        name="Vitamina D3"
        dose="2000 UI"
        time="08:00 PM"
        status="pulado"
        onPress={() => router.push("/medication/vitamina-d3")}
      />
    </ScreenWrapper.Scrollable>
  );
}
