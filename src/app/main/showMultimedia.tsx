import { useMediaContext } from "@/context/mediaContext";
import {
  type MultimediaItem,
  MultimediaTypes,
  Status,
} from "@/types/data.type";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";

interface Props {
  item: MultimediaItem;
  type: MultimediaTypes;
  callback: () => void;
}
const ShowMultimedia = ({ item, type, callback }: Props) => {
  const { data, updateItem, deleteItem } = useMediaContext();
  const [formData, setFormData] = useState<MultimediaItem>({
    name: item.name,
    alternative_name: item.alternative_name,
    description: item.description,
    status: item.status ?? Status.POR_VER,
    actual_episode: item.actual_episode ?? 1,
    actual_season: item.actual_season ?? 0,
    total_caps: item.total_caps ?? 0,
    total_seasons: item.total_seasons ?? 1,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem({ item: formData, type });
    callback();
  };

  const handleDelete = () => {
    if (data) {
      deleteItem({ item, type });
      callback();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-[#00000085]">
      <form
        onSubmit={handleSubmit}
        className="bg-dark border border-principal w-100 rounded-2xl p-4 flex flex-col gap-4"
      >
        {/* <h2 className="text-2xl font-bold mb-4">Agregar {type}</h2> */}

        <p>
          Nombre
          <span className="block text-gray-400 bg-gray-900 px-2 outline-gray-700 rounded-sm ">
            {formData.name}
          </span>
        </p>

        <label>
          Nombre alternativo
          <input
            type="text"
            name="alternative_name"
            value={formData.alternative_name}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Descripción
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Capítulos
          <input
            type="number"
            name="total_caps"
            value={formData.total_caps}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Temporadas
          <input
            type="number"
            name="total_seasons"
            value={formData.total_seasons}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Capítulo Actual
          <input
            type="number"
            name="actual_cap"
            value={formData.actual_episode}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Temporada Actual
          <input
            type="number"
            name="actual_season"
            value={formData.actual_season}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Estado
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="block w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2 cursor-pointer h-6"
          >
            <option value={Status.POR_VER}>Por ver</option>
            <option value={Status.VIENDO}>Viendo</option>
            <option value={Status.VISTO}>Visto</option>
            <option value={Status.DEJADO}>Dejado</option>
          </select>
        </label>

        <div className="border-t border-gray-700 pt-4 flex flex-row-reverse gap-2">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:opacity-70"
          >
            Actualizar
          </button>
          <button
            onClick={() => handleDelete()}
            type="button"
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:opacity-70"
          >
            Eliminar
          </button>

          <button
            type="reset"
            className="px-4 py-2 cursor-pointer bg-red-900 text-white rounded hover:opacity-70"
            onClick={callback}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowMultimedia;
