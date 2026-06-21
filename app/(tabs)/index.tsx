import {
  Flex,
  Header,
  ScreenWrapper,
  Text,
  useTheme,
} from "@andresjesse/bobber-ui";
import HomeMedicationCard from "../../components/HomeMedicationCard";
import { router } from "expo-router";
import { useMedicationStore } from "../../store/useMedicationStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAppColors } from "../../constants/colors";
import { Pressable, View } from "react-native";
import { useEffect } from "react";

function getTodayScheduledTime(time: string) {
  const today = new Date().toISOString().slice(0, 10); // "2026-06-21"
  return `${today}T${time}:00`;
}

export default function Screen() {
  const medications = useMedicationStore((state) => state.medications);
  const medicationLogs = useMedicationStore((state) => state.medicationLogs);
  const fetchMedications = useMedicationStore(
    (state) => state.fetchMedications,
  );
  const fetchLogs = useMedicationStore((state) => state.fetchLogs);
  const confirmDose = useMedicationStore((state) => state.confirmDose);

  const { theme } = useTheme();
  const colors = getAppColors(theme.colorScheme);
  const pagePadding = theme.spacing("default");

  useEffect(() => {
    fetchMedications();
    fetchLogs();
  }, []);

  const isConfirmedToday = (medicationId: number, scheduledTime: string) => {
    return medicationLogs.some(
      (log) =>
        log.medication_id === medicationId &&
        log.scheduled_time === scheduledTime &&
        log.status === "tomado",
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper.Scrollable>
        <Header.Hidden />
        <Flex
          direction="row"
          align="center"
          gap="xs"
          style={{
            backgroundColor: colors.primary,
            marginTop: -pagePadding,
            marginHorizontal: -pagePadding,
            paddingTop: pagePadding,
            paddingHorizontal: pagePadding,
            paddingBottom: 14,
          }}
        >
          <FontAwesome5
            name="briefcase-medical"
            size={20}
            color={colors.white}
            style={{ marginTop: 5 }}
          />
          <Text
            fontSize={20}
            fontWeight={"bold"}
            color={colors.white}
            style={{ marginTop: 5 }}
          >
            MedReminder
          </Text>
        </Flex>

        <Text fontSize={24} fontWeight={"bold"}>
          Seus Medicamentos
        </Text>

        <Text fontSize={14} color={"gray"}>
          Você tem {medications.length} medicamentos ativos.
        </Text>

        {medications.map((medication) => {
          const time = medication.times[0] ?? "--:--";
          const scheduledTime = getTodayScheduledTime(time);
          const confirmed = isConfirmedToday(medication.id, scheduledTime);

          return (
            <HomeMedicationCard
              key={medication.id}
              name={medication.name}
              dose={medication.dose}
              time={time}
              confirmed={confirmed}
              onPress={() =>
                router.push({
                  pathname: "/medication/[id]",
                  params: { id: String(medication.id) },
                })
              }
              onConfirm={() => confirmDose(medication.id, scheduledTime)}
            />
          );
        })}

        {!medications.length && <Text>Nenhum medicamento cadastrado.</Text>}
      </ScreenWrapper.Scrollable>

      <Pressable
        onPress={() => router.push("/medication/new")}
        style={({ pressed }) => ({
          position: "absolute",
          right: 20,
          bottom: 20,
          height: 52,
          borderRadius: 100,
          paddingHorizontal: 16,
          backgroundColor: colors.primaryAlt,
          justifyContent: "center",
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Ionicons name="add" size={22} color={colors.white} />
      </Pressable>
    </View>
  );
}
