import { useMediaContext } from "@/context/mediaContext";
import MenuIcon from "@/icons/menu";
import { NavLink } from "react-router";

type Props = {
  sideBarOpen: boolean;
  toggleSideBar: () => void;
};
const Header = ({ sideBarOpen, toggleSideBar }: Props) => {
  const { status, clearData, downloadData } = useMediaContext();

  return (
    <header className="bg-principal py-2 px-4 h-header font-bold sticky top-0 flex items-center justify-between z-10 col-span-full">
      <h1 className="text-2xl">Seguimiento Multimedia</h1>

      <nav className="flex gap-4">
        <NavLink to={"/home"} className="hover:opacity-70">
          Home
        </NavLink>{" "}
        |
        <NavLink to="/info" className="hover:opacity-70">
          Info
        </NavLink>{" "}
        |
        <button
          onClick={downloadData}
          title="La información se guarda en el navegador, guárdala para no perderla"
          className={`cursor-pointer flex items-center gap-1 hover:opacity-70`}
        >
          Descargar
          {status.different && (
            <span className="text-sm bg-red-900 size-4 rounded-[50%] flex justify-center items-center">
              !
            </span>
          )}
        </button>
        |
        <button onClick={clearData} className="hover:opacity-70 cursor-pointer">
          Cerrar
        </button>
        |
        <button
          onClick={() => toggleSideBar()}
          className="hover:opacity-70 cursor-pointer"
        >
          <MenuIcon isOpen={sideBarOpen} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
