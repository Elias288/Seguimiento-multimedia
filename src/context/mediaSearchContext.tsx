import { createContext, useContext } from "react";
import useMediaSearch, { type MediaSearchType } from "@/hooks/useMediaSearch";

const MediaSearchContext = createContext<MediaSearchType | undefined>(
  undefined,
);

export const MediaSearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const media = useMediaSearch();
  return (
    <MediaSearchContext.Provider value={media}>
      {children}
    </MediaSearchContext.Provider>
  );
};

export const useMediaSearchContext = () => {
  const context = useContext(MediaSearchContext);
  if (!context)
    throw new Error(
      "useMediaSearchContext debe usarse dentro de MediaSearchProvider",
    );
  return context;
};
