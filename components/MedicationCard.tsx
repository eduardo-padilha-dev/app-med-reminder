import React from "react";
import { MedicationStatus } from "./StatusBadge";
import { Button, Card, Flex, Text } from "@andresjesse/bobber-ui";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface MedicationCardProps {
  name: string;
  dose: string;
  time: string;
  status: MedicationStatus;
  onPress?: () => void;
  onConfirm?: () => void;
}

export default function MedicationCard({
  name,
  dose,
  time,
  status,
  onPress,
  onConfirm,
}: MedicationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? { opacity: 0.92 } : undefined)}
    >
      <Card gap="md">
        <Flex direction="row" align="center" justify="space-between">
          <Flex gap="xs" style={{ flex: 1 }}>
            <Text h4 firstChild style={{ marginBottom: 0 }}>
              {name}
            </Text>

            <Text fontSize={11} color="gray">
              <Ionicons name="stopwatch-outline" size={12} /> {time} | {dose}
            </Text>
          </Flex>

          <Button
            title="Confirmar"
            size="sm"
            color="green"
            onPress={(event) => {
              event.stopPropagation();
              onConfirm?.();
            }}
            containerStyle={{ alignSelf: "center" }}
          />
        </Flex>
      </Card>
    </Pressable>
  );
}
