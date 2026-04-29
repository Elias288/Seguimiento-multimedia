import { createContext, useContext } from "react";
import { type MediaContextType } from "./useMediaReducer";
import { type MediaFilterType } from "./useMediaFilter";
import { useMedia } from "./useMedia";

const MediaContext = createContext<
  (MediaContextType & MediaFilterType) | undefined
>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const media = useMedia();
  return (
    <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMedia debe usarse dentro de MediaProvider");
  return context;
};
