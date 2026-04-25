import "react-native-reanimated";

import { Modal, ThemedStatusBar, ThemeProvider } from "@andresjesse/bobber-ui";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { APP_CUSTOM_THEME } from "../constants/theme";

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const defaultColorScheme = systemColorScheme === "dark" ? "dark" : "light";

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
