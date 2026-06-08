import db from "./initializeDatabse";
import { Medication } from "../../utils/types";

export default class MedicationRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS medications ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, dose TEXT NOT NULL, frequency TEXT NOT NULL, times TEXT NOT NULL, notes TEXT, active INTEGER DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);",
    );
  }

  public async down() {
    await db.runAsync("DROP TABLE medications;");
  }

  public async create(medication: Omit<Medication, "id">) {
    const result = await db.runAsync(
      "INSERT INTO medications (name, dose, frequency, times, notes, active) values (?, ?, ?, ?, ?, ?)",
      [
        medication.name,
        medication.dose,
        medication.frequency,
        JSON.stringify(medication.times),
        medication.notes ?? null,
        medication.active,
      ],
    );

    return result;
  }
}
