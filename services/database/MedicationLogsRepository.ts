import db from "./initializeDatabase";
import { MedicationLog } from "../../utils/types";

export default class MedicationLogsRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS medication_logs ( id INTEGER PRIMARY KEY AUTOINCREMENT, medication_id INTEGER NOT NULL, scheduled_time TEXT NOT NULL, taken_at TEXT, status TEXT NOT NULL, FOREIGN KEY (medication_id) REFERENCES medications(id));",
    );
  }

  public async down() {
    await db.runAsync("DROP TABLE medication_logs;");
  }

  public async create(log: Omit<MedicationLog, "id">) {
    const result = await db.runAsync(
      "INSERT INTO medication_logs (medication_id, scheduled_time, taken_at, status) VALUES (?, ?, ?, ?)",
      [log.medication_id, log.scheduled_time, log.taken_at ?? null, log.status],
    );
    return result;
  }

  public async findAll(): Promise<MedicationLog[]> {
    return await db.getAllAsync<MedicationLog>(
      "SELECT * FROM medication_logs ORDER BY scheduled_time DESC",
    );
  }

  public async findByMedicationId(
    medicationId: number,
  ): Promise<MedicationLog[]> {
    return await db.getAllAsync<MedicationLog>(
      "SELECT * FROM medication_logs WHERE medication_id = ? ORDER BY scheduled_time DESC",
      [medicationId],
    );
  }
}
