import { create } from "zustand";
import { Medication, MedicationLog } from "../utils/types";
import MedicationRepository from "../services/database/MedicationRepository";
import MedicationLogsRepository from "../services/database/MedicationLogsRepository";

const medicationRepo = new MedicationRepository();
const medicationLogsRepo = new MedicationLogsRepository();

interface MedicationStore {
  medications: Medication[];
  medicationLogs: MedicationLog[];
  fetchMedications: () => Promise<void>;
  addMedication: (medication: Omit<Medication, "id" | "created_at">) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: number) => Promise<void>;
  confirmDose: (medicationId: number, scheduledTime: string) => Promise<void>;
  fetchLogs: () => Promise<void>;
}

export const useMedicationStore = create<MedicationStore>((set) => ({
  medications: [],
  medicationLogs: [],

  fetchMedications: async () => {
    const medications = await medicationRepo.findAll();
    set({ medications });
  },

  addMedication: async (medication) => {
    await medicationRepo.create({ ...medication, active: 1 });
    const medications = await medicationRepo.findAll();
    set({ medications });
  },

  updateMedication: async (medication) => {
    await medicationRepo.update(medication);
    const medications = await medicationRepo.findAll();
    set({ medications });
  },

  deleteMedication: async (id) => {
    await medicationRepo.softDelete(id);
    const medications = await medicationRepo.findAll();
    set({ medications });
  },

  confirmDose: async (medicationId, scheduledTime) => {
    await medicationLogsRepo.create({
      medication_id: medicationId,
      scheduled_time: scheduledTime,
      taken_at: new Date().toISOString(),
      status: "tomado",
    });
    const medicationLogs = await medicationLogsRepo.findAll();
    set({ medicationLogs });
  },

  fetchLogs: async () => {
    const medicationLogs = await medicationLogsRepo.findAll();
    set({ medicationLogs });
  },
}));
