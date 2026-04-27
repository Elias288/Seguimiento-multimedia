import type { MultimediaItem } from "@/types/data.type";
import { useState } from "react";

interface Props {
  content: MultimediaItem[];
  title: string;
}
export const RenderMultimediaType = ({ content, title }: Props) => {
  const [showType, setShowType] = useState<boolean>(true);

  if (content.length === 0) return;
  return (
    <article className="mb-10">
      <div className="bg-[#ffffff1c] w-full rounded-lg overflow-x-hidden">
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
              <div
                key={key}
                className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75"
              >
                <p className="text-black">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};
export default RenderMultimediaType;
