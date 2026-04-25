import { useEffect, useReducer } from "react";
import { compressMultimedia, decompressMultimedia } from "@/bin/compressData";
import type { Multimedia } from "@/types/data.type";

export type MediaContextType = {
  data: Multimedia | null;
  loaded: boolean;
  setData: (data: Multimedia | null) => void;
  clearData: () => void;
};

type State = {
  data: Multimedia | null;
  loaded: boolean;
};

type Action =
  | { type: "LOAD_FROM_STORAGE"; payload: Multimedia }
  | { type: "SET_DATA"; payload: Multimedia | null }
  | { type: "CLEAR_DATA" };

const STORAGE_KEY = "multimedia_data_v1";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { data: action.payload, loaded: true };
    case "SET_DATA":
      return { data: action.payload, loaded: true };
    case "CLEAR_DATA":
      return { data: null, loaded: true };
    default:
      return state;
  }
};

export const useMediaReducer = (): MediaContextType => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loaded: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

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
  }, []);

  useEffect(() => {
    if (!state.loaded) return;

    if (state.data) {
      localStorage.setItem(STORAGE_KEY, compressMultimedia(state.data));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.data, state.loaded]);

  const setData = (data: Multimedia | null) =>
    dispatch({ type: "SET_DATA", payload: data });

  const clearData = () => dispatch({ type: "CLEAR_DATA" });

  return {
    data: state.data,
    loaded: state.loaded,
    setData,
    clearData,
  };
};
