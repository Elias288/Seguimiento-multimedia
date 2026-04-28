import { Outlet } from "react-router";
import Header from "./header";
import UpdatedFlag from "../components/UpdatedFlag";
import ButtonAdd from "@/components/buttonAdd";
import MessageBottom from "@/components/messageBottom";
import type { ReactNode } from "react";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />

      <ButtonAdd />
      <FloatedCards>
        <MessageBottom />
        <UpdatedFlag />
      </FloatedCards>
    </div>
  );
};

const FloatedCards = ({ children }: { children: ReactNode }) => {
  return (
    <div className="sticky bottom-2.5 left-2.5 w-fit flex flex-col gap-2">
      {children}
    </div>
  );
};

// export default FloatedCards;

export default Layout;
