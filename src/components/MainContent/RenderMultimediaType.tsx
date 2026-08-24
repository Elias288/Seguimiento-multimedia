import MultimediaCard from "@/components/MultimediaCard";
import { MultimediaTypes, type MultimediaItem } from "@/types/data.type";
import { useInterfaceContext } from "@/context/interfaceContext";
import { useState } from "react";

interface Props {
  content: MultimediaItem[];
  title: string;
  type: MultimediaTypes;
}
export const RenderMultimediaType = ({ content, title, type }: Props) => {
  const { selectMultimedia, toggleOpenUpdateMultimedia } =
    useInterfaceContext();
  const [showType, setShowType] = useState<boolean>(true);

  if (content.length === 0) return;

  const handleSelected = (data: MultimediaItem) => {
    selectMultimedia({ ...data, type });
    toggleOpenUpdateMultimedia();
  };

  const toggleShowType = () => setShowType(!showType);

  return (
    <section className={`${showType ? "mb-16 md:mb-4" : ""}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <button
          onClick={toggleShowType}
          className="cursor-pointer text-2xl hover:opacity-70"
        >
          {showType ? "▼" : "▲"}
        </button>
      </div>

      <div
        className={`grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(5,minmax(130px,1fr))] overflow-x-hidden ${showType ? "px-1 py-3" : "h-0 p-0"}`}
      >
        {content
          .sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""))
          .map((item, key) => {
            const { image, smallImage, largeImage } = item.images ?? {};
            const img = image ? image : smallImage ? smallImage : largeImage;

            return (
              <MultimediaCard
                key={key}
                item={item}
                onClick={() => handleSelected(item)}
              >
                {img ? (
                  <img
                    src={img}
                    alt="img"
                    className="inset-0 w-full object-cover duration-[0.45s] aspect-2/3 ease-initial transform group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-transparentBackground aspect-2/3"></div>
                )}

                <div className="w-full p-4 z-10">
                  <h3 className="text-[1rem] font-bold mb-[.45rem] display line-clamp-2 leading-5 min-h-[2.6rem]">
                    {item.name}
                  </h3>
                  <p className="mb-2 flex">
                    <span className="flex-1">Temp:</span>
                    <span className="bg-background1 px-2.5 py-0.5 rounded-tl-[50px] rounded-bl-[50px] border-r border-card">
                      {item.actual_season ?? 0}
                    </span>
                    <span className="bg-background1 px-2.5 py-0.5 rounded-tr-[50px] rounded-br-[50px]">
                      {item.total_seasons ?? 0}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="flex-1">Cap:</span>
                    <span className="bg-background1 px-2.5 py-0.5 rounded-tl-[50px] rounded-bl-[50px] border-r border-card">
                      {item.actual_episode ?? 0}
                    </span>
                    <span className="bg-background1 px-2.5 py-0.5 rounded-tr-[50px] rounded-br-[50px]">
                      {item.total_caps ?? 0}
                    </span>
                  </p>
                </div>
              </MultimediaCard>
            );
          })}
      </div>
    </section>
  );
};
export default RenderMultimediaType;
