import { useMediaContext } from "@/context/mediaContext";
import type { Route } from "./+types/home";
import MainContent from "@/main/mainContent";
import { Navigate } from "react-router";
import { useEffect, type ReactNode } from "react";
import EmptySkeleton from "../components/EmptySkeleton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguimiento Multimedia - Home" },
    {
      name: "description",
      content: "Página principal de Seguimiento Multimedia",
    },
  ];
}

export default function Home() {
  const { data, status, setLoaded } = useMediaContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const MainContainer = ({ children }: { children: ReactNode }) => (
    <main className="max-w-6xl flex-1 py-5 px-3 overflow-x-hidden flex flex-col gap-10 lg:py-5 md:px-10 md:mx-auto">
      {children}
    </main>
  );

  if (status.loaded && !data) return <Navigate to="/" />;

  if (data && Object.values(data).every((arr) => arr.length === 0)) {
    return (
      <MainContainer>
        <div className="flex-1 flex flex-col justify-center lg:h-full">
          <p className="text-2xl font-bold text-gray-400 text-center">
            Sin Contenido
          </p>
        </div>
      </MainContainer>
    );
  }
  if (!status.loaded)
    return (
      <MainContainer>
        <EmptySkeleton title="Anime" />
        <EmptySkeleton title="Series" />
        <EmptySkeleton title="Manga" />
        <EmptySkeleton title="Comics" />
      </MainContainer>
    );

  return (
    <MainContainer>
      <MainContent />
    </MainContainer>
  );
}
