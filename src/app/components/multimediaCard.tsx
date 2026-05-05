import { type MultimediaItem, Status } from "@/types/data.type";
import type { ReactNode } from "react";

const borderColor: Record<Status, string> = {
  [Status.VIENDO]: "viendo",
  [Status.DEJADO]: "dejado",
  [Status.POR_VER]: "porVer",
  [Status.VISTO]: "visto",
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
      className={`bg-card rounded-lg p-2.5 h-cardH w-cardW flex-[0_0_auto] overflow-hidden relative snap-center outline-4 outline-${borderColor[item.status]}`}
    >
      {children}
    </div>
  );
};

export default MultimediaCard;
