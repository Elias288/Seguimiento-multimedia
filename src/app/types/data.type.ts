export type Multimedia = Record<string, MultimediaItem[]>;
export type CompressedMultimedia = Record<
  string,
  Partial<CompressedMultimediaItem>[]
>;

export interface MultimediaItem {
  name: string;
  alternative_name: string;
  description: string;
  total_caps?: number;
  total_seasons?: number;
  actual_season?: number;
  actual_episode?: number;
  status: "visto" | "por ver" | "viendo" | "dejado";
}

export const DEFAULTS_VALUES: Partial<MultimediaItem> = {
  alternative_name: "",
  description: "",
  total_caps: undefined,
  total_seasons: undefined,
  actual_season: undefined,
  actual_episode: undefined,
  status: "por ver",
};

export interface CompressedMultimediaItem {
  n: string;
  an?: string;
  d?: string;
  tc?: number;
  ts?: number;
  as?: number;
  ae?: number;
  s?: "visto" | "por ver" | "viendo" | "dejado";
}
