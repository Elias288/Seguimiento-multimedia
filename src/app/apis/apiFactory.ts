import type { MediaApi } from "@/types/data.type";
import { AnimeJikan } from "./anime_jikan";
import { IMDb } from "./series_IMDb";

type ApiConfig = {
  label: string;
  factory: () => MediaApi;
};

export const API_OPTIONS = ["jikan", "IMDb"] as const;
export type ApiOption = (typeof API_OPTIONS)[number];
const apiMap: Record<ApiOption, ApiConfig> = {
  jikan: {
    label: "Jikan (anime)",
    factory: () => new AnimeJikan(),
  },
  IMDb: {
    label: "IMDb",
    factory: () => new IMDb(),
  },
};

export const getApi = (type: ApiOption): MediaApi => {
  const { factory } = apiMap[type];

  if (!factory) throw new Error("Api no encontrada");

  return factory();
};

export const getAvailableApis = () => {
  return Object.entries(apiMap).map(([key, values]) => ({
    key: key as ApiOption,
    label: values.label,
  }));
};
