import { useMediaContext } from "@/context/mediaContext";
import type { Multimedia } from "@/types/data.type";
import { useMemo, useState } from "react";

export type MediaFilterType = {
  query: string | null;
  setQuery: (str: string) => void;
  filteredData: Multimedia | null;
};
const useMediaFilter = (): MediaFilterType => {
  const { data } = useMediaContext();
  const [query, setQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data || query.length < 3) return data;

    const normalize = (str: string) => str.toLowerCase().trim();
    const normalizedQuery = normalize(query);

    return Object.fromEntries(
      Object.entries(data).map(([type, items]) => [
        type,
        items.filter((item) => normalize(item.status) === normalizedQuery),
      ]),
    ) as Multimedia;
  }, [data, query, setQuery]);

  return {
    query,
    setQuery,
    filteredData,
  };
};

export default useMediaFilter;
