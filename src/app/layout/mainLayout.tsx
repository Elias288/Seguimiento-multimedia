import { Outlet } from "react-router";
import Header from "./header";
import UpdatedFlag from "../components/UpdatedFlag";
import ButtonAdd from "@/components/buttonAdd";
import MessageBottom from "@/components/messageBottom";
import type { ReactNode } from "react";
import { useState } from "react";
import SideBar from "./sideBar";

const MainLayout = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const toggleSideBar = () => setShowSideBar(!showSideBar);

  return (
    <div
      className={`min-h-screen min-w-screenMinWidth md:grid duration-100 ease-in-out ${showSideBar ? "md:grid-cols-[350px_auto]" : "md:grid-cols-[0_auto]"}`}
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
    <div className="fixed bottom-2.5 left-2.5 w-fit flex flex-col gap-2 col-span-full z-30">
      {children}
    </div>
  );
};

export default MainLayout;
