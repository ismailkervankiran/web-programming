import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

// Form verisini CampusEvent'e çevirir; güncellemede eski afiş korunur
function toEvent(id: string, data: EventFormData, image?: string): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    capacity: Number(data.capacity),
    image
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Diziyi değiştirmeden yenisini kurar: ekle [...], güncelle map, sil filter
  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(events.map((e) => (e.id === id ? toEvent(id, data, e.image) : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// Kendi hook'umuz: useContext'i kısaltır
// eslint-disable-next-line react-refresh/only-export-components
export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("EventsProvider yok");
  return value;
}
