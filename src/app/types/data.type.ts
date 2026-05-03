export type Multimedia = Record<MultimediaTypes, MultimediaItem[]>;
export type CompressedMultimedia = Record<
  string,
  Partial<CompressedMultimediaItem>[]
>;

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
  name: string;
  alternative_name: string;
  description: string;
  total_caps?: number;
  total_seasons?: number;
  actual_season?: number;
  actual_episode?: number;
  status: Status;
  images?: { image?: string; smallImage?: string; largeImage?: string };
}

export const DEFAULTS_VALUES: Partial<MultimediaItem> = {
  alternative_name: "",
  description: "",
  total_caps: undefined,
  total_seasons: undefined,
  actual_season: undefined,
  actual_episode: undefined,
  status: Status.POR_VER,
  images: {
    image: undefined,
    smallImage: undefined,
    largeImage: undefined,
  },
};

export interface CompressedMultimediaItem {
  n: string;
  an?: string;
  d?: string;
  tc?: number;
  ts?: number;
  as?: number;
  ae?: number;
  s?: Status;
  i?: string;
  smi?: string;
  lgi?: string;
}

export interface MultimediaInfo {
  type: MultimediaTypes;
  item: MultimediaItem;
}

export interface TypeList {
  type: MultimediaTypes;
  data: MultimediaItem[];
}

export const mapToCategoria = (value: string): MultimediaTypes => {
  const normalizado = value.toLocaleLowerCase().trim();

  const match = Object.values(MultimediaTypes).find(
    (tipo) => tipo === normalizado,
  );
  return match ?? MultimediaTypes.SIN_CATEGORIZAR;
};

export interface MediaApi {
  search(query: string): Promise<MultimediaInfo[]>;
}

export const EMPTY_FORMDATA: MultimediaItem = {
  name: "",
  alternative_name: "",
  description: "",
  status: Status.POR_VER,
  actual_episode: 0,
  actual_season: 0,
  total_caps: 0,
  total_seasons: 1,
  images: { image: undefined },
};
