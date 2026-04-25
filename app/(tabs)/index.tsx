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

export default function Screen() {
  const { theme } = useTheme();
  const colors = getAppColors(theme.colorScheme);
  const pagePadding = theme.spacing("default");
  const medications = useMedicationStore((state) => state.medications);
  const pendingOrSkippedMedications = medications.filter(
    (item) =>
      item.active && (item.status === "pendente" || item.status === "pulado"),
  );

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

        <Text fontSize={14} fontWeight={"medium"} color={"gray"}>
          Você tem {pendingOrSkippedMedications.length} medicamentos pendentes
          para hoje.
        </Text>

        {pendingOrSkippedMedications.map((medication) => (
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

        {!pendingOrSkippedMedications.length && (
          <Text>Nenhum medicamento pendente hoje.</Text>
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
