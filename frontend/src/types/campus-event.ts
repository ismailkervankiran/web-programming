export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  description: string;
  capacity: number;
  image?: string;
}

// Formdaki değerler: id yok, input hep metin verdiği için kontenjan string
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

// Her alana en fazla bir hata mesajı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
