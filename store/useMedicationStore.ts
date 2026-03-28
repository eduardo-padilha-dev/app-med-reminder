import { create } from "zustand";

interface Medication {
  id: number;
  name: string;
  dose: string;
  frequency: string;
  times: string[];
  notes?: string;
  active: number;
  status: "tomado" | "pendente" | "pulado";
}

interface MedicationStore {
  medications: Medication[];
}

export const useMedicationStore = create<MedicationStore>(() => ({
  medications: [
    {
      id: 1,
      name: "Paracetamol",
      dose: "500mg",
      frequency: "Diário",
      times: ["08:00", "20:00"],
      notes: "Tomar após refeição",
      active: 1,
      status: "pendente",
    },
    {
      id: 2,
      name: "Amoxicilina",
      dose: "500mg",
      frequency: "8 em 8 horas",
      times: ["08:00", "16:00", "00:00"],
      active: 1,
      status: "tomado",
    },
    {
      id: 3,
      name: "Vitamina D",
      dose: "2000UI",
      frequency: "Diário",
      times: ["08:00"],
      active: 1,
      status: "pulado",
    },
  ],
}));
