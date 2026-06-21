import {
  Button,
  Card,
  Flex,
  Header,
  Modal,
  ScreenWrapper,
  Text,
  useModal,
  useTheme,
} from "@andresjesse/bobber-ui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Switch } from "react-native";
import { getAppColors } from "../../constants/colors";
import { useMedicationStore } from "../../store/useMedicationStore";

export default function SettingsScreen() {
  const { theme, toggleColorScheme } = useTheme();
  const colors = getAppColors(theme.colorScheme);
  const pagePadding = theme.spacing("default");
  const isDark = theme.colorScheme === "dark";
  const resetAllData = useMedicationStore((state) => state.resetAllData);
  const { showModal, hideModal } = useModal();

  const handleConfirmReset = async () => {
    await resetAllData();
  };

  const handleResetPress = () => {
    showModal(
      <Modal.Windowed>
        <Modal.Header title="Resetar todos os dados" />
        <Text>
          Esta ação vai apagar todos os medicamentos e o histórico de
          confirmações. Essa ação não poderá ser desfeita.
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
              title: "Resetar",
              color: "red",
              onPress: handleConfirmReset,
            },
          ]}
        />
      </Modal.Windowed>,
    );
  };

  return (
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
        Configurações
      </Text>

      <Card gap="md" style={{ marginTop: 16 }}>
        <Flex direction="row" justify="space-between" align="center">
          <Text fontWeight="600">Tema escuro</Text>
          <Switch value={isDark} onValueChange={toggleColorScheme} />
        </Flex>
      </Card>

      <Card gap="md" style={{ marginTop: 12 }}>
        <Text fontWeight="600">Dados</Text>
        <Button
          title="Resetar todos os dados"
          variant="outline"
          color="red"
          fullWidth
          onPress={handleResetPress}
        />
      </Card>
    </ScreenWrapper.Scrollable>
  );
}
