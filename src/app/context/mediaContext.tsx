import { createContext, useContext } from "react";
import {
  useMediaReducer,
  type MediaContextType,
} from "../hooks/useMediaReducer";
import { useMediaStorage } from "../hooks/useMediaStorage";

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const media = useMediaReducer();
  useMediaStorage({ data: media.data, isDifferent: media.status.different });

  return (
    <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context)
    throw new Error("useMediaContext debe usarse dentro de MediaProvider");
  return context;
};
