import BuscadorIcon from "@/icons/buscadorIcon";
import type { MultimediaInfo } from "@/types/data.type";
import { useState, type SubmitEvent } from "react";
import { useMediaSearchContext } from "@/context/mediaSearchContext";
import { useInterfaceContext } from "@/context/interfaceContext";

const BuscadorMultimedia = () => {
  const { filteredData, setQuery } = useMediaSearchContext();
  const { selectMultimedia } = useInterfaceContext();
  const [searchInput, setSearchInput] = useState<string>("");
  const [openList, setOpenList] = useState<boolean>(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setQuery(searchInput);
    setOpenList(true);
  };

  const handleChange = (query: string) => {
    setSearchInput(query);
    if (query.length >= 3) {
      setQuery(query);
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const openItem = (item: MultimediaInfo) => selectMultimedia(item);

  return (
    <>
      <div className="border-b border-gray-700 pb-4 relative">
        <h3 className="mb-2">Buscador interno</h3>

        <form
          onSubmit={handleSubmit}
          className={`flex bg-gray-900 p-2 ${!filteredData.length ? "rounded-sm" : "rounded-t-sm"}`}
        >
          <input
            type="text"
            value={searchInput}
            name="buscador"
            onFocus={(e) => handleChange(e.target.value)}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => setOpenList(false)}
            placeholder="Buscar..."
            className="w-full text-gray-400 outline-gray-700 focus-visible:outline-0 px-2 border-r border-gray-700"
          />

          <button type="submit" className="mx-2 cursor-pointer">
            <BuscadorIcon />
          </button>
        </form>

        {openList && filteredData.length > 0 && (
          <div
            className={`absolute w-full bg-gray-900 max-h-90 overflow-y-auto rounded-b-sm shadow-xl  ${!filteredData.length ? "" : "border-t-2 border-background1"}`}
          >
            <ul>
              {filteredData.map((item: MultimediaInfo, key) => (
                <li
                  key={key}
                  className="hover:bg-background1 px-4 py-2 cursor-pointer"
                  onMouseDown={() => openItem(item)}
                >
                  {item.item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default BuscadorMultimedia;
