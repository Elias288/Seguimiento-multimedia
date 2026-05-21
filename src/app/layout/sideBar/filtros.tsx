import { useMediaFilterContext } from "@/context/mediaFilter";
import { Status } from "@/types/data.type";

type Props = {
  toggleSidebar: () => void;
};
const Filtros = ({ toggleSidebar }: Props) => {
  const { query, setQuery } = useMediaFilterContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuery(event.currentTarget.value);
    toggleSidebar();
  };

  return (
    <div className="border-b border-gray-700 pb-4">
      <h3 className="mb-2">Filtros</h3>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        <button
          value={""}
          title="Todos"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 col-span-full ${query === "" ? "border border-principal" : ""}`}
        >
          Todos
        </button>

        <button
          value={Status.POR_VER}
          title="Por ver"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 text-porVer ${query === Status.POR_VER ? "border border-principal" : ""}`}
        >
          Por ver
        </button>

        <button
          value={Status.VIENDO}
          title="Viendo"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 text-viendo ${query === Status.VIENDO ? "border border-principal" : ""}`}
        >
          Viendo
        </button>

        <button
          value={Status.VISTO}
          title="Visto"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 text-visto ${query === Status.VISTO ? "border border-principal" : ""}`}
        >
          Visto
        </button>

        <button
          value={Status.DEJADO}
          title="Dejado"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 text-dejado ${query === Status.DEJADO ? "border border-principal" : ""}`}
        >
          Dejado
        </button>
      </div>
    </div>
  );
};

export default Filtros;
