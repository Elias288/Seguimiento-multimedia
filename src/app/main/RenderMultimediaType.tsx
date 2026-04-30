import MultimediaCard from "@/components/multimediaCard";
import type { MultimediaItem } from "@/types/data.type";
import { useState } from "react";

interface Props {
  content: MultimediaItem[];
  title: string;
  selectItem: (item: MultimediaItem) => void;
}
export const RenderMultimediaType = ({ content, title, selectItem }: Props) => {
  const [showType, setShowType] = useState<boolean>(true);

  if (content.length === 0) return;
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
          className={`w-full pt-2 pb-5 px-5 ${showType ? "flex gap-4 overflow-x-auto" : "grid grid-cols-[repeat(auto-fit,300px)] justify-center gap-4"}`}
        >
          {content.map((item, key) => {
            return (
              <MultimediaCard key={key} item={item}>
                <div className="cursor-pointer">
                  <div className="bg-gray-500 aspect-square">
                    <img
                      src="/"
                      alt="img"
                      onClick={() => selectItem(item)}
                      className="w-full h-full"
                    />
                  </div>

                  <p className="text-black">{item.name}</p>
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
