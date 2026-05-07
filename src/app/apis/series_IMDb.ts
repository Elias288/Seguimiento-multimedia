import { fetchWithTimeout } from "@/bin/fetchWithTimeout";
import {
  MultimediaTypes,
  type MediaApi,
  type MultimediaInfo,
} from "@/types/data.type";

const URL = "https://api.imdbapi.dev";
const LIMIT = 10;

export class IMDb implements MediaApi {
  async search(query: string): Promise<MultimediaInfo[]> {
    const res = await fetchWithTimeout(
      `${URL}/search/titles?query=${query}&limit=${LIMIT}`,
      {},
      2000,
    );

    const data = await res.json();
    console.log(data);
    const { titles } = data;

    return titles.map((item: any) => ({
      type: MultimediaTypes.SERIES,
      item: {
        name: item.originalTitle,
        alternative_name: item.primaryTitle,
        images: {
          image: item?.primaryImage?.url ?? "",
        },
      },
    })) as MultimediaInfo[];
  }
}
