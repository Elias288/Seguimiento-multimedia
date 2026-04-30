import type { MultimediaItem } from "@/types/data.type";
import type { ReactNode } from "react";

type Props = {
  item?: MultimediaItem;
  children?: ReactNode;
};

const MultimediaCard = ({ item, children }: Props) => {
  if (!item)
    return (
      <div className="bg-card rounded-lg p-2.5 h-100 min-w-75 animate-pulse"></div>
    );

  return (
    <div className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75">
      {children}
    </div>
  );
};

export default MultimediaCard;
