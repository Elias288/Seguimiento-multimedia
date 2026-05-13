/**
 * Documentación: https://docs.api.jikan.moe/
 */

import { fetchWithTimeout } from "@/bin/fetchWithTimeout";
import {
  MultimediaTypes,
  Status,
  type MultimediaItem,
} from "@/types/data.type";
import type { MediaApi } from "./api.types";
import { ApiError } from "./apiError";

const URL = "https://api.jikan.moe/v4";
const LIMIT = 10;

type JikanType = "anime" | "manga";
export class AnimeJikan implements MediaApi {
  type: JikanType;

  constructor(type: JikanType) {
    this.type = type;
  }

  async search(query: string): Promise<MultimediaItem[]> {
    try {
      const res = await fetchWithTimeout(
        `${URL}/${this.type}?limit=${LIMIT}&q=${query}`,
        {},
        2000,
      );

      if (!res.ok) {
        switch (res.status) {
          case 404:
            throw new ApiError("No encontrado", "NOT_FOUND", "JikanApi_search");
          case 429:
            throw new ApiError("Rate limit", "RATE_LIMIT", "JikanApi_search");
          default:
            throw new ApiError(
              "Error desconocido",
              "UNKNOWN",
              "JikanApi_search",
            );
        }
      }

      const { data, pagination } = await res.json();
      return data.map((item: any) => ({
        id: item.mal_id,
        name: item.title,
        alternative_name: item.title_english ?? "",
        description: item.synopsis ?? "",
        timestamp: new Date().toISOString(),
        images: {
          image: item.images.webp.image_url,
          smallImage: item.images.webp.small_image_url,
          largeImage: item.images.webp.large_image_url,
        },
      })) as MultimediaItem[];
    } catch (error: any) {
      if (error.name === "AbortError")
        throw new ApiError("Timeout", "TIMEOUT", "JikanApi");

      if (error instanceof ApiError) throw error;

      throw new ApiError("Error de red", "NETWORK", "JikanApi");
    }
  }

  async getInfo(multimediaId: string): Promise<MultimediaItem> {
    try {
      const res = await fetchWithTimeout(
        `${URL}/${this.type}/${multimediaId}/full`,
        {},
        2000,
      );

      if (!res.ok) {
        switch (res.status) {
          case 404:
            throw new ApiError(
              "No encontrado",
              "NOT_FOUND",
              "JikanApi_getInfo",
            );
          case 429:
            throw new ApiError("Rate limit", "RATE_LIMIT", "JikanApi_getInfo");
          default:
            throw new ApiError(
              "Error desconocido",
              "UNKNOWN",
              "JikanApi_getInfo",
            );
        }
      }

      const { data, pagination } = await res.json();
      // console.log(data);

      if (this.type.toLocaleLowerCase().trim() === "manga") {
        return {
          id: data.mal_id,
          name: data.title,
          alternative_name: data.title_english ?? "",
          description: data.synopsis ?? "",
          timestamp: new Date().toISOString(),
          type: MultimediaTypes.MAGAS,
          status: Status.POR_VER,
          total_caps: data.chapters,
          total_seasons: data.volumes,
          images: {
            image: data.images.webp.image_url,
            smallImage: data.images.webp.small_image_url,
            largeImage: data.images.webp.large_image_url,
          },
        } as MultimediaItem;
      }

      return {
        id: data.mal_id,
        name: data.title,
        alternative_name: data.title_english ?? "",
        description: data.synopsis ?? "",
        type: MultimediaTypes.ANIMES,
        timestamp: new Date().toISOString(),
        status: Status.POR_VER,
        total_caps: data.episodes,
        total_seasons: 1,
        images: {
          image: data.images.webp.image_url,
          smallImage: data.images.webp.small_image_url,
          largeImage: data.images.webp.large_image_url,
        },
      } as MultimediaItem;
    } catch (error: any) {
      if (error.name === "AbortError")
        throw new ApiError("Timeout", "TIMEOUT", "JikanApi_getInfo");

      if (error instanceof ApiError) throw error;

      console.error(error);
      throw new ApiError("Error de red", "NETWORK", "JikanApi_getInfo");
    }
  }
}
