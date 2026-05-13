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
      className={`fixed bg-transparentBackground top-header h-mainH z-10 overflow-hidden duration-200 ease-out ${isOpen ? "w-screen lg:w-auto" : "w-0 lg:w-auto"} lg:relative lg:top-auto lg:h-auto lg:flex lg:bg-transparent`}
    >
      <div
        className={`bg-background2 col-1 overflow-x-hidden z-30 rounded-lg flex flex-col gap-4 h-full min-w-62.5 duration-200 ease-in-out ${isOpen ? "w-[80%] p-5 lg:w-full lg:mx-3 lg:my-5 lg:py-3 " : "w-0"} lg:h-auto`}
      >
        <div className="lg:hidden flex justify-center border-b border-gray-700 pb-4">
          <NavBar action={toggleSideBar} />
        </div>

        <BuscadorMultimedia />

        <Filtros />

        <ApiList />
      </div>
    </aside>
  );
};

export default SideBar;
