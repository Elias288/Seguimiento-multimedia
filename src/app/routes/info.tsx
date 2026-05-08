import { useMediaContext } from "@/context/mediaContext";
import type { Route } from "../+types/root";
import Spinner from "@/icons/spinner";
import { Navigate } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { NavBar } from "@/layout/header";
import type { Status } from "@/types/data.type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguimiento Multimedia" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Info = () => {
  const { data, status, setLoaded } = useMediaContext();
  const [categoriesCount, setCategoriesCount] =
    useState<Record<string, number>>();
  const [statusCount, setStatusCount] = useState<Record<Status, number>>();

  useEffect(() => {
    setLoaded(true);
    if (data) {
      setCategoriesCount(
        Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, value.length]),
        ),
      );

      setStatusCount(
        Object.values(data)
          .flat()
          .reduce(
            (acc, item) => {
              acc[item.status] = (acc[item.status] || 0) + 1;
              return acc;
            },
            {} as Record<Status, number>,
          ),
      );
    }
  }, []);

  const Block = ({ title, value }: { title: string; value: number }) => {
    return (
      <div className="bg-gray-700 rounded-lg p-2 flex-1">
        <h3 className="text-center">{title}</h3>
        <p className="text-center">{value}</p>
      </div>
    );
  };

  if (status.loaded && !data) return <Navigate to="/" />;

  if (!status.loaded)
    return (
      <MainContainer>
        <Spinner />
      </MainContainer>
    );

  return (
    <MainContainer>
      <div className="bg-background2 rounded-lg px-5 pt-5 pb-10 grid md:grid-cols-2 gap-5 md:gap-x-20">
        <h2 className="text-2xl col-span-full">Información</h2>

        {categoriesCount && (
          <section className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
            <h3 className="col-span-full">Categorías</h3>

            <Block title="Animes" value={categoriesCount["anime"]} />
            <Block title="Series" value={categoriesCount["serie"]} />
            <Block title="Mangas" value={categoriesCount["manga"]} />
            <Block title="Comics" value={categoriesCount["comic"]} />
          </section>
        )}

        {statusCount && (
          <section className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
            <h3 className="col-span-full">Estados</h3>

            <Block title="Por ver" value={statusCount["por ver"]} />
            <Block title="Vistos" value={statusCount["visto"]} />
            <Block title="Viendo" value={statusCount["viendo"]} />
            <Block title="Dejado" value={statusCount["dejado"]} />
          </section>
        )}
      </div>
    </MainContainer>
  );
};

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex-1 py-5 px-3 overflow-x-hidden flex flex-col gap-10 min-h-mainH md:py-5 md:px-10">
      {children}
    </main>
  );
};

type Props = {
  isOpen: boolean;
  toggleSideBar: () => void;
};
const SideBar = ({ isOpen, toggleSideBar }: Props) => {
  return (
    <aside
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) toggleSideBar();
      }}
      className={`fixed bg-transparentBackground h-mainH z-10 overflow-hidden duration-200 ease-out ${isOpen ? "w-screen md:w-auto" : "w-0 md:w-auto"} md:relative md:h-auto md:flex md:bg-transparent`}
    >
      <div
        className={`bg-background2 col-1 overflow-x-hidden z-30 rounded-lg flex flex-col gap-4 h-full min-w-62.5 duration-200 ease-in-out ${isOpen ? "w-[80%] p-5 md:w-full md:mx-3 md:my-5 md:py-3 " : "w-0"} md:h-auto`}
      >
        <div className="md:hidden flex justify-center border-b border-gray-700 pb-4">
          <NavBar />
        </div>
      </div>
    </aside>
  );
};

export default Info;
