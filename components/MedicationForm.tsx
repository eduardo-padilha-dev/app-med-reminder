import {
  Button,
  Form,
  Select,
  Text,
  TextInput,
  useTheme,
  useForm,
} from "@andresjesse/bobber-ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable } from "react-native";
import { getAppColors } from "../constants/colors";
import z from "zod";

const FREQUENCY_OPTIONS = [
  "Todos os dias",
  "2 vezes ao dia",
  "3 vezes ao dia",
  "8 em 8 horas",
  "A cada 12 horas",
  "Sob demanda",
];

type MedicationFormProps = {
  onSuccess?: () => void;
};

export default function MedicationForm({ onSuccess }: MedicationFormProps) {
  const { theme } = useTheme();
  const colors = getAppColors(theme.colorScheme);
  const [times, setTimes] = useState<string[]>(["08:00"]);
  const [timeInput, setTimeInput] = useState("");
  const [timesError, setTimesError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: "",
      dose: "",
      frequency: "Todos os dias",
      notes: "",
    },
    validations: {
      name: z.string().min(2, "Informe o nome do medicamento"),
      dose: z.string().min(1, "Informe a dose"),
      frequency: z.string().min(1, "Informe a frequencia"),
      notes: z.string().optional(),
    },
    onSubmit: (values) => {
      if (!times.length) {
        setTimesError("Adicione ao menos um horario");
        return;
      }

      setTimesError(null);
      console.log("Form Submitted:", {
        ...values,
        times,
      });

      onSuccess?.();
    },
  });

  const handleAddTime = () => {
    const normalized = timeInput.trim();

    if (!normalized) return;
    if (!/^\d{2}:\d{2}$/.test(normalized)) {
      setTimesError("Use o formato HH:mm");
      return;
    }
    if (times.includes(normalized)) {
      setTimesError("Esse horario ja foi adicionado");
      return;
    }

    setTimes((prev) => [...prev, normalized]);
    setTimeInput("");
    setTimesError(null);
  };

  const handleRemoveTime = (time: string) => {
    setTimes((prev) => prev.filter((item) => item !== time));
    if (timesError) setTimesError(null);
  };

  return (
    <Form gap="sm">
      <Text fontSize={12} fontWeight="700" color={colors.textSecondary}>
        CADASTRO
      </Text>

      <TextInput
        label="Nome do medicamento"
        placeholder="Ex: Paracetamol"
        {...form.getInputProps("name")}
      />

      <TextInput
        label="Dose"
        placeholder="Ex: 500mg"
        {...form.getInputProps("dose")}
      />

      <Select
        data={FREQUENCY_OPTIONS}
        label="Frequencia"
        {...form.getSelectProps("frequency")}
      />

      <Text fontWeight="700" style={{ marginTop: 4, marginBottom: -8 }}>
        Horarios
      </Text>

      <Form direction="row" gap="xs" wrap="wrap">
        {times.map((time) => (
          <Pressable
            key={time}
            onPress={() => handleRemoveTime(time)}
            style={{
              backgroundColor: colors.backgroundAlt,
              borderColor: colors.primaryAlt,
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text fontWeight="700" color={colors.primaryAlt}>
              {time}
            </Text>
            <Ionicons name="close" size={14} color={colors.primaryAlt} />
          </Pressable>
        ))}
      </Form>

      <Form direction="row" gap="xs" align="center">
        <TextInput
          label=""
          placeholder="HH:mm"
          value={timeInput}
          onChangeText={setTimeInput}
          keyboardType="numbers-and-punctuation"
          style={{ flex: 1 }}
        />
        <Button title="+ Adicionar" variant="light" onPress={handleAddTime} />
      </Form>

      {!!timesError && (
        <Text fontSize={12} color={colors.error}>
          {timesError}
        </Text>
      )}

      <TextInput
        label="Observacoes (opcional)"
        placeholder="Ex: Tomar apos as refeicoes"
        multiline
        numberOfLines={3}
        {...form.getInputProps("notes")}
      />

      <Button
        title="Salvar Medicamento"
        fullWidth
        size="lg"
        disabled={form.hasErrors}
        onPress={form.submit}
      />
    </Form>
  );
}
