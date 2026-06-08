import db from "./initializeDatabse";
import { MedicationLog } from "../../utils/types";

export default class MedicationLogs {
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
}
