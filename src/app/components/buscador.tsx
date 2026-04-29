import { useMedia } from "@/context/useMedia";
import BuscadorIcon from "@/icons/buscadorIcon";
import ShowMultimedia from "@/main/showMultimedia";
import type { MultimediaInfo, MultimediaItem } from "@/types/data.type";
import { useEffect, useState, type SubmitEvent } from "react";

const BuscadorMultimedia = () => {
  const { filteredData, filterMultimedia } = useMedia();
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MultimediaInfo | null>(null);
  const [openList, setOpenList] = useState<boolean>(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    filterMultimedia(searchInput);
    setOpenList(true);
  };

  const handleAction = () => {
    setSelectedItem(null);
  };

  const handleChange = (query: string) => {
    setSearchInput(query);
    if (query.length >= 3) {
      filterMultimedia(query);
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const openItem = (item: MultimediaInfo) => setSelectedItem(item);

  return (
    <>
      <div className="border-b border-gray-700 pb-4 relative">
        <form
          onSubmit={handleSubmit}
          className={`flex bg-gray-900 p-2 ${!filteredData.length ? "rounded-sm" : "rounded-t-sm"}`}
        >
          <input
            type="text"
            value={searchInput}
            onFocus={(e) => handleChange(e.target.value)}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Buscar..."
            className="w-full text-gray-400 outline-gray-700 focus-visible:outline-0 px-2"
          />

          <button type="submit" className="mr-2 cursor-pointer">
            <BuscadorIcon />
          </button>
        </form>

        {openList && filteredData.length > 0 && (
          <div
            className={`absolute top-10 w-full bg-gray-900 max-h-50 rounded-b-sm shadow-xl  ${!filterMultimedia.length ? "" : "border-t-2 border-dark"}`}
          >
            <ul>
              {filteredData.map((item: MultimediaInfo, key) => (
                <li
                  key={key}
                  className="hover:bg-dark px-4 py-2 cursor-pointer"
                  onClick={() => openItem(item)}
                >
                  {item.item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedItem && (
        <ShowMultimedia
          item={selectedItem.item}
          type={selectedItem.type}
          callback={handleAction}
        />
      )}
    </>
  );
};

export default BuscadorMultimedia;
