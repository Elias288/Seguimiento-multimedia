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
  submit: (data: MultimediaItem, type: MultimediaTypes) => void;
  cancel: () => void;
  type: MultimediaTypes;
}

const AddMultimedia = ({ type, submit, cancel }: Props) => {
  const [formData, setFormData] = useState<MultimediaItem>({
    name: "",
    alternative_name: "",
    description: "",
    status: Status.POR_VER,
    actual_episode: 0,
    actual_season: 1,
    total_caps: undefined,
    total_seasons: 1,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
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

    submit(formData, type);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-[#00000085]">
      <form
        onSubmit={handleSubmit}
        className="bg-dark border border-principal w-100  rounded-2xl p-4"
      >
        <h2 className="text-2xl font-bold mb-4">Agregar {type}</h2>

        <label className="mb-4 block">
          *Nombre
          <input
            type="text"
            name="name"
            ref={inputRef}
            value={formData.name}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
            required
          />
        </label>

        <label className="mb-4 block">
          Nombre alternativo
          <input
            type="text"
            name="alternative_name"
            value={formData.alternative_name}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="mb-4 block">
          Descripción
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="mb-4 block">
          Capítulos
          <input
            type="number"
            name="total_caps"
            value={formData.total_caps}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="mb-4 block">
          Temporadas
          <input
            type="number"
            name="total_seasons"
            value={formData.total_seasons}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="mb-4 block">
          Capítulo Actual
          <input
            type="number"
            name="actual_cap"
            value={formData.actual_episode}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="mb-4 block">
          Temporada Actual
          <input
            type="number"
            name="actual_season"
            value={formData.actual_season}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="mb-4 block">
          Estado
          <select
            name="status"
            id="status"
            onChange={handleChange}
            className="block w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          >
            <option value={Status.POR_VER}>Por ver</option>
            <option value={Status.VIENDO}>Viendo</option>
            <option value={Status.VISTO}>Visto</option>
            <option value={Status.DEJADO}>Dejado</option>
          </select>
        </label>

        <div className="border-t border-gray-700 pt-2 flex flex-row-reverse gap-2">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded"
          >
            Agregar
          </button>

          <button
            type="reset"
            className="px-4 py-2 cursor-pointer bg-red-900 text-white rounded"
            onClick={cancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMultimedia;
