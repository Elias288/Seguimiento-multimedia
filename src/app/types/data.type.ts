export type Multimedia = {
  fileName: string;
  media: Record<MultimediaTypes, MultimediaItem[]>;
};
export type CompressedMultimedia = {
  ft: string;
  m: Record<string, Partial<CompressedMultimediaItem>[]>;
};

export enum MultimediaTypes {
  ANIMES = "anime",
  SERIES = "serie",
  MAGAS = "manga",
  COMICS = "comic",
  SIN_CATEGORIZAR = "sin_categorizar",
}

export enum Status {
  VISTO = "visto",
  POR_VER = "por ver",
  VIENDO = "viendo",
  DEJADO = "dejado",
}

export interface MultimediaItem {
  id?: string;
  name: string;
  timestamp: string;
  alternative_name: string;
  description: string;
  total_caps?: number;
  total_seasons?: number;
  actual_season?: number;
  actual_episode?: number;
  status: Status;
  type?: MultimediaTypes;
  images?: { image?: string; smallImage?: string; largeImage?: string };
}

export const DEFAULTS_VALUES: MultimediaItem = {
  alternative_name: "",
  description: "",
  timestamp: new Date().toISOString(),
  name: "",
  total_caps: undefined,
  total_seasons: undefined,
  actual_season: undefined,
  actual_episode: undefined,
  type: MultimediaTypes.ANIMES,
  status: Status.POR_VER,
  images: {
    image: undefined,
    smallImage: undefined,
    largeImage: undefined,
  },
};

export interface CompressedMultimediaItem {
  ft: string;
  n: string;
  an?: string;
  d?: string;
  t: string;
  tc?: number;
  ts?: number;
  as?: number;
  ae?: number;
  s?: Status;
  i?: string;
  smi?: string;
  lgi?: string;
}

export const mapToCategoria = (value: string): MultimediaTypes => {
  const normalizado = value.toLocaleLowerCase().trim();

  const match = Object.values(MultimediaTypes).find(
    (tipo) => tipo === normalizado,
  );
  return match ?? MultimediaTypes.SIN_CATEGORIZAR;
};

export const EMPTY_FORMDATA: MultimediaItem = {
  name: "",
  type: MultimediaTypes.ANIMES,
  alternative_name: "",
  timestamp: "",
  description: "",
  status: Status.POR_VER,
  actual_episode: 0,
  actual_season: 0,
  total_caps: 0,
  total_seasons: 1,
  images: { image: undefined },
};

export const EMPTY_MULTIMEDIA = (): Multimedia => ({
  fileName: "",
  media: {
    [MultimediaTypes.ANIMES]: [],
    [MultimediaTypes.COMICS]: [],
    [MultimediaTypes.MAGAS]: [],
    [MultimediaTypes.SERIES]: [],
    [MultimediaTypes.SIN_CATEGORIZAR]: [],
  },
});

export const CABECERAS: (keyof MultimediaItem)[] = [
  "name",
  "alternative_name",
  "description",
  "type",
  "timestamp",
  "total_caps",
  "total_seasons",
  "actual_season",
  "actual_episode",
  "status",
  "images",
];
