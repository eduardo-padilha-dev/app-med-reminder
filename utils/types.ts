export type Medication = {
  id: number;
  name: string;
  dose: string;
  frequency: string;
  times: string[];
  notes?: string;
  active: number;
};

export type MedicationLog = {
  id: number;
  medication_id: number;
  scheduled_time: string;
  taken_at: string | null;
  status: "tomado" | "pendente" | "pulado";
};
