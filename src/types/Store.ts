import type { Location } from "./Location";

export interface Store extends Location {
    image?: MediaImage;
    entryFee?: number;
    rounds?: string;
    description?: string;
}