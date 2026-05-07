import { RenderMultimediaType } from "./RenderMultimediaType";
import { useMediaFilterContext } from "@/context/mediaFilter";

const MainContent = () => {
  const { filteredData: data } = useMediaFilterContext();

  if (!data) return;
  return (
    <>
      <RenderMultimediaType content={data.anime} title="Anime" />
      <RenderMultimediaType content={data.serie} title="Serie" />
      <RenderMultimediaType content={data.manga} title="Manga" />
      <RenderMultimediaType content={data.comic} title="Comic" />
    </>
  );
};

export default MainContent;
