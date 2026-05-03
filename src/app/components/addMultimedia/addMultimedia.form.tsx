import { getApi } from "@/apis/apiFactory";
import { useMediaContext } from "@/context/mediaContext";
import BuscadorIcon from "@/icons/buscadorIcon";
import {
  EMPTY_FORMDATA,
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
import ListaSugerida from "./listaSugerida";
import CustomInput from "../CustomInputProps";

interface Props {
  action: () => void;
  type: MultimediaTypes;
}

const AddMultimedia = ({ type, action }: Props) => {
  const { status, addData, clearError } = useMediaContext();

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

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, image: value },
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchMultimedia = async (type: MultimediaTypes) => {
    setShowInfo(formData.name.length > 3);

    switch (type) {
      case MultimediaTypes.ANIMES:
        const api = getApi("jikan");
        const value = formData.name;
        setApiResult(value.length <= 3 ? [] : await api.search(value));
        if (value.length === 0) setShowInfo(false);
        break;

      case MultimediaTypes.COMICS:
      case MultimediaTypes.MAGAS:
      case MultimediaTypes.SERIES:
      default:
        setTimeout(() => {
          setShowInfo(false);
        }, 500);
        break;
    }

    inputRef.current?.focus();
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
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
      searchMultimedia(type);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full min-w-screenMinWidth h-full bg-transparentBackground">
      <form
        onSubmit={handleSubmit}
        className="bg-background1 border border-principal w-formW max-w-200 max-h-[90%] rounded-2xl p-4 grid grid-cols-[60%_1fr] gap-y-2 gap-x-3 overflow-auto md:grid-cols-[300px_auto_auto] md:w-auto"
      >
        <h2 className="text-2xl font-bold col-span-full">Agregar {type}</h2>

        <label className="block relative col-span-full">
          *Nombre
          <div className="flex gap-2">
            <CustomInput
              name="name"
              ref={inputRef}
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleSearch}
              onBlur={() => setShowInfo(false)}
              required={true}
            />
            <button
              type="button"
              title="buscar"
              className="rounded-sm bg-gray-900 px-4 cursor-pointer hover:opacity-70"
              onClick={() => searchMultimedia(type)}
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
          {showInfo && (
            <ListaSugerida
              type={type}
              query={formData.name}
              lista={apiResult}
              select={selectOption}
            />
          )}
        </label>

        <label className="block col-span-full">
          <CustomInput
            title="Nombre alternativo"
            name="alternative_name"
            value={formData.alternative_name}
            onChange={handleChange}
          />
        </label>

        <label className="block col-span-full md:col-start-2">
          <CustomInput
            type="textarea"
            name="description"
            title="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="block col-span-full md:col-start-2">
          <CustomInput
            type="text"
            name="Image"
            title="Imagen"
            value={formData.images?.image ?? ""}
            onChange={handleChange}
          />
        </label>

        <div className="col-start-1 row-span-4 w-full object-contain overflow-hidden md:row-start-4 md:row-span-5 md:h-[400px]">
          {formData.images?.image && (
            <img
              src={formData.images?.image}
              alt=""
              className="w-full h-full aspect-3/4 object-contain"
            />
          )}
        </div>

        <label>
          <CustomInput
            title="Capítulos"
            type="number"
            name="total_caps"
            min={0}
            value={formData.total_caps ?? 0}
            onChange={handleChange}
            onFocus={(e) => {
              e.currentTarget.select();
            }}
          />
        </label>

        <label>
          <CustomInput
            title="Temporadas"
            type="number"
            name="total_seasons"
            min={0}
            value={formData.total_seasons ?? 1}
            onChange={handleChange}
            onFocus={(e) => {
              e.currentTarget.select();
            }}
          />
        </label>

        <label>
          <CustomInput
            title="Temporada Actual"
            type="number"
            name="actual_season"
            max={formData.total_seasons}
            min={0}
            value={formData.actual_season ?? 0}
            onChange={handleChange}
            onFocus={(e) => {
              e.currentTarget.select();
            }}
          />
        </label>

        <label>
          <CustomInput
            title="Capítulo Actual"
            type="number"
            name="actual_episode"
            max={formData.total_caps}
            min={0}
            value={formData.actual_episode ?? 0}
            onChange={handleChange}
            onFocus={(e) => {
              e.currentTarget.select();
            }}
          />
        </label>

        <label className="col-span-full md:col-start-2">
          Estado
          <select
            name="status"
            id="status"
            onChange={handleChange}
            className="block w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 p-2 cursor-pointer"
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

export default AddMultimedia;
