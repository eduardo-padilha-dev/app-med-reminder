import {
  Flex,
  Header,
  ScreenWrapper,
  Text,
  useTheme,
} from "@andresjesse/bobber-ui";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import MedicationForm from "../../components/MedicationForm";
import { COLORS } from "../../constants/colors";
import { useMedicationStore } from "../../store/useMedicationStore";

export default function MedicationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const pagePadding = theme.spacing("default");

  const medication = useMedicationStore((state) =>
    state.medications.find((m) => m.id === Number(id)),
  );

  if (!medication) {
    return (
      <ScreenWrapper.Fullscreen center>
        <Text>Medicamento não encontrado.</Text>
      </ScreenWrapper.Fullscreen>
    );
  }

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
        <Flex style={{ width: 20 }}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons
              name="arrow-back"
              size={20}
              color={COLORS.white}
              style={{ marginTop: 5 }}
            />
          </Pressable>
        </Flex>
        <Text
          textAlign="center"
          fontSize={20}
          fontWeight={"bold"}
          color={COLORS.white}
          style={{ flex: 1 }}
        >
          Editar Medicamento
        </Text>
        <View style={{ width: 20 }} />
      </Flex>

      <MedicationForm
        medication={medication}
        onSuccess={() => router.replace("/")}
      />
    </ScreenWrapper.Scrollable>
  );
}
