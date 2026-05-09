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
export const API_OPTIONS = ["jikan_anime", "jikan_manga", "IMDb"] as const;
export type ApiOption = (typeof API_OPTIONS)[number];
export const apiMap: Record<ApiOption, ApiConfig> = {
  jikan_anime: {
    label: "Jikan (anime)",
    factory: () => new AnimeJikan("anime"),
  },
  jikan_manga: {
    label: "Jikan (manga)",
    factory: () => new AnimeJikan("manga"),
  },
  IMDb: {
    label: "IMDb",
    factory: () => new IMDb(),
  },
};
