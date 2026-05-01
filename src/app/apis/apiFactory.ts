import type { MediaApi } from "@/types/data.type";
import { AnimeJikan } from "./anime_jikan";

export type ApiOption = "jikan";

export const getApi = (type: ApiOption): MediaApi => {
  switch (type) {
    case "jikan":
      return new AnimeJikan();
    default:
      throw new Error("Api no soportada");
  }
};
