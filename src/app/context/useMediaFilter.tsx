import type {
  Multimedia,
  MultimediaInfo,
  MultimediaTypes,
} from "@/types/data.type";
import { useMemo, useState } from "react";

export type MediaFilterType = {
  query: string | null;
  setQuery: (str: string) => void;
  filteredData: MultimediaInfo[];
};
const useMediaFilter = (data: Multimedia | null): MediaFilterType => {
  const [query, setQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data || query.length < 3) return [];

    const normalize = (str: string) => str.toLowerCase().trim();
    const q = normalize(query);

    return Object.entries(data)
      .flatMap(([type, items]) => items.map((item) => ({ ...item, type })))
      .filter(
        (item) =>
          normalize(item.name).includes(q) ||
          normalize(item.alternative_name).includes(q),
      )
      .map(({ type, ...item }) => ({
        type: type as MultimediaTypes,
        item,
      }));
  }, [data, query]);

  return {
    query,
    setQuery,
    filteredData,
  };
};

export default useMediaFilter;
