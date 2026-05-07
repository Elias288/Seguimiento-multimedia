import { useMediaContext } from "@/context/mediaContext";
import type { Route } from "./+types/home";
import MainContent from "@/main/mainContent";
import { Navigate } from "react-router";
import { useEffect, type ReactNode } from "react";
import EmptySkeleton from "../components/EmptySkeleton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguimiento Multimedia" },
    { name: "description", content: "Welcome to React Router!" },
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
    <main className="flex-1 py-5 px-3 overflow-x-hidden flex flex-col gap-10 min-h-mainH md:py-5 md:px-10">
      {children}
    </main>
  );

  if (!data) return <Navigate to="/" />;

  if (Object.values(data).every((arr) => arr.length === 0)) {
    return (
      <div className="h-mainH flex flex-col justify-center md:h-full">
        <p className="text-2xl font-bold text-gray-400 text-center">
          Sin Contenido
        </p>
      </div>
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
