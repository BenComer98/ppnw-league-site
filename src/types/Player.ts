import type { Store } from "./Store";

export interface Player {
    name: string;
    defaultStore?: Store;
}