import { Text, View } from "react-native";
import { formatDate } from "../../utils/formatDate";

export default function HomeScreen() {
  const hoje = formatDate(new Date());

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Hoje é {hoje}</Text>
    </View>
  );
}
