import { useMedia } from "@/context/useMedia";
import { NavLink } from "react-router";

type Props = {};
const Header = ({}: Props) => {
  const { updated, clearData, downloadData } = useMedia();

  return (
    <header className="bg-principal py-2 px-4 font-bold sticky top-0 flex items-center justify-between z-10">
      <h1 className="text-2xl">Seguimiento Multimedia</h1>

      <nav className="flex gap-2.5">
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
          {updated && (
            <span className="text-sm bg-red-900 size-4 rounded-[50%] flex justify-center items-center">
              !
            </span>
          )}
        </button>
        |
        <button onClick={clearData} className="hover:opacity-70 cursor-pointer">
          Cerrar
        </button>
      </nav>
    </header>
  );
};

export default Header;
