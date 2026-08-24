import type { MultimediaItem } from "@/types/data.type";

export interface MediaApi {
  search(query: string): Promise<MultimediaItem[]>;

  getInfo(id: string): Promise<MultimediaItem>;
}

export type ApiErrorCode =
  | "TIMEOUT"
  | "NETWORK"
  | "NOT_FOUND"
  | "RATE_LIMIT"
  | "UNKNOWN";

export type ApiConfig = {
  label: string;
  factory: () => MediaApi;
};
export const API_OPTIONS = ["jikan_anime", "jikan_manga", "IMDb"] as const;
export type ApiOption = (typeof API_OPTIONS)[number];
