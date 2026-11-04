import { apiConfig } from "@/lib/config";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!apiConfig.baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(new URL(path, apiConfig.baseUrl), options);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}
