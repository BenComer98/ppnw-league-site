import type { ApiResponse } from "../types/ApiResponse";
import type { PlayerEventRecordRaw } from "../types/PlayerEventRecordRaw";

const API_URL: string = import.meta.env.VITE_SHEET_API_URL;

if (!API_URL) {
  throw new Error ("VITE_SHEET_API_URL is not defined (did you add a .env file?)");
}

export async function getRecords(): Promise<PlayerEventRecordRaw[]> {
  const response = await fetch(`${API_URL}?action=rows`);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result: ApiResponse<PlayerEventRecordRaw[]> = await response.json();

  if (!result.success) {
    throw new Error(result.error || "API request failed");
  }
  
  return result.data ?? [];
}