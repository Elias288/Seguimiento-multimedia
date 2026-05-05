import { RenderMultimediaType } from "./RenderMultimediaType";
import { type MultimediaItem, MultimediaTypes } from "@/types/data.type";
import ShowMultimedia from "../components/showMultimedia.form";
import { useMediaFilterContext } from "@/context/mediaFilter";
import { useMediaSearchContext } from "@/context/mediaSearchContext";

const MainContent = () => {
  const { selectedItem, selectMultimedia } = useMediaSearchContext();
  const { filteredData: data } = useMediaFilterContext();

  const handleSelected = (data: MultimediaItem, type: MultimediaTypes) => {
    selectMultimedia({ item: data, type });
  };

  const handleClose = () => selectMultimedia(undefined);

  if (!data) return;
  return (
    <>
      <RenderMultimediaType
        content={data.anime}
        title="Anime"
        selectItem={(item) => handleSelected(item, MultimediaTypes.ANIMES)}
      />
      <RenderMultimediaType
        content={data.serie}
        title="Serie"
        selectItem={(item) => handleSelected(item, MultimediaTypes.SERIES)}
      />
      <RenderMultimediaType
        content={data.manga}
        title="Manga"
        selectItem={(item) => handleSelected(item, MultimediaTypes.MAGAS)}
      />
      <RenderMultimediaType
        content={data.comic}
        title="Comic"
        selectItem={(item) => handleSelected(item, MultimediaTypes.COMICS)}
      />

      {selectedItem && (
        <ShowMultimedia
          item={selectedItem.item}
          type={selectedItem.type}
          close={handleClose}
        />
      )}
    </>
  );
};

export default MainContent;
