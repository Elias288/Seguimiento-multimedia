import { MultimediaTypes } from "@/types/data.type";
import { RenderMultimediaType } from "./RenderMultimediaType";
import { useMediaFilterContext } from "@/context/mediaFilter";

const MainContent = () => {
  const { filteredData: data } = useMediaFilterContext();

  if (!data) return;
  return (
    <>
      <RenderMultimediaType
        content={data.anime}
        type={MultimediaTypes.ANIMES}
        title="Anime"
      />
      <RenderMultimediaType
        content={data.serie}
        type={MultimediaTypes.SERIES}
        title="Serie"
      />
      <RenderMultimediaType
        content={data.manga}
        type={MultimediaTypes.MAGAS}
        title="Manga"
      />
      <RenderMultimediaType
        content={data.comic}
        type={MultimediaTypes.COMICS}
        title="Comic"
      />
    </>
  );
};

export default MainContent;
