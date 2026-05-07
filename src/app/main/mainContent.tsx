import { RenderMultimediaType } from "./RenderMultimediaType";
import { MultimediaTypes } from "@/types/data.type";
import { useMediaFilterContext } from "@/context/mediaFilter";

const MainContent = () => {
  const { filteredData: data } = useMediaFilterContext();

  if (!data) return;
  return (
    <>
      <RenderMultimediaType
        content={data.anime}
        title="Anime"
        type={MultimediaTypes.ANIMES}
      />
      <RenderMultimediaType
        content={data.serie}
        title="Serie"
        type={MultimediaTypes.SERIES}
      />
      <RenderMultimediaType
        content={data.manga}
        title="Manga"
        type={MultimediaTypes.MAGAS}
      />
      <RenderMultimediaType
        content={data.comic}
        title="Comic"
        type={MultimediaTypes.COMICS}
      />
    </>
  );
};

export default MainContent;
