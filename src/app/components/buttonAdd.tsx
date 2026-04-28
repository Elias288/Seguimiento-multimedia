import { useState } from "react";
import AddMultimedia from "./addMultimedia";
import { MultimediaTypes } from "@/types/data.type";
import { useMedia } from "@/context/useMedia";

const ButtonAdd = () => {
  const { status, clearError } = useMedia();
  const [open, setOpen] = useState<Boolean>(false);
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [multimediaType, setMultimediaType] = useState<MultimediaTypes>(
    MultimediaTypes.ANIMES,
  );

  const handleOpen = (option: MultimediaTypes) => {
    setOpen(false);
    setMultimediaType(option);
    setShowForm(true);
  };

  const handleSubmit = () => {
    setShowForm(false);
    status.isError && clearError();
  };

  return (
    <>
      {showForm && (
        <AddMultimedia action={handleSubmit} type={multimediaType} />
      )}

      <div className="fixed right-2.5 bottom-2.5">
        <ul
          className={`bg-white flex flex-col gap-2.5 rounded-sm text-black overflow-x-hidden shadow-2xl shadow-black ${open ? "w-auto px-4 py-2" : "w-0"}`}
        >
          <li>
            <button
              onClick={() => handleOpen(MultimediaTypes.ANIMES)}
              className="underline hover:no-underline cursor-pointer"
            >
              Anime
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOpen(MultimediaTypes.SERIES)}
              className="underline hover:no-underline hover:border-b-0 cursor-pointer"
            >
              Series
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOpen(MultimediaTypes.MAGAS)}
              className="underline hover:no-underline hover:border-b-0 cursor-pointer"
            >
              Mangas
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOpen(MultimediaTypes.COMICS)}
              className="underline hover:no-underline hover:border-b-0 cursor-pointer"
            >
              Comics
            </button>
          </li>
        </ul>

        <button
          className={`bg-principal size-12.5 mr-1 cursor-pointer float-end hover:bg-[#0e9b9b] ${open ? "rounded-b-[50%]" : "rounded-[50%] "}`}
          onClick={() => setOpen(!open)}
        >
          <span className="text-3xl">+</span>
        </button>
      </div>
    </>
  );
};

export default ButtonAdd;
