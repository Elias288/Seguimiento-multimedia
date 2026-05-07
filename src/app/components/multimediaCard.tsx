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
};

const MultimediaCard = ({ item, children }: Props) => {
  if (!item)
    return (
      <div className="bg-card rounded-lg p-2.5 animate-pulse h-cardH w-cardW flex-[0_0_auto]"></div>
    );

  return (
    <div
      className={`bg-card rounded-lg p-2.5 h-cardH w-cardW flex-[0_0_auto] overflow-hidden relative snap-center outline-4 ${borderColor[item.status]}`}
    >
      {children}
    </div>
  );
};

export default MultimediaCard;
