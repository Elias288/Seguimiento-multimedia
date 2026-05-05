import { compressMultimedia, decompressMultimedia } from "@/bin/compressData";
import type { Multimedia } from "@/types/data.type";
import { useEffect } from "react";

const STORAGE_KEY = "multimedia_data_v1";
const UPDATED_FLAG = "multimedia_updated_flag";

export const useMediaStorage = (storage: {
  data: Multimedia | null;
  isDifferent: boolean;
}) => {
  useEffect(() => {
    if (!storage.data) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(UPDATED_FLAG);
      return;
    }

    localStorage.setItem(STORAGE_KEY, compressMultimedia(storage.data));
    localStorage.setItem(UPDATED_FLAG, String(storage.isDifferent));
  }, [storage]);
};
