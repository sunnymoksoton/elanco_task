import { type Sighting } from "../types/sighting";

const API_URL = "https://dev-task.elancoapps.com/data/tick-sightings";

export async function fetchSightings(): Promise<Sighting[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: Sighting[] = await response.json();

  return data;
}