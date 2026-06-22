import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: Date): string {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatTime(date: Date): string {
  return format(date, "HH:mm");
}

export function getTodayScheduledTime(time: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `${today}T${time}:00`;
}

export function getDateRangeStrings(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
