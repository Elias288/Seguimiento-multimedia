import { type MultimediaItem, Status } from "@/types/data.type";
import type { ReactNode } from "react";

const borderColor: Record<Status, string> = {
  [Status.VIENDO]: "outline-viendo",
  [Status.DEJADO]: "outline-dejado",
  [Status.POR_VER]: "outline-porVer",
  [Status.VISTO]: "outline-visto",
};

type Props = {
  item?: MultimediaItem;
  children?: ReactNode;
  onClick?: () => void;
};

const MultimediaCard = ({ item, children, onClick }: Props) => {
  if (!item)
    return (
      <article className="bg-card rounded-[20px] p-2.5 animate-pulse flex-[0_0_auto]">
        <div className="w-full aspect-2/3 "></div>
        <div className="h-33.75"></div>
      </article>
    );

  return (
    <article
      onClick={onClick}
      className={`rounded-[20px] overflow-hidden bg-background2 cursor-pointer isolate group hover:-translate-y-1.25 duration-[0.25s] ease-initial transform outline-4 ${borderColor[item.status]}`}
    >
      {children}
    </article>
  );
};

export default MultimediaCard;
