import { getApi } from "@/apis/apiFactory";
import { useMediaContext } from "@/context/mediaContext";
import BuscadorIcon from "@/icons/buscadorIcon";
import {
  type MultimediaInfo,
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
  action: () => void;
  type: MultimediaTypes;
}

const EMPTY_FORMDATA: MultimediaItem = {
  name: "",
  alternative_name: "",
  description: "",
  status: Status.POR_VER,
  actual_episode: 0,
  actual_season: 0,
  total_caps: 0,
  total_seasons: 1,
  images: { image: undefined },
};

const AddMultimedia = ({ type, action }: Props) => {
  const { status, addData, clearError } = useMediaContext();
  const api = getApi("jikan");

  const [formData, setFormData] = useState<MultimediaItem>(EMPTY_FORMDATA);
  const [apiResult, setApiResult] = useState<MultimediaInfo[]>([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isSelectedItem, setIsSelectedItem] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (
      name === "total_caps" ||
      name === "total_seasons" ||
      name === "actual_season" ||
      name === "actual_episode"
    ) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchMultimedia = async () => {
    const value = formData.name;
    setApiResult(value.length <= 3 ? [] : await api.search(value));
    inputRef.current?.focus();
    setShowInfo(value.length > 3);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    if (!isSelectedItem) return;

    e.preventDefault();

    addData({ item: formData, type });
    setFormData(EMPTY_FORMDATA);
    setIsSelectedItem(false);
    inputRef.current?.focus();
  };

  const selectOption = (info: MultimediaInfo) => {
    setFormData(info.item);
    setIsSelectedItem(true);
    setShowInfo(false);
    inputRef.current?.focus();
  };

  const clearData = () => {
    setFormData(EMPTY_FORMDATA);
    setShowInfo(false);
    setIsSelectedItem(false);
    clearError();
    setApiResult([]);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isSelectedItem) return;

      e.preventDefault();
      searchMultimedia();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full min-w-screenMinWidth h-full bg-transparentBackground">
      <form
        onSubmit={handleSubmit}
        className="bg-background1 border border-principal w-formW max-w-200 max-h-[90%] rounded-2xl p-4 grid grid-cols-[60%_1fr] gap-4 md:grid-cols-[300px_auto_auto] md:w-auto"
      >
        <h2 className="text-2xl font-bold col-span-full">Agregar {type}</h2>

        <label className="block relative col-span-full">
          *Nombre
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              ref={inputRef}
              value={formData.name}
              onChange={handleChange}
              onBlur={() => setShowInfo(false)}
              onKeyDown={handleSearch}
              className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
              autoComplete="off"
              required
            />
            <button
              type="button"
              title="buscar"
              className="rounded-sm bg-gray-900 px-4 cursor-pointer hover:opacity-70"
              onClick={searchMultimedia}
            >
              <BuscadorIcon size={20} />
            </button>

            {isSelectedItem && (
              <button
                type="button"
                title="limpiar"
                className="rounded-sm bg-gray-900 px-4 cursor-pointer hover:opacity-70"
                onClick={clearData}
              >
                -
              </button>
            )}
          </div>
          {status.message && status.isError && (
            <span className="text-red-500">Multimedia ya registrada</span>
          )}
          {apiResult && showInfo && (
            <ListaSugerida lista={apiResult} select={selectOption} />
          )}
        </label>

        <label className="block col-span-full md:col-start-2">
          Nombre alternativo
          <input
            type="text"
            name="alternative_name"
            value={formData.alternative_name}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="block col-span-full md:col-start-2">
          Descripción
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full text-gray-400 h-35 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          ></textarea>
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

        <label className="block">
          Capítulos
          <input
            type="number"
            name="total_caps"
            value={formData.total_caps}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="block">
          Temporadas
          <input
            type="number"
            name="total_seasons"
            value={formData.total_seasons}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="block">
          Temporada Actual
          <input
            type="number"
            name="actual_season"
            value={formData.actual_season}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="block">
          Capítulo Actual
          <input
            type="number"
            name="actual_episode"
            value={formData.actual_episode}
            onChange={handleChange}
            className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          />
        </label>

        <label className="block col-span-full">
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

        <div className="border-t border-gray-700 pt-2 flex flex-row-reverse gap-2 col-span-full">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-principal text-white rounded hover:opacity-70"
          >
            Agregar
          </button>

          <button
            type="reset"
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:opacity-70"
            onClick={clearData}
          >
            Limpiar
          </button>

          <button
            type="reset"
            className="px-4 py-2 cursor-pointer bg-red-900 text-white rounded hover:opacity-70"
            onClick={action}
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

type ListaSugeridaProps = {
  lista: MultimediaInfo[];
  select: (item: MultimediaInfo) => void;
};
const ListaSugerida = ({ lista, select }: ListaSugeridaProps) => {
  return (
    <div className="bg-gray-700 rounded-b-sm min-h-10 max-h-80 mb-4 overflow-y-auto absolute top-12.5">
      <ul>
        {lista &&
          lista.map((i, key) => {
            const { image, smallImage, largeImage } = i.item.images ?? {};

            return (
              <li
                key={key}
                onMouseDown={() => select(i)}
                className="mb-2 p-3 grid grid-rows-[auto_auto] grid-cols-3 gap-2 cursor-pointer hover:bg-background2 rounded-sm"
              >
                <img
                  src={image ? image : smallImage ? smallImage : largeImage}
                  alt="img"
                  className="aspect-square w-25 object-cover row-span-2"
                />

                <p className="col-span-2">{i.item.name}</p>
                <p>
                  Temporadas: {i.item.actual_season ?? 0}/
                  {i.item.total_seasons ?? 0}
                </p>
                <p>
                  Capítulos: {i.item.actual_episode ?? 0}/
                  {i.item.total_caps ?? 0}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AddMultimedia;
