import { useMedia } from "@/context/useMedia";
import { RenderMultimediaType } from "./RenderMultimediaType";

const MainContent = () => {
  const { data } = useMedia();

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
