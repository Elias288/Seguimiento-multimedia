import { RenderMultimediaType } from "./RenderMultimediaType";
import { useState } from "react";
import {
  type MultimediaInfo,
  type MultimediaItem,
  MultimediaTypes,
} from "@/types/data.type";
import ShowMultimedia from "../components/showMultimedia.form";
import { useMediaFilterContext } from "@/context/mediaFilter";

const MainContent = () => {
  const { filteredData: data } = useMediaFilterContext();

  const [selectedItem, setSelectedItem] = useState<MultimediaInfo | null>(null);

  const handleSelected = (data: MultimediaItem, type: MultimediaTypes) => {
    setSelectedItem({ item: data, type });
  };

  const handleAction = () => setSelectedItem(null);

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
          callback={handleAction}
        />
      )}
    </>
  );
};

export default MainContent;
