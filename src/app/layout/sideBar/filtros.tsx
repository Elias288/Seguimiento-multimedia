import { useMediaFilterContext } from "@/context/mediaFilter";
import { Status } from "@/types/data.type";

const Filtros = () => {
  const { setQuery } = useMediaFilterContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setQuery(event.currentTarget.value);

  return (
    <div className="border-b border-gray-700 pb-4">
      <h3 className="mb-2">Filtros</h3>

      <div className="flex flex-col gap-3">
        <button
          value={""}
          title="Todos"
          onClick={handleClick}
          className="block bg-gray-900 rounded-sm py-3 cursor-pointer hover:opacity-70 "
        >
          Todos
        </button>

        <button
          value={Status.POR_VER}
          title="Por ver"
          onClick={handleClick}
          className="block bg-gray-900 rounded-sm py-3 cursor-pointer hover:opacity-70 text-porVer"
        >
          Por ver
        </button>

        <button
          value={Status.VIENDO}
          title="Viendo"
          onClick={handleClick}
          className="block bg-gray-900 rounded-sm py-3 cursor-pointer hover:opacity-70 text-viendo"
        >
          Viendo
        </button>

        <button
          value={Status.VISTO}
          title="Visto"
          onClick={handleClick}
          className="block bg-gray-900 rounded-sm py-3 cursor-pointer hover:opacity-70 text-visto"
        >
          Visto
        </button>

        <button
          value={Status.DEJADO}
          title="Dejado"
          onClick={handleClick}
          className="block bg-gray-900 rounded-sm py-3 cursor-pointer hover:opacity-70 text-dejado"
        >
          Dejado
        </button>
      </div>
    </div>
  );
};

export default Filtros;
