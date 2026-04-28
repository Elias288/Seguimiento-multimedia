import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BottomMessage = ({ children }: Props) => {
  return <div className="sticky bottom-0 rounded-t-sm">{children}</div>;
};

export default BottomMessage;
