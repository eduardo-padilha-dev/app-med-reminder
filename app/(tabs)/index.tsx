import {
  Button,
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
import { getTodayScheduledTime } from "../../utils/formatDate";
import { MedicationStatus } from "../../components/StatusBadge";
import { Pressable, View } from "react-native";
import { useEffect, useMemo } from "react";

export default function Screen() {
  const medications = useMedicationStore((state) => state.medications);
  const medicationLogs = useMedicationStore((state) => state.medicationLogs);
  const fetchMedications = useMedicationStore(
    (state) => state.fetchMedications,
  );
  const fetchLogs = useMedicationStore((state) => state.fetchLogs);
  const confirmDose = useMedicationStore((state) => state.confirmDose);
  const checkAndMarkSkippedDoses = useMedicationStore(
    (state) => state.checkAndMarkSkippedDoses,
  );

  const { theme } = useTheme();
  const colors = getAppColors(theme.colorScheme);
  const pagePadding = theme.spacing("default");

  useEffect(() => {
    const init = async () => {
      await fetchMedications();
      await fetchLogs();
      await checkAndMarkSkippedDoses();
    };
    init();
  }, []);

  const getDoseStatus = (
    medicationId: number,
    scheduledTime: string,
  ): MedicationStatus => {
    const log = medicationLogs.find(
      (l) =>
        l.medication_id === medicationId && l.scheduled_time === scheduledTime,
    );
    return log ? log.status : "pendente";
  };

  const todaysDoses = useMemo(() => {
    const doses = medications.flatMap((medication) =>
      medication.times.map((time) => {
        const scheduledTime = getTodayScheduledTime(time);
        return {
          medicationId: medication.id,
          name: medication.name,
          dose: medication.dose,
          time,
          scheduledTime,
          status: getDoseStatus(medication.id, scheduledTime),
        };
      }),
    );

    return doses
      .filter((dose) => dose.status !== "tomado")
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [medications, medicationLogs]);

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
          Você tem {todaysDoses.length} doses programadas para hoje.
        </Text>

        {medications.length === 0 ? (
          <Flex
            align="center"
            gap="sm"
            style={{ marginTop: 60, paddingHorizontal: 20 }}
          >
            <Ionicons
              name="medical-outline"
              size={64}
              color={theme.colors.foreground("auto", 1)}
            />
            <Text fontWeight="700" fontSize={18} textAlign="center">
              Nenhum medicamento cadastrado
            </Text>
            <Text color="gray" textAlign="center">
              Adicione seu primeiro medicamento para começar a acompanhar suas
              doses.
            </Text>
            <Button
              title="Adicionar Medicamento"
              color="blue"
              onPress={() => router.push("/medication/new")}
              containerStyle={{ marginTop: 12 }}
            />
          </Flex>
        ) : todaysDoses.length === 0 ? (
          <Flex
            align="center"
            gap="sm"
            style={{ marginTop: 60, paddingHorizontal: 20 }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={64}
              color={theme.colors.get("green")}
            />
            <Text fontWeight="700" fontSize={18} textAlign="center">
              Tudo certo por hoje! 🎉
            </Text>
            <Text color="gray" textAlign="center">
              Você já confirmou todas as doses programadas para hoje.
            </Text>
          </Flex>
        ) : (
          todaysDoses.map((dose) => (
            <HomeMedicationCard
              key={`${dose.medicationId}-${dose.time}`}
              name={dose.name}
              dose={dose.dose}
              time={dose.time}
              status={dose.status}
              onPress={() =>
                router.push({
                  pathname: "/medication/[id]",
                  params: { id: String(dose.medicationId) },
                })
              }
              onConfirm={() =>
                confirmDose(dose.medicationId, dose.scheduledTime)
              }
            />
          ))
        )}
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
