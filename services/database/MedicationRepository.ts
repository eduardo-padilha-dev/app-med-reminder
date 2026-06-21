import db from "./initializeDatabase";
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

  public async create(medication: Omit<Medication, "id" | "created_at">) {
    const result = await db.runAsync(
      "INSERT INTO medications (name, dose, frequency, times, notes, active, created_at) values (?, ?, ?, ?, ?, ?, ?)",
      [
        medication.name,
        medication.dose,
        medication.frequency,
        JSON.stringify(medication.times),
        medication.notes ?? null,
        medication.active,
        new Date().toISOString(),
      ],
    );

    return result;
  }

  public async findAll(): Promise<Medication[]> {
    const rows = await db.getAllAsync<any>(
      "SELECT * FROM medications WHERE active = 1",
    );
    return rows.map((row) => ({
      ...row,
      times: JSON.parse(row.times),
    }));
  }

  public async findById(id: number): Promise<Medication | null> {
    const row = await db.getFirstAsync<any>(
      "SELECT * FROM medications WHERE id = ?",
      [id],
    );
    if (!row) return null;
    return { ...row, times: JSON.parse(row.times) };
  }

  public async update(medication: Medication) {
    await db.runAsync(
      "UPDATE medications SET name = ?, dose = ?, frequency = ?, times = ?, notes = ? WHERE id = ?",
      [
        medication.name,
        medication.dose,
        medication.frequency,
        JSON.stringify(medication.times),
        medication.notes ?? null,
        medication.id,
      ],
    );
  }

  public async softDelete(id: number) {
    await db.runAsync("UPDATE medications SET active = 0 WHERE id = ?", [id]);
  }

  public async deleteAll() {
    await db.runAsync("DELETE FROM medications;");
  }
}
