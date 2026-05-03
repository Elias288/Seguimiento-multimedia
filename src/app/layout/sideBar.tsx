import BuscadorMultimedia from "@/components/buscador";
import { NavBar } from "./header";

type Props = {
  isOpen: boolean;
};
const SideBar = ({ isOpen }: Props) => {
  return (
    <aside
      className={`fixed bg-transparentBackground h-screen z-20 overflow-hidden duration-200 ease-out ${isOpen ? "w-screen md:w-auto" : "w-0 md:w-auto"} md:relative md:h-auto md:flex`}
    >
      <div
        className={`bg-background2 col-1 overflow-x-hidden rounded-lg flex flex-col gap-4 h-full duration-200 ease-in-out ${isOpen ? "w-[80%] p-5 md:w-auto md:mx-3 md:my-5 md:py-3 " : "w-0"} md:h-auto`}
      >
        <div className="md:hidden flex justify-center border-b border-gray-700 pb-4">
          <NavBar />
        </div>

        <BuscadorMultimedia />
      </div>
    </aside>
  );
};

export default SideBar;
