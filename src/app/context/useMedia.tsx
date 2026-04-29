import useMediaFilter from "./useMediaFilter";
import { useMediaReducer } from "./useMediaReducer";
import { useMediaStorage } from "./useMediaStorage";

export const useMedia = () => {
  const media = useMediaReducer();
  useMediaStorage({ data: media.data, isDifferent: media.status.different });
  const filter = useMediaFilter(media.data);

  return {
    ...media,
    ...filter,
  };
};
