import { useMediaContext } from "@/context/mediaContext";
import type { Route } from "../+types/root";
import Spinner from "@/icons/spinner";
import { Navigate } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import type { Status } from "@/types/data.type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguimiento Multimedia - Info" },
    { name: "description", content: "Información de la sesión" },
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

  const Main = ({ children }: { children: ReactNode }) => {
    return (
      <main className="py-5 px-3 overflow-x-hidden flex flex-col gap-10 md:py-5 md:px-10">
        {children}
      </main>
    );
  };

  if (status.loaded && !data) return <Navigate to="/" />;

  if (!status.loaded)
    return (
      <Main>
        <Spinner />
      </Main>
    );

  return (
    <Main>
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
    </Main>
  );
};

export default Info;
