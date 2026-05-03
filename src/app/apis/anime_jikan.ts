import { fetchWithTimeout } from "@/bin/fetchWithTimeout";
import {
  MultimediaTypes,
  Status,
  type MediaApi,
  type MultimediaInfo,
} from "@/types/data.type";

const URL = "https://api.jikan.moe/v4";
const LIMIT = 10;

export class AnimeJikan implements MediaApi {
  async search(query: string): Promise<MultimediaInfo[]> {
    const res = await fetchWithTimeout(
      `${URL}/anime?limit=${LIMIT}&q=${query}`,
      {},
      2000,
    );

    const { data, pagination } = await res.json();
    if (data.error) return [];

    return data.map((item: any) => ({
      type: MultimediaTypes.ANIMES,
      item: {
        name: item.title,
        alternative_name: item.title_english ?? "",
        description: item.synopsis ?? "",
        total_caps: item.episodes ?? 0,
        total_seasons: 1,
        actual_season: 1,
        actual_episode: 0,
        status: Status.POR_VER,
        images: {
          image: item.images.webp.image_url,
          smallImage: item.images.webp.small_image_url,
          largeImage: item.images.webp.large_image_url,
        },
      },
    })) as MultimediaInfo[];
  }
}
