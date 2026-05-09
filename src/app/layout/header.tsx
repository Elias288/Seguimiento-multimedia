import { useMediaContext } from "@/context/mediaContext";
import MenuIcon from "@/icons/menu";
import { NavLink } from "react-router";

type Props = {
  sideBarOpen: boolean;
  setShowSideBar: (val: boolean) => void;
};
const Header = ({ sideBarOpen, setShowSideBar }: Props) => {
  return (
    <header className="bg-principal py-2 px-4 h-header min-w-screenMinWidth font-bold sticky top-0 flex items-center justify-between z-20 col-span-full">
      <h1 className="text-2xl">
        <NavLink to={"/home"}>Seguimiento Multimedia</NavLink>
      </h1>

      <div className="flex gap-4">
        <div className="hidden md:flex md:items-center">
          <NavBar action={(e: boolean) => setShowSideBar(e)} />
        </div>

        <button
          onClick={() => setShowSideBar(!sideBarOpen)}
          className="hover:opacity-70 cursor-pointer"
        >
          <MenuIcon isOpen={sideBarOpen} />
        </button>
      </div>
    </header>
  );
};

export const NavBar = ({ action }: { action: (e: boolean) => void }) => {
  const { status, clearData, downloadData } = useMediaContext();
  return (
    <nav className="flex flex-wrap justify-center">
      <NavLink
        to={"/home"}
        onClick={() => action(false)}
        className="px-2 hover:opacity-70 select-none"
      >
        Home
      </NavLink>{" "}
      <NavLink
        to="/info"
        onClick={() => action(false)}
        className="px-2 hover:opacity-70 select-none"
      >
        Info
      </NavLink>{" "}
      <button
        onClick={() => {
          downloadData();
          action(false);
        }}
        title="La información se guarda en el navegador, guárdala para no perderla"
        className="px-2 cursor-pointer flex items-center gap-1 hover:opacity-70 select-none"
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
        className="px-2 cursor-pointer hover:opacity-70 select-none"
      >
        Cerrar
      </button>
    </nav>
  );
};

export default Header;
