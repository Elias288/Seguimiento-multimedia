import { createContext, useContext } from "react";
import type { MediaFilterType } from "./useMediaFilter";
import useMediaFilter from "./useMediaFilter";
import { useMediaContext } from "./mediaContext";

const MediaFilterContext = createContext<MediaFilterType | undefined>(
  undefined,
);

export const MediaFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useMediaContext();
  const media = useMediaFilter(data);
  return (
    <MediaFilterContext.Provider value={media}>
      {children}
    </MediaFilterContext.Provider>
  );
};

export const useMediaFilterContext = () => {
  const context = useContext(MediaFilterContext);
  if (!context)
    throw new Error(
      "useMediaFilterContext debe usarse dentro de MediaProvider",
    );
  return context;
};
