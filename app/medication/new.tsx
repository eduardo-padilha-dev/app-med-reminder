import {
  Flex,
  Header,
  ScreenWrapper,
  Text,
  useTheme,
} from "@andresjesse/bobber-ui";
import { router } from "expo-router";
import MedicationForm from "../../components/MedicationForm";
import { COLORS } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

export default function NewMedicationScreen() {
  const { theme } = useTheme();
  const pagePadding = theme.spacing("default");
  return (
    <ScreenWrapper.Scrollable>
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
          Novo Medicamento
        </Text>
        <View style={{ width: 20 }} />
      </Flex>
      <Header.Hidden />
      <MedicationForm onSuccess={() => router.replace("/")} />
    </ScreenWrapper.Scrollable>
  );
}
