import type { MediaFilterType } from "@/hooks/useMediaFilter";
import useMediaFilter from "@/hooks/useMediaFilter";
import { createContext, useContext } from "react";

const MediaFilterContext = createContext<MediaFilterType | undefined>(
  undefined,
);

export const MediaFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const filter = useMediaFilter();
  return (
    <MediaFilterContext.Provider value={filter}>
      {children}
    </MediaFilterContext.Provider>
  );
};

export const useMediaFilterContext = () => {
  const context = useContext(MediaFilterContext);
  if (!context)
    throw new Error(
      "useMediaFilterContext debe usarse dentro de MediaFilterProvider",
    );
  return context;
};
