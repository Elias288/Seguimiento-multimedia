import { useMedia } from "@/context/useMedia";
import { RenderMultimediaType } from "./RenderMultimediaType";
import { useState } from "react";
import { type MultimediaItem, MultimediaTypes } from "@/types/data.type";
import ShowMultimedia from "./showMultimedia";

interface Info {
  type: MultimediaTypes;
  data: MultimediaItem;
}
const MainContent = () => {
  const { data } = useMedia();
  const [selectedItem, setSelectedItem] = useState<Info | null>(null);

  const handleSelected = (data: MultimediaItem, type: MultimediaTypes) => {
    setSelectedItem({ data, type });
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
          item={selectedItem.data}
          type={selectedItem.type}
          action={handleAction}
        />
      )}
    </>
  );
};

export default MainContent;
