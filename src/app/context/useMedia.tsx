import { createContext, useContext } from "react";
import { useMediaReducer, type MediaContextType } from "./mediaReducer";

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const media = useMediaReducer();
  return (
    <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMedia debe usarse dentro de MediaProvider");
  return context;
};
