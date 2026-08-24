import { type ApiOption, type MediaApi } from "@/types/api.type";
import { apiMap } from "./apiMap";

export const getApi = (type: ApiOption): MediaApi => {
  const { factory } = apiMap[type];

  if (!factory) throw new Error("Api no encontrada");

  return factory();
};

export const getAvailableApis = () => {
  return Object.entries(apiMap).map(([key, values]) => ({
    key: key as ApiOption,
    label: values.label,
  }));
};
