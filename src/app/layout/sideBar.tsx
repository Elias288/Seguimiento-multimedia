import BuscadorMultimedia from "@/components/buscador";

type Props = {
  isOpen: boolean;
};
const SideBar = ({ isOpen }: Props) => {
  return (
    <aside
      className={`bg-[#ffffff1c] col-1 overflow-x-hidden rounded-lg flex flex-col gap-4 ${isOpen ? "w-auto ml-5 my-5 px-2 py-5" : "w-0 h-0 overflow-y-hidden"}`}
    >
      <BuscadorMultimedia />
    </aside>
  );
};

export default SideBar;
