import type { Location } from "./Location";

export interface Event {
    name: string;
    location: Location;
    rounds: number;
}