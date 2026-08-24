import { useEffect, useReducer } from "react";
import { decompressMultimedia } from "@/bin/compressData.ts";
import type { MultimediaItem, Multimedia } from "@/types/data.type";
import { downloadCSV, jsonToCSV } from "@/bin/JSONtoCSV.ts";

export type MediaContextType = {
  data: Multimedia | undefined;
  status: ReducerStatus;
  setData: (data: Multimedia) => void;
  updateItem: (data: MultimediaItem) => void;
  deleteItem: (data: MultimediaItem) => void;
  addData: (data: MultimediaItem) => void;
  setLoaded: (status: boolean) => void;
  clearData: () => void;
  clearError: () => void;
  clearMessage: () => void;
  downloadData: () => void;
};

type State = {
  data: Multimedia | undefined;
  reducerStatus: ReducerStatus;
};

type ReducerStatus = {
  loaded: boolean;
  updated: boolean;
  different: boolean;
  message: string | undefined;
  isError: boolean;
};

type Action =
  | { type: "LOAD_FROM_STORAGE"; payload: Multimedia }
  | { type: "SET_DATA"; payload: Multimedia | undefined }
  | { type: "UPDATE_ITEM"; payload: MultimediaItem }
  | { type: "DELETE_ITEM"; payload: MultimediaItem }
  | { type: "ADD_DATA"; payload: MultimediaItem }
  | { type: "SET_DIFFERENT"; payload: boolean }
  | { type: "SET_LOADED"; payload: boolean }
  | { type: "CLEAR_DATA" }
  | { type: "CLEAR_MESSAGE" }
  | { type: "CLEAR_ERROR" };

const STORAGE_KEY = "multimedia_data_v1";
const UPDATED_FLAG = "multimedia_updated_flag";
const DEBUG_LOG = false;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      if (DEBUG_LOG) console.log("LOAD_FROM_STORAGE");
      return {
        ...state,
        data: action.payload,
        reducerStatus: { ...state.reducerStatus },
      };

    case "SET_DATA":
      if (DEBUG_LOG) console.log("set_data");
      return {
        ...state,
        data: action.payload,
        reducerStatus: { ...state.reducerStatus },
      };

    case "UPDATE_ITEM":
      if (DEBUG_LOG) console.log("update_data", action, state);
      const updatedItem = action.payload;
      if (!state.data || !updatedItem || !updatedItem.type) return state;

      const newData: Multimedia = {
        ...state.data,
        media: {
          ...state.data.media,
          [updatedItem.type]: state.data.media[updatedItem.type].map(
            (i: MultimediaItem) =>
              i.name === updatedItem.name ? updatedItem : i,
          ),
        },
      };

      return {
        ...state,
        data: newData,
        reducerStatus: {
          ...state.reducerStatus,
          loaded: true,
          different: true,
          isError: false,
          message: "Multimedia actualizada",
        },
      };

    case "DELETE_ITEM":
      if (DEBUG_LOG) console.log("DELETE_ITEM");
      const item = action.payload;
      if (!state.data || !item.type) return state;

      const newData2: Multimedia = {
        ...state.data,
        media: {
          ...state.data.media,
          [item.type]: state.data.media[item.type].filter(
            (i: MultimediaItem) => i.name !== item.name,
          ),
        },
      };

      return {
        ...state,
        data: newData2,
        reducerStatus: {
          ...state.reducerStatus,
          loaded: true,
          different: true,
          isError: false,
          message: "Multimedia eliminada",
        },
      };

    case "ADD_DATA":
      if (DEBUG_LOG) console.log("add_data");
      const data = action.payload;
      if (!state.data || !data.type) return state;

      const exists = state.data.media[data.type].some(
        (el) => el.name.toLowerCase() === data?.name.toLowerCase(),
      );

      if (exists) {
        console.warn("Item duplicado:", data?.name);
        return {
          ...state,
          reducerStatus: {
            ...state.reducerStatus,
            isError: true,
            message: "Item duplicado",
          },
        };
      }

      const newData3: Multimedia = {
        ...state.data,
        media: {
          ...state.data.media,
          [data.type]: [...state.data.media[data.type], data],
        },
      };

      return {
        ...state,
        data: newData3,
        reducerStatus: {
          loaded: true,
          updated: false,
          different: true,
          message: "Multimedia agregada",
          isError: false,
        },
      };

    case "CLEAR_DATA":
      if (DEBUG_LOG) console.log("clear_data");
      return {
        data: undefined,
        reducerStatus: {
          loaded: true,
          message: undefined,
          updated: false,
          different: false,
          isError: false,
        },
      };

    case "SET_DIFFERENT":
      if (DEBUG_LOG) console.log("set_update");
      return {
        ...state,
        reducerStatus: { ...state.reducerStatus, different: action.payload },
      };

    case "SET_LOADED":
      if (DEBUG_LOG) console.log("SET_LOADED");
      return {
        ...state,
        reducerStatus: {
          ...state.reducerStatus,
          loaded: action.payload,
        },
      };

    case "CLEAR_ERROR":
      if (DEBUG_LOG) console.log("clear_error");
      return {
        ...state,
        reducerStatus: {
          ...state.reducerStatus,
          loaded: true,
          message: undefined,
          isError: false,
        },
      };

    case "CLEAR_MESSAGE":
      if (DEBUG_LOG) console.log("CLEAR_MESSAGE");
      return {
        ...state,
        reducerStatus: { ...state.reducerStatus, message: undefined },
      };

    default:
      return state;
  }
};

export const useMediaReducer = (): MediaContextType => {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    reducerStatus: {
      loaded: false,
      updated: false,
      message: undefined,
      different: false,
      isError: false,
    },
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
    }

    dispatch({ type: "SET_DIFFERENT", payload: updatedFlag === "true" });
  }, []);

  const setData = (data: Multimedia) =>
    dispatch({ type: "SET_DATA", payload: data });

  const setLoaded = (status: boolean) =>
    dispatch({ type: "SET_LOADED", payload: status });

  const updateItem = (data: MultimediaItem) =>
    dispatch({ type: "UPDATE_ITEM", payload: data });

  const deleteItem = (data: MultimediaItem) =>
    dispatch({ type: "DELETE_ITEM", payload: data });

  const clearData = () => dispatch({ type: "CLEAR_DATA" });

  const addData = (data: MultimediaItem) =>
    dispatch({ type: "ADD_DATA", payload: data });

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  const downloadData = () => {
    if (state.data) {
      const csv = jsonToCSV(state.data);
      downloadCSV(csv);
      dispatch({ type: "SET_DIFFERENT", payload: false });
    }
  };

  const clearMessage = () => dispatch({ type: "CLEAR_MESSAGE" });

  return {
    data: state.data,
    status: state.reducerStatus,
    setData,
    updateItem,
    deleteItem,
    addData,
    setLoaded,
    clearData,
    clearError,
    clearMessage,
    downloadData,
  };
};
