import BuscadorMultimedia from "./Buscador";
import { NavBar } from "@/layout/Header";
import Filtros from "./Filtros";
import ApiList from "./ApiList";
import { useMediaContext } from "@/context/mediaContext";
import { CategoriesNav } from "./CategoriesNav";

type Props = {
  isOpen: boolean;
  toggleSideBar: () => void;
};
const SideBar = ({ isOpen, toggleSideBar }: Props) => {
  const { data } = useMediaContext();

  return (
    <aside
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) toggleSideBar();
      }}
      className={`fixed bg-transparentBackground top-header h-mainH z-10 overflow-hidden duration-200 ease-out ${isOpen ? "w-screen lg:w-auto" : "w-0 lg:w-auto"} lg:max-w-87.5 lg:flex lg:bg-transparent`}
    >
      <div
        className={`bg-background2 col-1 overflow-x-hidden z-30 rounded-lg flex flex-col gap-2 h-full min-w-62.5 duration-200 ease-in-out ${isOpen ? "w-[80%] p-5" : "w-0"} lg:p-5 lg:w-full lg:mx-3 lg:my-5 lg:py-3 lg:h-auto`}
      >
        <div className="md:hidden flex justify-center border-b border-gray-700 pb-4">
          <NavBar action={toggleSideBar} />
        </div>

        <BuscadorMultimedia toggleSidebar={toggleSideBar} />

        <CategoriesNav toggleSidebar={toggleSideBar} />

        <Filtros toggleSidebar={toggleSideBar} />

        <ApiList toggleSidebar={toggleSideBar} />

        <div className="flex-1"></div>
        <p className="text-center text-gray-500">{data?.fileName}</p>
      </div>
    </aside>
  );
};

export default SideBar;
