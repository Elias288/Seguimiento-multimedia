import { useEffect, useRef, useState } from "react";
import BuscadorIcon from "@/icons/buscadorIcon";
import ListaSugerida from "./addMultimedia/listaSugerida";
import { type MultimediaItem } from "@/types/data.type";
import { getApi } from "@/apis/apiFactory";

interface Props {
  apiLabel: ApiOption;
  close: () => void;
}
const SearchInAPI = ({ apiLabel, close }: Props) => {
  const [inputText, setInputText] = useState<string>("");
  const [openList, setOpenList] = useState<boolean>(false);
  const [data, setData] = useState<MultimediaItem[] | undefined>([]);
  const [selectedApi, setSelectedApi] = useState<MediaApi | undefined>(
    undefined,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedApi(getApi(apiLabel));
    inputRef.current?.focus();
  }, [apiLabel]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOpenList(inputText.length !== 0);
    setData(await selectedApi?.search(inputText));

    inputRef.current?.focus();
  };

  const selectItem = () => {
    close();
  };

  return (
    <div
      className="fixed top-0 left-0 z-30 flex items-center justify-center w-full min-w-screenMinWidth h-full bg-transparentBackground"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="bg-background1 p-4 pb-6 border border-principal rounded-xl w-formW max-w-200 h-[90%]">
        <h3 className="text-xl mb-4">Buscar en: {apiLabel}</h3>

        <div className="relative">
          <form
            onSubmit={handleSubmit}
            className="w-full max-h-[90%] rounded-sm bg-gray-900 p-2 flex gap-2"
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

          {openList && (
            <ListaSugerida
              lista={data ?? []}
              query={inputText}
              select={selectItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInAPI;
