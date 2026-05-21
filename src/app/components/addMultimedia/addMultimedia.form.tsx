import { getApi, getAvailableApis } from "@/apis/apiFactory";
import { useMediaContext } from "@/context/mediaContext";
import BuscadorIcon from "@/icons/buscadorIcon";
import {
  EMPTY_FORMDATA,
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
import { useInterfaceContext } from "@/context/interfaceContext";
import type { ApiOption, MediaApi } from "@/apis/api.types";
import { NumberInput } from "../NumberInput";

interface Props {}

const AddMultimedia = ({}: Props) => {
  const { status, addData, clearError } = useMediaContext();
  const { selectedMultimedia, selectMultimedia, toggleOpenAddMultimedia } =
    useInterfaceContext();

  const [formData, setFormData] = useState<MultimediaItem>(
    selectedMultimedia ? selectedMultimedia : EMPTY_FORMDATA,
  );
  const [apiResult, setApiResult] = useState<MultimediaItem[]>([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isSelectedItem, setIsSelectedItem] = useState<boolean>(
    selectedMultimedia !== undefined,
  );
  const [actualApi, setActualApi] = useState<MediaApi | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setErrorMsg(undefined);

    switch (name) {
      case "total_caps":
      case "total_seasons":
      case "actual_season":
      case "actual_episode":
        setFormData((prev) => ({ ...prev, [name]: Number(value) }));
        break;

      case "image":
        setFormData((prev) => ({
          ...prev,
          images: { ...prev.images, image: value },
        }));
        break;

      case "selectApi":
        setActualApi(getApi(value as ApiOption));
        break;

      default:
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    }
  };

  const close = () => {
    if (formData.name !== "" && !confirm("Seguro que quiere cerrar?")) {
      inputRef.current?.focus();
      return;
    }

    clearData();
    toggleOpenAddMultimedia();
  };

  const searchMultimedia = async (type: MultimediaTypes) => {
    setErrorMsg(undefined);
    const value = formData.name.trim();
    setShowInfo(value.length !== 0);
    if (!actualApi) {
      setShowInfo(false);
      return;
    }

    try {
      setApiResult(await actualApi?.search(value));
      inputRef.current?.focus();
    } catch (error: any) {
      setErrorMsg(`${error.api}:  ${error.message}`);
      setShowInfo(false);
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    addData({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    clearData();
    inputRef.current?.focus();
  };

  const selectOption = async (info: MultimediaItem) => {
    if (!actualApi || !info.id) return;

    try {
      const multimediaData = await actualApi.getInfo(info.id);
      setFormData(multimediaData);
      setIsSelectedItem(true);
      setShowInfo(false);
    } catch (error: any) {
      setErrorMsg(`${error.api}:  ${error.message}`);
      setShowInfo(false);
    }

    inputRef.current?.focus();
  };

  const clearData = () => {
    setFormData({ ...EMPTY_FORMDATA, timestamp: new Date().toISOString() });
    setActualApi(getApi("jikan_anime"));
    setShowInfo(false);
    setIsSelectedItem(false);
    clearError();
    setApiResult([]);
    selectMultimedia(undefined);
    setErrorMsg(undefined);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isSelectedItem) return;

      e.preventDefault();
      searchMultimedia(formData.type ? formData.type : MultimediaTypes.ANIMES);
    }
  };

  const handleClear = () => {
    if (formData.name !== "" && !confirm("Seguro que quiere limpiar?")) return;
    clearData();
    inputRef.current?.focus();
  };

  useEffect(() => {
    setActualApi(getApi("jikan_anime"));
    setErrorMsg(undefined);
    inputRef.current?.focus();
  }, [formData.type]);

  useEffect(() => {
    setFormData({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    setErrorMsg(undefined);
  }, []);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleOpenAddMultimedia();
      }}
      className="fixed top-0 left-0 z-30 flex items-center justify-center w-full min-w-screenMinWidth h-full bg-transparentBackground"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-background1 border border-principal w-formW max-w-200 max-h-[90%] rounded-2xl p-4 grid grid-cols-[60%_1fr] grid-rows-[repeat(9_auto)] gap-y-1 gap-x-3 overflow-auto md:grid-cols-[300px_auto_auto] md:w-auto"
      >
        <h2 className="text-2xl font-bold col-span-full">
          Agregar
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="bg-background1 outline-0 border-0 px-2"
          >
            {Object.values(MultimediaTypes)
              .filter((i) => i !== MultimediaTypes.SIN_CATEGORIZAR)
              .map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
          </select>
        </h2>

        {/* Nombre */}
        <label className="block relative col-span-full">
          *Nombre
          <div
            className={`grid ${isSelectedItem ? "grid-cols-[1fr_auto_auto]" : "grid-cols-[1fr_auto]"} gap-2 pb-1 md:flex`}
          >
            <CustomInput
              name="name"
              ref={inputRef}
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleSearch}
              onBlur={() => {
                setApiResult([]);
                setShowInfo(false);
              }}
              required={true}
            />
            <button
              type="button"
              title="Buscar"
              className="rounded-sm bg-input px-4 cursor-pointer hover:opacity-70"
              onClick={() =>
                searchMultimedia(
                  formData.type ? formData.type : MultimediaTypes.ANIMES,
                )
              }
            >
              <BuscadorIcon size={20} />
            </button>

            {isSelectedItem && (
              <button
                type="button"
                title="limpiar"
                className="rounded-sm bg-input px-4 cursor-pointer hover:opacity-70"
                onClick={clearData}
              >
                -
              </button>
            )}

            <select
              name="selectApi"
              id="selected_api"
              title="Buscador"
              onChange={handleChange}
              className={`bg-input cursor-pointer px-4 py-1 text-center ${isSelectedItem ? "col-span-3" : "col-span-2"} md:text-start`}
            >
              {getAvailableApis().map((api, key) => (
                <option key={key} value={api.key}>
                  {api.key}
                </option>
              ))}
            </select>
          </div>
          {status.message && status.isError && (
            <span className="text-red-500">Multimedia ya registrada</span>
          )}
          {showInfo && (
            <ListaSugerida
              type={formData.type}
              query={formData.name}
              lista={apiResult}
              select={selectOption}
              customOption
            />
          )}
          {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
        </label>

        {/* Nombre alternativo */}
        <label className="block col-span-full">
          <CustomInput
            title="Nombre alternativo"
            name="alternative_name"
            value={formData.alternative_name}
            onChange={handleChange}
          />
        </label>

        {/* Descripción */}
        <label className="block col-span-full md:col-start-2">
          <CustomInput
            type="textarea"
            name="description"
            title="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        {/* URL Imagen */}
        <label className="block col-span-full md:col-start-2">
          <CustomInput
            type="text"
            name="Image"
            title="Imagen"
            value={formData.images?.image ?? ""}
            onChange={handleChange}
          />
        </label>

        {/* Imagen */}
        <div className="col-start-1 row-span-4 w-full max-h-cardH object-contain overflow-hidden md:row-start-4 md:row-span-5 md:h-cardH">
          {formData.images?.image && (
            <img
              src={formData.images?.image}
              alt=""
              className="w-full h-full aspect-3/4 object-contain"
            />
          )}
        </div>

        {/* Capítulos */}
        <NumberInput
          title="Capítulos"
          name="total_caps"
          min={0}
          value={formData.total_caps ?? 0}
          onChange={handleChange}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
        />

        {/* Temporadas */}
        <NumberInput
          title="Temporadas"
          name="total_seasons"
          min={0}
          value={formData.total_seasons ?? 1}
          onChange={handleChange}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
        />

        {/* Temporada actual */}
        <NumberInput
          title="Temporada Actual"
          name="actual_season"
          max={formData.total_seasons}
          min={0}
          value={formData.actual_season ?? 0}
          onChange={handleChange}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
        />

        {/* Capítulo actual */}
        <NumberInput
          title="Capítulo Actual"
          name="actual_episode"
          max={formData.total_caps}
          min={0}
          value={formData.actual_episode ?? 0}
          onChange={handleChange}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
        />

        {/* Estado */}
        <label className="col-span-full md:col-start-2">
          Estado
          <select
            name="status"
            id="status"
            onChange={handleChange}
            className="block w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-input p-2 cursor-pointer"
          >
            <option value={Status.POR_VER}>Por ver</option>
            <option value={Status.VIENDO}>Viendo</option>
            <option value={Status.VISTO}>Visto</option>
            <option value={Status.DEJADO}>Dejado</option>
          </select>
        </label>

        <div className="grid grid-cols-3 items-baseline border-t border-gray-700 pt-4 md:flex md:flex-row-reverse gap-2 col-span-full">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-principal text-white rounded hover:opacity-70"
          >
            Agregar
          </button>

          <button
            type="reset"
            className="col-start-2 row-start-1 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:opacity-70"
            onClick={handleClear}
          >
            Limpiar
          </button>

          <button
            type="reset"
            className="col-start-1 row-start-1 px-4 py-2 cursor-pointer bg-red-900 text-white rounded hover:opacity-70"
            onClick={close}
          >
            Cerrar
          </button>
          <span className="flex-1 text-gray-600 col-span-full">
            {new Date(formData.timestamp).toLocaleString()}
          </span>
        </div>
      </form>
    </div>
  );
};

export default AddMultimedia;
