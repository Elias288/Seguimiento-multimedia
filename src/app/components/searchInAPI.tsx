import { useEffect, useRef, useState } from "react";
import BuscadorIcon from "@/icons/buscadorIcon";
import ListaSugerida from "./addMultimedia/listaSugerida";
import { type MultimediaItem } from "@/types/data.type";
import { getApi } from "@/apis/apiFactory";
import type { ApiOption, MediaApi } from "@/apis/api.types";
import { useInterfaceContext } from "@/context/interfaceContext";

interface Props {
  apiLabel: ApiOption;
  close: () => void;
}
const SearchInAPI = ({ apiLabel, close }: Props) => {
  const { selectMultimedia, toggleOpenAddMultimedia } = useInterfaceContext();
  const [inputText, setInputText] = useState<string>("");
  const [openList, setOpenList] = useState<boolean>(false);
  const [data, setData] = useState<MultimediaItem[] | undefined>([]);
  const [selectedApi, setSelectedApi] = useState<MediaApi | undefined>(
    undefined,
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedApi(getApi(apiLabel));
    inputRef.current?.focus();
  }, [apiLabel]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(undefined);

    if (inputText.length > 0) {
      setOpenList(true);
      try {
        const res = await selectedApi?.search(inputText);
        setData(res);
      } catch (error: any) {
        console.error(error);
        setErrorMessage(`${error.api}:  ${error.message}`);
        setOpenList(false);
      }
    }
    inputRef.current?.focus();
  };

  const selectItem = async (item: MultimediaItem) => {
    if (item.id) {
      selectMultimedia(await selectedApi?.getInfo(item.id));
      toggleOpenAddMultimedia();
      close();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 z-30 flex items-center justify-center w-full min-w-screenMinWidth h-full bg-transparentBackground"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="bg-background1 p-4 pb-6 border border-principal rounded-xl w-full max-w-200 h-[90%] overflow-y-scroll">
        <div className="flex items-baseline">
          <h3 className="text-xl mb-4 flex-1">Buscar en: {apiLabel}</h3>

          <button
            className="cursor-pointer px-2"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            X
          </button>
        </div>

        <div className="relative">
          <form
            onSubmit={handleSubmit}
            className="w-full max-h-[90%] rounded-sm bg-input p-2 flex gap-2 md:w-auto"
          >
            <input
              type="text"
              ref={inputRef}
              value={inputText}
              name="buscador"
              onFocus={(e) => setInputText(e.target.value)}
              onChange={(e) => setInputText(e.target.value)}
              onBlur={() => setOpenList(false)}
              placeholder="Buscar..."
              className="w-full text-gray-400 outline-gray-700 focus-visible:outline-0 px-2 border-r border-gray-700"
              required
            />

            <button type="submit" className="mx-2 cursor-pointer">
              <BuscadorIcon />
            </button>
          </form>

          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

          {openList && (
            <ListaSugerida
              lista={data ?? []}
              query={inputText}
              float={false}
              select={selectItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInAPI;
