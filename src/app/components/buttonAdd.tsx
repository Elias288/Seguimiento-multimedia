import AddIcon from "@/icons/addIcon";
import { useInterfaceContext } from "@/context/interfaceContext";

const ButtonAdd = () => {
  const { toggleOpenAddMultimedia } = useInterfaceContext();

  return (
    <div className="fixed right-2.5 bottom-2.5">
      <button
        className={`bg-principal size-16 md:size-12.5 mr-1 cursor-pointer float-end hover:bg-principal flex justify-center items-center align-middle rounded-[50%]`}
        onClick={toggleOpenAddMultimedia}
      >
        <AddIcon className="size-10 md:size-6" />
      </button>
    </div>
  );
};

export default ButtonAdd;
