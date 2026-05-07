import type { ApiOption } from "@/apis/apiFactory";
import type { MultimediaItem } from "@/types/data.type";
import React, { createContext, useContext, useState } from "react";

type interfaceContextType = {
  selectedMultimedia: MultimediaItem | undefined;
  selectedApi: ApiOption | undefined;
  openAddMultimedia: boolean;
  selectMultimedia: (multimedia: MultimediaItem | undefined) => void;
  setSelectedApi: (api: ApiOption | undefined) => void;
  toggleOpenAddMultimedia: () => void;
};

export const InterfaceContext = createContext<interfaceContextType | undefined>(
  undefined,
);

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMultimedia, setSelectedMultimedia] = useState<
    MultimediaItem | undefined
  >(undefined);
  const [selectedApi, setSelectedApi] = useState<ApiOption | undefined>(
    undefined,
  );
  const [openAddMultimedia, setOpenAddMultimedia] = useState<boolean>(false);

  const toggleOpenAddMultimedia = () =>
    setOpenAddMultimedia(!openAddMultimedia);

  return (
    <InterfaceContext.Provider
      value={{
        selectedMultimedia,
        selectedApi,
        openAddMultimedia,
        selectMultimedia: setSelectedMultimedia,
        setSelectedApi,
        toggleOpenAddMultimedia,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export const useInterfaceContext = () => {
  const context = useContext(InterfaceContext);
  if (!context)
    throw new Error(
      "useInterfaceContext debe usarse dentro de InterfaceContextProvider",
    );
  return context;
};
