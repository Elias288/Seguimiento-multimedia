import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import ButtonAdd from "@/components/ButtonAdd";
import { useInterfaceContext } from "@/context/interfaceContext";
import SideBar from "@/components/SideBar/SideBar";
import ShowMultimedia from "@/components/ShowMultimedia";
import SearchInAPI from "@/components/SearchInApi";
import AddMultimedia from "@/components/AddMultimedia/AddMultimedia";
import MessageBottom from "@/components/MessageBottom";
import UpdatedFlag from "@/components/UpdatedFlag";

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
        className={`min-h-screen flex flex-col lg:grid duration-100 ease-in-out grid-rows-[auto_1fr] lg:grid-cols-[350px_auto]`}
      >
        <Header sideBarOpen={showSideBar} setShowSideBar={setShowSideBar} />
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

const FloatedCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-2.5 left-2.5 w-fit flex flex-col gap-2 col-span-full z-30">
      {children}
    </div>
  );
};

export default MainLayout;
