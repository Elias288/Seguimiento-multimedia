import { useState } from "react";
import AddMultimedia from "./addMultimedia/addMultimedia.form";
import { MultimediaTypes } from "@/types/data.type";
import { useMediaContext } from "@/context/mediaContext";
import AddIcon from "@/icons/addIcon";

const ButtonAdd = () => {
  const { status, clearError } = useMediaContext();
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
          className={`bg-white flex flex-col gap-5 rounded-sm text-black overflow-x-hidden shadow-2xl shadow-black ${open ? "w-auto px-6 py-4 md:px-4 md:py-2" : "w-0"} md:gap-2.5 `}
        >
          <li
            onClick={() => handleOpen(MultimediaTypes.ANIMES)}
            className="underline hover:no-underline cursor-pointer"
          >
            Anime
          </li>
          <li
            onClick={() => handleOpen(MultimediaTypes.SERIES)}
            className="underline hover:no-underline hover:border-b-0 cursor-pointer"
          >
            Series
          </li>
          <li
            onClick={() => handleOpen(MultimediaTypes.MAGAS)}
            className="underline hover:no-underline hover:border-b-0 cursor-pointer"
          >
            Mangas
          </li>
          <li
            onClick={() => handleOpen(MultimediaTypes.COMICS)}
            className="underline hover:no-underline hover:border-b-0 cursor-pointer"
          >
            Comics
          </li>
        </ul>

        <button
          className={`bg-principal size-16 md:size-12.5 mr-1 cursor-pointer float-end hover:bg-principal flex justify-center items-center align-middle ${open ? "rounded-b-[50%]" : "rounded-[50%] "}`}
          onClick={() => setOpen(!open)}
        >
          <AddIcon className="size-10 md:size-6" />
        </button>
      </div>
    </>
  );
};

export default ButtonAdd;
