import { useMediaContext } from "@/context/mediaContext";
import type {
  Multimedia,
  MultimediaInfo,
  MultimediaTypes,
} from "@/types/data.type";
import { useMemo, useState } from "react";

export type MediaSearchType = {
  query: string | null;
  filteredData: MultimediaInfo[];
  setQuery: (str: string) => void;
};
const useMediaSearch = (): MediaSearchType => {
  const { data } = useMediaContext();
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
    filteredData,
    setQuery,
  };
};

export default useMediaSearch;
