import z from "zod";

export const medicationValidationSchema = {
  name: z.string().min(2, "Informe o nome do medicamento"),
  dose: z.string().min(1, "Informe a dose"),
  frequency: z.string().min(1, "Informe a frequencia"),
  notes: z.string().optional(),
};
