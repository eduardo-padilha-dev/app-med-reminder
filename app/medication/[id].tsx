import {
  Flex,
  Header,
  Modal,
  ScreenWrapper,
  Text,
  useModal,
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
  const deleteMedication = useMedicationStore(
    (state) => state.deleteMedication,
  );
  const { showModal, hideModal } = useModal();

  const medication = useMedicationStore((state) =>
    state.medications.find((m) => m.id === Number(id)),
  );

  const handleDeletePress = () => {
    showModal(
      <Modal.Windowed>
        <Modal.Header title="Excluir medicamento" />
        <Text>
          Tem certeza que deseja excluir este medicamento? Essa ação não poderá
          ser desfeita.
        </Text>
        <Modal.Footer
          actions={[
            {
              title: "Cancelar",
              variant: "subtle",
              color: "gray",
              onPress: hideModal,
            },
            {
              title: "Excluir",
              color: "red",
              onPress: handleConfirmDelete,
            },
          ]}
        />
      </Modal.Windowed>,
    );
  };

  const handleConfirmDelete = async () => {
    if (!medication) return;
    await deleteMedication(medication.id);
    router.replace("/");
  };

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

      <Pressable
        onPress={handleDeletePress}
        style={{
          marginTop: 8,
          paddingVertical: 14,
          borderRadius: theme.radius("default"),
          borderWidth: 1,
          borderColor: COLORS.error,
          alignItems: "center",
        }}
      >
        <Text fontWeight="700" color={COLORS.error}>
          Excluir Medicamento
        </Text>
      </Pressable>
    </ScreenWrapper.Scrollable>
  );
}
