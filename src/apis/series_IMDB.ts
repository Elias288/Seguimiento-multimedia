/**
 * Documentación: https://imdbapi.dev/
 */

import { fetchWithTimeout } from "@/bin/fetchWithTimeout";
import {
  MultimediaTypes,
  Status,
  type MultimediaItem,
} from "@/types/data.type";
import type { MediaApi } from "@/types/api.type";
import { ApiError } from "./apiError";

const URL = "https://api.imdbapi.dev";
const LIMIT = 10;

export class IMDb implements MediaApi {
  async search(query: string): Promise<MultimediaItem[]> {
    try {
      const res = await fetchWithTimeout(
        `${URL}/search/titles?query=${query}&limit=${LIMIT}`,
        {},
        1000,
      );

      if (!res.ok) {
        switch (res.status) {
          case 404:
            throw new ApiError("No encontrado", "NOT_FOUND", "IMDb_search");
          case 429:
            throw new ApiError("Rate limit", "RATE_LIMIT", "IMDb_search");
          default:
            throw new ApiError("Error desconocido", "UNKNOWN", "IMDb_search");
        }
      }

      const data = await res.json();
      const { titles } = data;

      return titles
        .filter((item: any) => item.type === "tvSeries")
        .map((item: any) => ({
          id: item.id,
          name: item.originalTitle,
          alternative_name: item.primaryTitle,
          description: "",
          timestamp: new Date().toISOString(),
          images: {
            image: item?.primaryImage?.url ?? "",
          },
        })) as MultimediaItem[];
    } catch (error: any) {
      if (error.name === "AbortError")
        throw new ApiError("Timeout", "TIMEOUT", "IMDb");

      if (error instanceof ApiError) throw error;

      throw new ApiError("Error de red", "NETWORK", "IMDb");
    }
  }

  async getInfo(multimediaId: string): Promise<MultimediaItem> {
    try {
      const res = await fetchWithTimeout(
        `${URL}/titles/${multimediaId}`,
        {},
        2000,
      );

      if (!res.ok) {
        switch (res.status) {
          case 404:
            throw new ApiError("No encontrado", "NOT_FOUND", "IMDb_getInfo");
          case 429:
            throw new ApiError("Rate limit", "RATE_LIMIT", "IMDb_getInfo");
          default:
            throw new ApiError("Error desconocido", "UNKNOWN", "IMDb_getInfo");
        }
      }

      const data = await res.json();
      const seasons = await getSeasonsInfo(multimediaId);

      return {
        id: data.id,
        name: data.primaryTitle,
        alternative_name: data.originalTitle ?? "",
        description: data.plot,
        type: MultimediaTypes.SERIES,
        timestamp: new Date().toISOString(),
        status: Status.POR_VER,
        total_caps: seasons.totalEpisodes,
        total_seasons: seasons.totalSeasons,
        images: {
          image: data?.primaryImage?.url ?? "",
        },
      } as MultimediaItem;
    } catch (error: any) {
      if (error.name === "AbortError")
        throw new ApiError("Timeout", "TIMEOUT", "IMDb_getInfo");

      if (error instanceof ApiError) throw error;

      throw new ApiError("Error de red", "NETWORK", "IMDb_getInfo");
    }
  }
}

const getSeasonsInfo = (multimediaId: string) => {
  return fetchWithTimeout(`${URL}/titles/${multimediaId}/seasons`, {}, 2000)
    .then((res) => res.json())
    .then((data) => {
      const totalSeasons = data.seasons.length;
      const totalEpisodes = data.seasons.reduce(
        (acc: number, season: any) => acc + season.episodeCount,
        0,
      );
      return { totalEpisodes, totalSeasons };
    });
};
