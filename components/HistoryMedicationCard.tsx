import { Card, Text, useTheme } from "@andresjesse/bobber-ui";
import React from "react";
import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import StatusBadge, { MedicationStatus } from "./StatusBadge";
import { getStatusBadgeColors } from "../constants/colors";

interface HistoryMedicationCardProps {
  name: string;
  time: string;
  status: MedicationStatus;
  onPress?: () => void;
}

export default function HistoryMedicationCard({
  name,
  time,
  status,
  onPress,
}: HistoryMedicationCardProps) {
  const { theme } = useTheme();
  const statusColors = getStatusBadgeColors(status, theme.colorScheme);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.92 : 1,
        marginBottom: 12,
      })}
    >
      <View style={{ position: "relative" }}>
        <Card gap="md">
          <Card.Header
            title={name}
            rightSection={<StatusBadge status={status} />}
          />
          <Text fontSize={14}>
            <Ionicons name="stopwatch-outline" size={12} /> {time}
          </Text>
        </Card>

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            top: 10,
            bottom: 10,
            width: 4,
            backgroundColor: statusColors.border,
            borderRadius: 16,
          }}
        />
      </View>
    </Pressable>
  );
}
