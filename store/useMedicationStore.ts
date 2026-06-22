import { create } from "zustand";
import { Medication, MedicationLog } from "../utils/types";
import MedicationRepository from "../services/database/MedicationRepository";
import MedicationLogsRepository from "../services/database/MedicationLogsRepository";
import {
  getTodayScheduledTime,
  getDateRangeStrings,
} from "../utils/formatDate";

const medicationRepo = new MedicationRepository();
const medicationLogsRepo = new MedicationLogsRepository();

interface MedicationStore {
  medications: Medication[];
  medicationLogs: MedicationLog[];
  fetchMedications: () => Promise<void>;
  addMedication: (
    medication: Omit<Medication, "id" | "created_at">,
  ) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: number) => Promise<void>;
  confirmDose: (medicationId: number, scheduledTime: string) => Promise<void>;
  fetchLogs: () => Promise<void>;
  resetAllData: () => Promise<void>;
  checkAndMarkSkippedDoses: () => Promise<void>;
}

export const useMedicationStore = create<MedicationStore>((set, get) => ({
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
    const alreadyConfirmed = get().medicationLogs.some(
      (log) =>
        log.medication_id === medicationId &&
        log.scheduled_time === scheduledTime &&
        log.status === "tomado",
    );

    if (alreadyConfirmed) {
      console.log("Dose já confirmada, ignorando duplicata.");
      return;
    }

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

  resetAllData: async () => {
    await medicationLogsRepo.deleteAll();
    await medicationRepo.deleteAll();
    set({ medications: [], medicationLogs: [] });
  },

  checkAndMarkSkippedDoses: async () => {
    const { medications, medicationLogs } = get();
    const now = new Date();

    for (const medication of medications) {
      const createdDate = new Date(medication.created_at);
      const days = getDateRangeStrings(createdDate, now);

      for (const day of days) {
        for (const time of medication.times) {
          const scheduledTime = `${day}T${time}:00`;
          const scheduledDate = new Date(scheduledTime);

          if (scheduledDate >= now) continue; // ainda não chegou a hora

          const hasLog = medicationLogs.some(
            (log) =>
              log.medication_id === medication.id &&
              log.scheduled_time === scheduledTime,
          );

          if (!hasLog) {
            await medicationLogsRepo.create({
              medication_id: medication.id,
              scheduled_time: scheduledTime,
              taken_at: null,
              status: "pulado",
            });
          }
        }
      }
    }

    const updatedLogs = await medicationLogsRepo.findAll();
    set({ medicationLogs: updatedLogs });
  },
}));
