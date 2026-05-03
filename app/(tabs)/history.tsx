import {
  Flex,
  Header,
  ScreenWrapper,
  Select,
  Text,
  useTheme,
} from "@andresjesse/bobber-ui";
import { useEffect, useMemo, useState } from "react";
import { useMedicationStore } from "../../store/useMedicationStore";
import HistoryMedicationCard from "../../components/HistoryMedicationCard";
import { router } from "expo-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { COLORS, getAppColors } from "../../constants/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";

type LogGroup = {
  dateKey: string;
  date: Date;
  logs: Array<{
    id: number;
    medication_id: number;
    scheduled_time: string;
    taken_at: string | null;
    status: "tomado" | "pendente" | "pulado";
  }>;
};

function parseScheduledDate(value: string): Date {
  const [datePart, timePart = "00:00:00"] = value.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return new Date(
    year,
    (month || 1) - 1,
    day || 1,
    hours || 0,
    minutes || 0,
    seconds || 0,
  );
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatPeriodLabel(value: string): string {
  return capitalize(
    format(parseScheduledDate(value), "MMMM yyyy", { locale: ptBR }),
  );
}

export default function HistoryScreen() {
  const medicationLogs = useMedicationStore((state) => state.medicationLogs);
  const medications = useMedicationStore((state) => state.medications);
  const { theme } = useTheme();
  const colors = getAppColors(theme.colorScheme);
  const pagePadding = theme.spacing("default");
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const medicationById = Object.fromEntries(
    medications.map((medication) => [medication.id, medication]),
  );

  const sortedMedicationLogs = [...medicationLogs].sort(
    (a, b) =>
      parseScheduledDate(b.scheduled_time).getTime() -
      parseScheduledDate(a.scheduled_time).getTime(),
  );

  const periodOptions = useMemo(
    () =>
      Array.from(
        new Set(
          sortedMedicationLogs.map((log) =>
            formatPeriodLabel(log.scheduled_time),
          ),
        ),
      ).sort((a, b) => b.localeCompare(a)),
    [sortedMedicationLogs],
  );

  useEffect(() => {
    if (!periodOptions.length) {
      setSelectedPeriod(null);
      return;
    }

    if (!selectedPeriod || !periodOptions.includes(selectedPeriod)) {
      setSelectedPeriod(periodOptions[0]);
    }
  }, [periodOptions, selectedPeriod]);

  const filteredLogs = selectedPeriod
    ? sortedMedicationLogs.filter(
        (log) => formatPeriodLabel(log.scheduled_time) === selectedPeriod,
      )
    : sortedMedicationLogs;

  const groupedLogsMap = new Map<string, LogGroup>();

  filteredLogs.forEach((log) => {
    const logDate = parseScheduledDate(log.scheduled_time);
    const dateKey = format(logDate, "yyyy-MM-dd");
    const group = groupedLogsMap.get(dateKey);

    if (!group) {
      groupedLogsMap.set(dateKey, {
        dateKey,
        date: logDate,
        logs: [log],
      });
      return;
    }

    group.logs.push(log);
  });

  const groupedLogs = Array.from(groupedLogsMap.values());

  return (
    <ScreenWrapper.Scrollable>
      <Header.Hidden />
      <Flex
        direction="row"
        align="center"
        gap="xs"
        style={{
          backgroundColor: COLORS.primary,
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
        Historico
      </Text>

      {!!periodOptions.length && (
        <Select
          label="Periodo"
          data={periodOptions}
          selected={selectedPeriod ?? periodOptions[0]}
          onChange={(value) => setSelectedPeriod(value ? String(value) : null)}
          style={{
            marginTop: 6,
            marginBottom: 10,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.backgroundAlt,
            backgroundColor: colors.white,
          }}
        />
      )}

      {groupedLogs.map((group) => (
        <View key={group.dateKey}>
          <Flex
            direction="row"
            align="center"
            gap="xs"
            style={{ marginTop: 8 }}
          >
            <Text fontSize={24} fontWeight="700" style={{ lineHeight: 42 }}>
              {format(group.date, "d")}
            </Text>
            <Text fontSize={16} fontWeight="600" color={colors.textSecondary}>
              {capitalize(format(group.date, "EEEE", { locale: ptBR }))}
            </Text>
          </Flex>

          {group.logs.map((log) => {
            const medication = medicationById[log.medication_id];
            const logDate = parseScheduledDate(log.scheduled_time);

            return (
              <HistoryMedicationCard
                key={log.id}
                name={medication?.name ?? `Medicamento #${log.medication_id}`}
                time={format(logDate, "HH:mm")}
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
        </View>
      ))}

      {!groupedLogs.length && <Text>Nenhum Histórico.</Text>}
    </ScreenWrapper.Scrollable>
  );
}
