import "react-native-reanimated";

import { Modal, ThemedStatusBar, ThemeProvider } from "@andresjesse/bobber-ui";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { APP_CUSTOM_THEME } from "../constants/theme";
import MedicationRepository from "../services/database/MedicationRepository";
import MedicationLogs from "../services/database/MedicationLogs";
import { useEffect } from "react";

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const defaultColorScheme = systemColorScheme === "dark" ? "dark" : "light";

  useEffect(() => {
    const initDatabase = async () => {
      try {
        const medicationRepo = new MedicationRepository();
        await medicationRepo.up();

        const medicationLogs = new MedicationLogs();
        await medicationLogs.up();

        console.log("Banco de dados inicializado com sucesso!");
      } catch (error) {
        console.error("Erro ao inicializar banco de dados:", error);
      }
    };

    initDatabase();
  }, []);

  return (
    <KeyboardProvider>
      <ThemeProvider
        defaultColorScheme={defaultColorScheme}
        customTheme={APP_CUSTOM_THEME}
      >
        <ThemedStatusBar />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        />

        <Modal />
      </ThemeProvider>
    </KeyboardProvider>
  );
}
