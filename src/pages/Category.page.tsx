import EmptySkeleton from "@/components/EmptySkeleton";
import RenderMultimediaType from "@/components/MainContent/RenderMultimediaType";
import { useMediaContext } from "@/context/mediaContext";
import { useMediaFilterContext } from "@/context/mediaFilter";
import { MultimediaTypes } from "@/types/data.type";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

export const CategoryPage = () => {
  const { data, status, setLoaded } = useMediaContext();
  const { filteredData } = useMediaFilterContext();
  const [validCat, setValidCat] = useState(false);
  const { cat } = useParams();

  useEffect(() => {
    setValidCat(
      Object.values(MultimediaTypes).includes(
        cat?.toLowerCase() as (typeof MultimediaTypes)[keyof typeof MultimediaTypes],
      ),
    );
  }, [cat]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const MainContainer = ({ children }: { children: React.ReactNode }) => (
    <main className="max-w-6xl w-formW flex-1 py-5 px-3 overflow-x-hidden flex flex-col gap-10 md:px-10 md:mx-auto lg:py-5 lg:col-start-2">
      {children}
    </main>
  );

  if (status.loaded && !data) return <Navigate to="/" />;

  if (data && Object.values(data.media).every((arr) => arr.length === 0)) {
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
  if (!validCat) {
    return (
      <MainContainer>
        <div className="flex-1 flex flex-col justify-center lg:h-full">
          <p className="text-2xl font-bold text-gray-400 text-center">
            Categoría invalida
          </p>
        </div>
      </MainContainer>
    );
  }
  if (!status.loaded)
    return (
      <MainContainer>
        <EmptySkeleton title={cat || ""} />
      </MainContainer>
    );

  return (
    <MainContainer>
      {cat === "anime" && (
        <RenderMultimediaType
          content={filteredData?.media.anime || []}
          type={MultimediaTypes.ANIMES}
          title="Anime"
          toggleShow={false}
        />
      )}

      {cat === "serie" && (
        <RenderMultimediaType
          content={filteredData?.media.serie || []}
          type={MultimediaTypes.SERIES}
          title="Serie"
          toggleShow={false}
        />
      )}

      {cat === "manga" && (
        <RenderMultimediaType
          content={filteredData?.media.manga || []}
          type={MultimediaTypes.MAGAS}
          title="Manga"
          toggleShow={false}
        />
      )}

      {cat === "comic" && (
        <RenderMultimediaType
          content={filteredData?.media.comic || []}
          type={MultimediaTypes.COMICS}
          title="Comic"
          toggleShow={false}
        />
      )}
    </MainContainer>
  );
};
