import { MultimediaTypes } from "@/types/data.type";
import { RenderMultimediaType } from "./RenderMultimediaType";
import { useMediaFilterContext } from "@/context/mediaFilter";

const MainContent = () => {
  const { filteredData: data } = useMediaFilterContext();

  if (!data) return;
  const medias = data.media;
  return (
    <>
      <RenderMultimediaType
        content={medias.anime}
        type={MultimediaTypes.ANIMES}
        title="Anime"
      />
      <RenderMultimediaType
        content={medias.serie}
        type={MultimediaTypes.SERIES}
        title="Serie"
      />
      <RenderMultimediaType
        content={medias.manga}
        type={MultimediaTypes.MAGAS}
        title="Manga"
      />
      <RenderMultimediaType
        content={medias.comic}
        type={MultimediaTypes.COMICS}
        title="Comic"
      />
    </>
  );
};

export default MainContent;
