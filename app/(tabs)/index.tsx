import { Text, View } from "react-native";
import { useMedicationStore } from "../../store/useMedicationStore";

export default function HomeScreen() {
  const { medications } = useMedicationStore();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        {medications.length} medicamentos cadastrados
      </Text>
    </View>
  );
}
