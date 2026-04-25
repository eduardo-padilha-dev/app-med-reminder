import { useTheme } from "@andresjesse/bobber-ui";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAppColors } from "../../constants/colors";

export default function TabLayout() {
  const { theme } = useTheme();
  const colors = getAppColors(theme.colorScheme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 66,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primaryAlt,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "Historico",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
