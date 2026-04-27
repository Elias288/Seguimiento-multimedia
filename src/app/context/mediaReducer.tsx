import { useEffect, useReducer } from "react";
import { compressMultimedia, decompressMultimedia } from "@/bin/compressData";
import type { Multimedia } from "@/types/data.type";
import { downloadCSV, jsonToCSV } from "@/bin/JSONtoCSV";

export type MediaContextType = {
  data: Multimedia | null;
  loaded: boolean;
  updated: boolean;
  setData: (data: Multimedia | null) => void;
  clearUpdated: () => void;
  clearData: () => void;
  downloadData: () => void;
};

type State = {
  data: Multimedia | null;
  loaded: boolean;
  updated: boolean;
};

type Action =
  | { type: "LOAD_FROM_STORAGE"; payload: Multimedia }
  | { type: "SET_DATA"; payload: Multimedia | null }
  | { type: "SET_UPDATED"; payload: boolean }
  | { type: "CLEAR_DATA" };

const STORAGE_KEY = "multimedia_data_v1";
const UPDATED_FLAG = "multimedia_updated_flag";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { ...state, data: action.payload, loaded: true };
    case "SET_DATA":
      const isUpdated =
        state.data !== null &&
        JSON.stringify(state.data) !== JSON.stringify(action.payload);

      return {
        ...state,
        data: action.payload,
        loaded: true,
        updated: isUpdated,
      };
    case "CLEAR_DATA":
      return { ...state, data: null, loaded: true };
    case "SET_UPDATED":
      return { ...state, updated: action.payload };
    default:
      return state;
  }
};

export const useMediaReducer = (): MediaContextType => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loaded: false,
    updated: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const updatedFlag = localStorage.getItem(UPDATED_FLAG);

    if (stored) {
      try {
        const decompressed = decompressMultimedia(stored);

        dispatch({ type: "LOAD_FROM_STORAGE", payload: decompressed });
      } catch {
        dispatch({ type: "CLEAR_DATA" });
      }
    } else {
      dispatch({ type: "CLEAR_DATA" });
    }

    dispatch({ type: "SET_UPDATED", payload: updatedFlag === "true" });
  }, []);

  useEffect(() => {
    if (state.data === null) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(UPDATED_FLAG);
      return;
    }

    localStorage.setItem(STORAGE_KEY, compressMultimedia(state.data));

    localStorage.setItem(UPDATED_FLAG, String(state.updated));
  }, [state.data, state.updated]);

  const setData = (data: Multimedia | null) =>
    dispatch({ type: "SET_DATA", payload: data });

  const clearData = () => dispatch({ type: "CLEAR_DATA" });

  const clearUpdated = () => {
    dispatch({ type: "SET_UPDATED", payload: false });
  };

  const downloadData = () => {
    if (state.data) {
      const csv = jsonToCSV(state.data);
      downloadCSV(csv);
      clearUpdated();
    }
  };

  return {
    data: state.data,
    loaded: state.loaded,
    updated: state.updated,
    setData,
    clearData,
    clearUpdated,
    downloadData,
  };
};
