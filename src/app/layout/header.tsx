import { useMediaContext } from "@/context/mediaContext";
import MenuIcon from "@/icons/menu";
import { NavLink } from "react-router";

type Props = {
  sideBarOpen: boolean;
  toggleSideBar: () => void;
};
const Header = ({ sideBarOpen, toggleSideBar }: Props) => {
  return (
    <header className="bg-principal py-2 px-4 h-header min-w-screenMinWidth font-bold sticky top-0 flex items-center justify-between z-20 col-span-full">
      <h1 className="text-2xl">
        <NavLink to={"/home"}>Seguimiento Multimedia</NavLink>
      </h1>

      <div className="flex gap-4">
        <div className="hidden md:flex md:items-center">
          <NavBar />
        </div>

        <button
          onClick={toggleSideBar}
          className="hover:opacity-70 cursor-pointer"
        >
          <MenuIcon isOpen={sideBarOpen} />
        </button>
      </div>
    </header>
  );
};

export const NavBar = () => {
  const { status, clearData, downloadData } = useMediaContext();
  return (
    <nav className="flex flex-wrap justify-center">
      <NavLink to={"/home"} className="px-2 hover:opacity-70">
        Home
      </NavLink>{" "}
      <NavLink to="/info" className="px-2 hover:opacity-70">
        Info
      </NavLink>{" "}
      <button
        onClick={downloadData}
        title="La información se guarda en el navegador, guárdala para no perderla"
        className="px-2 cursor-pointer flex items-center gap-1 hover:opacity-70"
      >
        Descargar
        {status.different && (
          <span className="text-sm bg-red-900 size-4 rounded-[50%] flex justify-center items-center">
            !
          </span>
        )}
      </button>
      <button
        onClick={clearData}
        className="px-2 cursor-pointer hover:opacity-70"
      >
        Cerrar
      </button>
    </nav>
  );
};

export default Header;
