import type { ApiOption } from "@/apis/api.types";
import type { MultimediaItem } from "@/types/data.type";
import React, { createContext, useContext, useState } from "react";

type interfaceContextType = {
  selectedMultimedia: MultimediaItem | undefined;
  selectedApi: ApiOption | undefined;
  openAddMultimedia: boolean;
  openUpdateMultimedia: boolean;
  selectMultimedia: (multimedia: MultimediaItem | undefined) => void;
  setSelectedApi: (api: ApiOption | undefined) => void;
  toggleOpenAddMultimedia: () => void;
  toggleOpenUpdateMultimedia: () => void;
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
  const [openUpdateMultimedia, setOpenUpdateMultimedia] =
    useState<boolean>(false);

  const toggleOpenAddMultimedia = () => {
    setOpenAddMultimedia(!openAddMultimedia);
  };
  const toggleOpenUpdateMultimedia = () => {
    setOpenUpdateMultimedia(!openUpdateMultimedia);
  };

  return (
    <InterfaceContext.Provider
      value={{
        selectedMultimedia,
        selectedApi,
        openAddMultimedia,
        openUpdateMultimedia,
        selectMultimedia: setSelectedMultimedia,
        setSelectedApi,
        toggleOpenAddMultimedia,
        toggleOpenUpdateMultimedia,
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
