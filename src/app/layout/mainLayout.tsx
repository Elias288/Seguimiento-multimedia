import { Outlet } from "react-router";
import Header from "./header";
import UpdatedFlag from "../components/UpdatedFlag";
import ButtonAdd from "@/components/buttonAdd";
import MessageBottom from "@/components/messageBottom";
import type { ReactNode } from "react";
import { useState } from "react";
import SideBar from "./sideBar/sideBar";
import { useInterfaceContext } from "@/context/interfaceContext";
import ShowMultimedia from "@/components/showMultimedia.form";
import SearchInAPI from "@/components/searchInAPI";
import AddMultimedia from "@/components/addMultimedia/addMultimedia.form";
import Footer from "./footer";

const MainLayout = () => {
  const {
    selectedApi,
    openUpdateMultimedia,
    openAddMultimedia,
    setSelectedApi,
  } = useInterfaceContext();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const toggleSideBar = () => setShowSideBar(!showSideBar);

  return (
    <div className="min-h-screen min-w-screenMinWidth">
      <div
        className={`min-h-screen flex flex-col md:grid duration-100 ease-in-out grid-rows-[auto_1fr] ${showSideBar ? "md:grid-cols-[350px_auto]" : "md:grid-cols-[0_auto] "}`}
      >
        <Header sideBarOpen={showSideBar} toggleSideBar={toggleSideBar} />
        <SideBar isOpen={showSideBar} toggleSideBar={toggleSideBar} />

        <Outlet />
      </div>

      <Footer />
      <ButtonAdd />

      {openUpdateMultimedia && <ShowMultimedia />}

      {selectedApi && (
        <SearchInAPI
          apiLabel={selectedApi}
          close={() => setSelectedApi(undefined)}
        />
      )}

      {openAddMultimedia && <AddMultimedia />}

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
