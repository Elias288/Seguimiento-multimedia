import { Outlet } from "react-router";
import Header from "./header";
import UpdatedFlag from "../components/UpdatedFlag";
import ButtonAdd from "@/components/buttonAdd";
import MessageBottom from "@/components/messageBottom";
import type { ReactNode } from "react";
import { useState } from "react";
import SideBar from "./sideBar";

const Layout = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const toggleSideBar = () => setShowSideBar(!showSideBar);

  return (
    <div
      className={`min-h-screen ${showSideBar ? "grid grid-cols-[350px_auto]" : "flex flex-col "}`}
    >
      <Header sideBarOpen={showSideBar} toggleSideBar={toggleSideBar} />
      <SideBar isOpen={showSideBar} />
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
    <div className="fixed bottom-2.5 left-2.5 w-fit flex flex-col gap-2 col-span-full">
      {children}
    </div>
  );
};

export default Layout;
