import type { MultimediaItem } from "@/types/data.type";
import { AnimeJikan } from "./anime_jikan";
import { IMDb } from "./series_IMDb";

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
export const API_OPTIONS = ["jikan", "IMDb"] as const;
export type ApiOption = (typeof API_OPTIONS)[number];
export const apiMap: Record<ApiOption, ApiConfig> = {
  jikan: {
    label: "Jikan (anime)",
    factory: () => new AnimeJikan(),
  },
  IMDb: {
    label: "IMDb",
    factory: () => new IMDb(),
  },
};
