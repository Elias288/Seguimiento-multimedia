import { apiMap, type ApiOption, type MediaApi } from "./api.types";

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
