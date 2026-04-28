import { useEffect, useReducer } from "react";
import { compressMultimedia, decompressMultimedia } from "@/bin/compressData";
import type {
  Multimedia,
  MultimediaItem,
  MultimediaTypes,
} from "@/types/data.type";
import { downloadCSV, jsonToCSV } from "@/bin/JSONtoCSV";

export type MediaContextType = {
  data: Multimedia | null;
  status: ReducerStatus;
  setData: (data: Multimedia | null) => void;
  updateItem: (data: Item) => void;
  deleteItem: (data: Item) => void;
  addData: (data: Item) => void;
  clearData: () => void;
  clearError: () => void;
  clearMessage: () => void;
  downloadData: () => void;
};

type State = {
  data: Multimedia | null;
  reducerStatus: ReducerStatus;
};

type ReducerStatus = {
  loaded: boolean;
  updated: boolean;
  different: boolean;
  message: string | null;
  isError: boolean;
};

type Item = { item: MultimediaItem; type: MultimediaTypes };

type Action =
  | { type: "LOAD_FROM_STORAGE"; payload: Multimedia }
  | { type: "SET_DATA"; payload: Multimedia | null }
  | { type: "UPDATE_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload: Item }
  | { type: "ADD_DATA"; payload: Item }
  | { type: "SET_UPDATED"; payload: boolean }
  | { type: "CLEAR_DATA" }
  | { type: "CLEAR_MESSAGE" }
  | { type: "CLEAR_ERROR" };

const STORAGE_KEY = "multimedia_data_v1";
const UPDATED_FLAG = "multimedia_updated_flag";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return {
        ...state,
        data: action.payload,
        reducerStatus: { ...state.reducerStatus, loaded: true },
      };

    case "SET_DATA":
      // console.log("set_data");

      return {
        ...state,
        data: action.payload,
        reducerStatus: { ...state.reducerStatus, loaded: true },
      };

    case "UPDATE_ITEM":
      // console.log("update_data");
      if (state.data) {
        const { item, type } = action.payload;
        const newData: Multimedia = {
          ...state.data,
          [type]: state.data[type].map((i: MultimediaItem) =>
            i.name === item.name ? item : i,
          ),
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
      }
      return state;

    case "DELETE_ITEM":
      if (state.data) {
        const { item, type } = action.payload;
        const newData: Multimedia = {
          ...state.data,
          [type]: state.data[type].filter(
            (i: MultimediaItem) => i.name !== item.name,
          ),
        };

        return {
          ...state,
          data: newData,
          reducerStatus: {
            ...state.reducerStatus,
            loaded: true,
            different: true,
            isError: false,
            message: "Multimedia eliminada",
          },
        };
      }
      return state;

    case "ADD_DATA":
      // console.log("add_data");
      if (state.data) {
        const isDifferent =
          state.data !== null &&
          JSON.stringify(state.data) !== JSON.stringify(action.payload.item);
        const exists = state.data[action.payload.type].some(
          (el) =>
            el.name.toLowerCase() === action.payload.item?.name.toLowerCase(),
        );

        if (exists) {
          console.warn("Item duplicado:", action.payload.item?.name);
          return {
            ...state,
            reducerStatus: {
              ...state.reducerStatus,
              isError: true,
              message: "Item duplicado",
            },
          };
        }

        const newData = JSON.parse(JSON.stringify(state.data));
        newData[action.payload.type].push(action.payload.item);

        return {
          ...state,
          data: newData,
          reducerStatus: {
            loaded: true,
            updated: false,
            different: isDifferent,
            message: "Multimedia agregada",
            isError: false,
          },
        };
      }
      return state;

    case "CLEAR_DATA":
      // console.log("clear_data");
      return {
        data: null,
        reducerStatus: {
          loaded: true,
          message: null,
          updated: false,
          different: false,
          isError: false,
        },
      };

    case "SET_UPDATED":
      // console.log("set_update");
      return {
        ...state,
        reducerStatus: { ...state.reducerStatus, different: action.payload },
      };

    case "CLEAR_ERROR":
      // console.log("clear_error");
      return {
        ...state,
        reducerStatus: { ...state.reducerStatus, loaded: true, message: null },
      };

    case "CLEAR_MESSAGE":
      return {
        ...state,
        reducerStatus: { ...state.reducerStatus, message: null },
      };

    default:
      return state;
  }
};

export const useMediaReducer = (): MediaContextType => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    reducerStatus: {
      loaded: false,
      updated: false,
      message: null,
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
    localStorage.setItem(UPDATED_FLAG, String(state.reducerStatus.different));
  }, [state.data, state.reducerStatus]);

  const setData = (data: Multimedia | null) =>
    dispatch({ type: "SET_DATA", payload: data });

  const updateItem = (data: Item) =>
    dispatch({ type: "UPDATE_ITEM", payload: data });

  const deleteItem = (data: Item) =>
    dispatch({ type: "DELETE_ITEM", payload: data });

  const clearData = () => dispatch({ type: "CLEAR_DATA" });

  const addData = (data: Item) => dispatch({ type: "ADD_DATA", payload: data });

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  const downloadData = () => {
    if (state.data) {
      const csv = jsonToCSV(state.data);
      downloadCSV(csv);
      dispatch({ type: "SET_UPDATED", payload: false });
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
    clearData,
    clearError,
    clearMessage,
    downloadData,
  };
};
