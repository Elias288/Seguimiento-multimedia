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
    images: item.images,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, image: value },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full min-w-screenMinWidth h-full bg-transparentBackground">
      <form
        onSubmit={handleSubmit}
        className="bg-background1 border border-principal w-formW max-w-200 max-h-[90%] rounded-2xl p-4 grid grid-cols-[60%_1fr] gap-4 overflow-y-auto md:grid-cols-[300px_auto_auto] md:w-auto"
      >
        <h2 className="text-2xl font-bold col-span-full">{formData.name}</h2>

        <label className="col-span-full row-start-2">
          Nombre alternativo
          <input
            type="text"
            name="alternative_name"
            value={formData.alternative_name}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="col-span-full row-start-3 md:col-start-2">
          Descripción
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full h-35 text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="col-span-full row-start-4 md:col-start-2">
          Image
          <input
            type="url"
            name="image"
            value={formData.images?.image}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <div className="col-start-1 row-span-4 w-full max-h-62.5 aspect-3/4 object-contain md:row-start-3 md:max-h-cardW">
          {formData.images?.image && (
            <img
              src={formData.images?.image}
              alt=""
              className="w-full max-h-62.5 aspect-3/4 object-contain md:max-h-87.5"
            />
          )}
        </div>

        <label>
          Capítulos
          <input
            type="number"
            name="total_caps"
            min={0}
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
            min={0}
            value={formData.total_seasons}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Temporada Actual
          <input
            type="number"
            name="actual_season"
            max={formData.total_seasons}
            min={0}
            value={formData.actual_season}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label>
          Capítulo Actual
          <input
            type="number"
            name="actual_episode"
            max={formData.total_caps}
            min={0}
            value={formData.actual_episode}
            onChange={handleInputChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="col-span-full">
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

        <div className="border-t border-gray-700 pt-4 flex flex-row-reverse gap-2 col-span-full">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-principal text-white rounded hover:opacity-70"
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
