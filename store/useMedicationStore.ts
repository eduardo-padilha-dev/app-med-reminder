import { create } from "zustand";

export interface Medication {
  id: number;
  name: string;
  dose: string;
  frequency: string;
  times: string[];
  notes?: string;
  active: number;
  status: "tomado" | "pendente" | "pulado";
}

export interface MedicationLog {
  id: number;
  medication_id: number;
  scheduled_time: string;
  taken_at: string | null;
  status: "tomado" | "pendente" | "pulado";
}

interface MedicationStore {
  medications: Medication[];
  medicationLogs: MedicationLog[];
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
    {
      id: 4,
      name: "Ibuprofeno",
      dose: "200mg",
      frequency: "A cada 4 horas",
      times: ["08:00", "12:00", "16:00", "20:00"],
      notes: "Não exceder 6 comprimidos por dia",
      active: 1,
      status: "pendente",
    },
    {
      id: 5,
      name: "Omeprazol",
      dose: "20mg",
      frequency: "Diário",
      times: ["07:00"],
      active: 1,
      status: "tomado",
    },
    {
      id: 6,
      name: "Losartana",
      dose: "50mg",
      frequency: "Diário",
      times: ["09:00"],
      notes: "Controle de pressão arterial",
      active: 1,
      status: "pendente",
    },
    {
      id: 7,
      name: "Metformina",
      dose: "500mg",
      frequency: "2 vezes ao dia",
      times: ["08:00", "20:00"],
      active: 1,
      status: "tomado",
    },
    {
      id: 8,
      name: "Atorvastatina",
      dose: "10mg",
      frequency: "Diário",
      times: ["21:00"],
      active: 1,
      status: "pulado",
    },
    {
      id: 9,
      name: "Dipirona",
      dose: "500mg",
      frequency: "A cada 6 horas",
      times: ["06:00", "12:00", "18:00", "00:00"],
      active: 1,
      status: "pendente",
    },
    {
      id: 10,
      name: "Cetirizina",
      dose: "10mg",
      frequency: "Diário",
      times: ["20:00"],
      notes: "Pode causar sonolência",
      active: 0,
      status: "pendente",
    },
    {
      id: 11,
      name: "Levotiroxina",
      dose: "50mcg",
      frequency: "Diário",
      times: ["06:00"],
      notes: "Tomar em jejum",
      active: 1,
      status: "tomado",
    },
    {
      id: 12,
      name: "Ranitidina",
      dose: "150mg",
      frequency: "2 vezes ao dia",
      times: ["08:00", "20:00"],
      active: 1,
      status: "pendente",
    },
    {
      id: 13,
      name: "Prednisona",
      dose: "5mg",
      frequency: "Diário",
      times: ["08:00"],
      notes: "Reduzir gradualmente",
      active: 0,
      status: "tomado",
    },
  ],
  medicationLogs: [
    {
      id: 1,
      medication_id: 1,
      scheduled_time: "2010-04-23 08:00:00",
      taken_at: "2010-04-23 08:07:00",
      status: "tomado",
    },
    {
      id: 2,
      medication_id: 1,
      scheduled_time: "2029-04-23 20:00:00",
      taken_at: null,
      status: "pulado",
    },
    {
      id: 3,
      medication_id: 1,
      scheduled_time: "1990-04-24 08:00:00",
      taken_at: "2026-04-24 08:02:00",
      status: "tomado",
    },
    {
      id: 4,
      medication_id: 1,
      scheduled_time: "2026-04-25 08:00:00",
      taken_at: null,
      status: "pendente",
    },
    {
      id: 5,
      medication_id: 2,
      scheduled_time: "2025-04-24 08:00:00",
      taken_at: "2025-04-24 08:05:00",
      status: "tomado",
    },
    {
      id: 6,
      medication_id: 2,
      scheduled_time: "2022-04-24 16:00:00",
      taken_at: "2022-04-24 16:13:00",
      status: "tomado",
    },
    {
      id: 7,
      medication_id: 2,
      scheduled_time: "2023-04-25 00:00:00",
      taken_at: null,
      status: "pulado",
    },
    {
      id: 8,
      medication_id: 3,
      scheduled_time: "2026-04-24 08:00:00",
      taken_at: null,
      status: "pulado",
    },
    {
      id: 9,
      medication_id: 3,
      scheduled_time: "2026-04-25 08:00:00",
      taken_at: null,
      status: "pendente",
    },
    {
      id: 10,
      medication_id: 4,
      scheduled_time: "2026-04-24 12:00:00",
      taken_at: "2026-04-24 12:04:00",
      status: "tomado",
    },
    {
      id: 11,
      medication_id: 4,
      scheduled_time: "2026-04-24 16:00:00",
      taken_at: "2026-04-24 16:11:00",
      status: "tomado",
    },
    {
      id: 12,
      medication_id: 4,
      scheduled_time: "2026-04-24 20:00:00",
      taken_at: null,
      status: "pulado",
    },
    {
      id: 13,
      medication_id: 5,
      scheduled_time: "2026-04-25 07:00:00",
      taken_at: "2026-04-25 06:56:00",
      status: "tomado",
    },
    {
      id: 14,
      medication_id: 6,
      scheduled_time: "2026-04-24 09:00:00",
      taken_at: "2026-04-24 09:17:00",
      status: "tomado",
    },
    {
      id: 15,
      medication_id: 6,
      scheduled_time: "2026-04-25 09:00:00",
      taken_at: null,
      status: "pendente",
    },
    {
      id: 16,
      medication_id: 7,
      scheduled_time: "2026-04-24 08:00:00",
      taken_at: "2026-04-24 08:03:00",
      status: "tomado",
    },
    {
      id: 17,
      medication_id: 7,
      scheduled_time: "2026-04-24 20:00:00",
      taken_at: "2026-04-24 20:14:00",
      status: "tomado",
    },
    {
      id: 18,
      medication_id: 8,
      scheduled_time: "2026-04-24 21:00:00",
      taken_at: null,
      status: "pulado",
    },
    {
      id: 19,
      medication_id: 9,
      scheduled_time: "2026-04-25 06:00:00",
      taken_at: "2026-04-25 06:06:00",
      status: "tomado",
    },
    {
      id: 20,
      medication_id: 9,
      scheduled_time: "2026-04-25 12:00:00",
      taken_at: null,
      status: "pendente",
    },
    {
      id: 21,
      medication_id: 10,
      scheduled_time: "2026-04-24 20:00:00",
      taken_at: "2026-04-24 20:02:00",
      status: "tomado",
    },
    {
      id: 22,
      medication_id: 11,
      scheduled_time: "2026-04-24 06:00:00",
      taken_at: "2026-04-24 05:58:00",
      status: "tomado",
    },
    {
      id: 23,
      medication_id: 11,
      scheduled_time: "2026-04-25 06:00:00",
      taken_at: "2026-04-25 06:01:00",
      status: "tomado",
    },
    {
      id: 24,
      medication_id: 12,
      scheduled_time: "2026-04-24 08:00:00",
      taken_at: "2026-04-24 08:10:00",
      status: "tomado",
    },
    {
      id: 25,
      medication_id: 12,
      scheduled_time: "2026-04-24 20:00:00",
      taken_at: null,
      status: "pulado",
    },
    {
      id: 26,
      medication_id: 12,
      scheduled_time: "2026-04-25 08:00:00",
      taken_at: null,
      status: "pendente",
    },
    {
      id: 27,
      medication_id: 13,
      scheduled_time: "2026-04-23 08:00:00",
      taken_at: "2026-04-23 08:21:00",
      status: "tomado",
    },
    {
      id: 28,
      medication_id: 13,
      scheduled_time: "2026-04-24 08:00:00",
      taken_at: "2026-04-24 08:05:00",
      status: "tomado",
    },
    {
      id: 29,
      medication_id: 4,
      scheduled_time: "2026-04-25 08:00:00",
      taken_at: "2026-04-25 08:04:00",
      status: "tomado",
    },
    {
      id: 30,
      medication_id: 2,
      scheduled_time: "2026-04-25 16:00:00",
      taken_at: null,
      status: "pendente",
    },
  ],
}));
