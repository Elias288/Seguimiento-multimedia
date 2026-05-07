import MultimediaCard from "@/components/multimediaCard";
import { MultimediaTypes, type MultimediaItem } from "@/types/data.type";
import { useInterfaceContext } from "@/context/interfaceContext";
import { useState } from "react";

interface Props {
  content: MultimediaItem[];
  title: string;
  type: MultimediaTypes;
}
export const RenderMultimediaType = ({ content, title, type }: Props) => {
  const { selectMultimedia } = useInterfaceContext();
  const [showType, setShowType] = useState<boolean>(true);

  if (content.length === 0) return;

  const handleSelected = (data: MultimediaItem, type: MultimediaTypes) => {
    selectMultimedia({ item: data, type });
  };

  return (
    <article>
      <div className="bg-background2 w-full rounded-lg overflow-x-hidden">
        <div className="flex justify-between py-2 px-4">
          <h2 className="text-2xl">{title}</h2>
          <button
            onClick={() => setShowType(!showType)}
            className="cursor-pointer text-2xl hover:opacity-70"
          >
            {showType ? "↧" : "↦"}
          </button>
        </div>

        <div
          className={`w-full pt-2 pb-5 px-5 ${showType ? "flex items-start gap-4 overflow-x-auto snap-x" : "grid grid-cols-[repeat(auto-fit,300px)] justify-center gap-4"}`}
        >
          {content.map((item, key) => {
            const { image, smallImage, largeImage } = item.images ?? {};
            const img = image ? image : smallImage ? smallImage : largeImage;

            return (
              <MultimediaCard key={key} item={item}>
                <div
                  className="bg-gray-500 w-full h-full rounded-sm overflow-hidden cursor-pointer border"
                  onClick={() => handleSelected(item, type)}
                >
                  {img && (
                    <img
                      src={img}
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="bg-transparentBackground backdrop-blur-lg absolute bottom-2.5 left-2.5 right-2.5 rounded-b-sm py-2 px-1">
                  <p className="border-b">{item.name}</p>
                  <p>
                    Temporadas: {item.actual_season ?? 0}/
                    {item.total_seasons ?? 0}
                  </p>
                  <p>
                    Capítulos: {item.actual_episode ?? 0}/{item.total_caps ?? 0}
                  </p>
                </div>
              </MultimediaCard>
            );
          })}
        </div>
      </div>
    </article>
  );
};
export default RenderMultimediaType;
