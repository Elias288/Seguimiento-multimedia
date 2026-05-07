import { fetchWithTimeout } from "@/bin/fetchWithTimeout";
import { MultimediaTypes, type MultimediaItem } from "@/types/data.type";

const URL = "https://api.imdbapi.dev";
const LIMIT = 10;

export class IMDb implements MediaApi {
  async search(query: string): Promise<MultimediaItem[]> {
    const res = await fetchWithTimeout(
      `${URL}/search/titles?query=${query}&limit=${LIMIT}`,
      {},
      2000,
    );

    const data = await res.json();
    const { titles } = data;

    return titles.map((item: any) => ({
        name: item.originalTitle,
        alternative_name: item.primaryTitle,
        type: MultimediaTypes.SERIES,
        images: {
          image: item?.primaryImage?.url ?? "",
        },
      })) as MultimediaItem[];
  }
}
