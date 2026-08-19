import type { Event } from "./Event";

export interface RecurringEvent extends Event {
    weekday: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    time: string; // Time of day in 12-hour format (xx:xx AM/PM)
}