import type { ApiOption } from "@/apis/apiFactory";
import type { MultimediaInfo } from "@/types/data.type";
import React, { createContext, useContext, useState } from "react";

type interfaceContextType = {
  selectedMultimedia: MultimediaInfo | undefined;
  selectedApi: ApiOption | undefined;
  selectMultimedia: (multimedia: MultimediaInfo | undefined) => void;
  setSelectedApi: (api: ApiOption | undefined) => void;
};

export const InterfaceContext = createContext<interfaceContextType | undefined>(
  undefined,
);

export const InterfaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMultimedia, setSelectedMultimedia] = useState<
    MultimediaInfo | undefined
  >(undefined);
  const [selectedApi, setSelectedApi] = useState<ApiOption | undefined>(
    undefined,
  );

  return (
    <InterfaceContext.Provider
      value={{
        selectedMultimedia,
        selectedApi,
        selectMultimedia: setSelectedMultimedia,
        setSelectedApi,
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
