import {
  DEFAULTS_VALUES,
  EMPTY_MULTIMEDIA,
  mapToCategoria,
  type CompressedMultimedia,
  type CompressedMultimediaItem,
  type Multimedia,
  type MultimediaItem,
} from "@/types/data.type";

const isEmpty = (value: any) =>
  value === "" || value === null || value === undefined || value.length === 0;

export const compressMultimedia = (data: Multimedia): string => {
  const result: CompressedMultimedia = {};

  Object.entries(data).forEach(([key, items]) => {
    result[key] = items.map((item: MultimediaItem) => {
      const compressed: Partial<CompressedMultimediaItem> = {
        n: item.name,
      };

      if (
        !isEmpty(item.alternative_name) &&
        item.alternative_name !== DEFAULTS_VALUES.alternative_name
      )
        compressed.an = item.alternative_name;

      if (
        !isEmpty(item.description) &&
        item.description !== DEFAULTS_VALUES.description
      )
        compressed.d = item.description;

      if (!isEmpty(item.status) && item.status !== DEFAULTS_VALUES.status)
        compressed.s = item.status;

      if (
        !isEmpty(item.total_caps) &&
        item.total_caps !== DEFAULTS_VALUES.total_caps
      )
        compressed.tc = item.total_caps;

      if (
        !isEmpty(item.total_seasons) &&
        item.total_seasons !== DEFAULTS_VALUES.total_seasons
      )
        compressed.ts = item.total_seasons;

      if (
        !isEmpty(item.actual_season) &&
        item.actual_season !== DEFAULTS_VALUES.actual_season
      )
        compressed.as = item.actual_season;

      if (
        !isEmpty(item.actual_episode) &&
        item.actual_episode !== DEFAULTS_VALUES.actual_episode
      )
        compressed.ae = item.actual_episode;

      if (!isEmpty(item.status) && item.status !== DEFAULTS_VALUES.status)
        compressed.s = item.status;

      if (!isEmpty(item.images) && item.images !== DEFAULTS_VALUES.images) {
        compressed.i = item.images?.image;
        compressed.smi = item.images?.smallImage;
        compressed.lgi = item.images?.largeImage;
      }

      return compressed;
    });
  });

  return JSON.stringify(result);
};

export const decompressMultimedia = (data: string): Multimedia => {
  const result: Multimedia = EMPTY_MULTIMEDIA;
  const dataObject = JSON.parse(data) as CompressedMultimediaItem;

  Object.entries(dataObject).forEach(([key, items]) => {
    result[mapToCategoria(key)] = items.map(
      (item: Partial<CompressedMultimediaItem>) => ({
        name: item.n ?? "",
        alternative_name: item.an ?? "",
        description: item.d ?? "",
        total_caps: item.tc ?? DEFAULTS_VALUES.total_caps,
        total_seasons: item.ts ?? DEFAULTS_VALUES.total_seasons,
        actual_episode: item.ae ?? DEFAULTS_VALUES.actual_episode,
        actual_season: item.as ?? DEFAULTS_VALUES.actual_season,
        status: item.s ?? DEFAULTS_VALUES.status!,
        images: {
          image: item.i ?? DEFAULTS_VALUES.images?.image,
          smallImage: item.smi ?? DEFAULTS_VALUES.images?.smallImage,
          largeImage: item.lgi ?? DEFAULTS_VALUES.images?.largeImage,
        },
      }),
    );
  });

  return result;
};
