import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: Date): string {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatTime(date: Date): string {
  return format(date, "HH:mm");
}
