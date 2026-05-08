import BuscadorMultimedia from "@/layout/sideBar/buscador";
import { NavBar } from "../header";
import Filtros from "./filtros";
import ApiList from "./apiList";

type Props = {
  isOpen: boolean;
  toggleSideBar: () => void;
};
const SideBar = ({ isOpen, toggleSideBar }: Props) => {
  return (
    <aside
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) toggleSideBar();
      }}
      className={`fixed bg-transparentBackground h-full  z-10 overflow-hidden duration-200 ease-out ${isOpen ? "w-screen md:w-auto" : "w-0 md:w-auto"} md:relative md:h-auto md:flex md:bg-transparent`}
    >
      <div
        className={`bg-background2 col-1 overflow-x-hidden z-30 rounded-lg flex flex-col gap-4 h-full min-w-62.5 duration-200 ease-in-out ${isOpen ? "w-[80%] p-5 md:w-full md:mx-3 md:my-5 md:py-3 " : "w-0"} md:h-auto`}
      >
        <div className="md:hidden flex justify-center border-b border-gray-700 pb-4">
          <NavBar />
        </div>

        <BuscadorMultimedia />

        <Filtros />

        <ApiList />
      </div>
    </aside>
  );
};

export default SideBar;
