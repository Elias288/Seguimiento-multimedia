import { AnimeJikan } from "@/apis/anime_jikan";
import { IMDb } from "@/apis/series_IMDB";
import type { ApiConfig, ApiOption } from "@/types/api.type";

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
