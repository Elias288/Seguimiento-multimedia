import { useEffect, useState } from "react";
import { getCSVData } from "@/bin/getCSVData";
import { useMediaContext } from "@/context/mediaContext";
import { redirect } from "react-router";
import UploadIcon from "@/icons/upload";
import type { Route } from "../+types/root";
import Spinner from "@/icons/spinner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguimiento Multimedia" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const LoadFile = () => {
  const { data, setData } = useMediaContext();
  const [error, setError] = useState<string | null>(null);
  const [localLoaded, setLocalLoaded] = useState<boolean>(false);

  useEffect(() => setLocalLoaded(true), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const file = e.target.files?.[0];
    if (!file) {
      setError("No se seleccionó ningún archivo");
      return;
    }

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("El archivo no es un CSV válido");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const res = await getCSVData(text);
        setData(res);

        redirect("/home");
      } catch (err) {
        setError("Error al procesar el archivo");
      }
    };

    reader.onerror = () => {
      setError("Error al leer el archivo");
    };

    reader.readAsText(file);
  };

  if (!localLoaded)
    return (
      <main className="h-screen flex-1 flex items-center justify-center">
        <Spinner size={100} />
      </main>
    );
  return (
    <main className="h-screen flex-1 flex items-center justify-center flex-col">
      <div className="w-75 h-12.5 border flex flex-wrap relative rounded-lg overflow-hidden">
        <label
          htmlFor="file_input"
          className="w-[83%] flex items-center text-[1.5rem] py-0 px-3.75 m-0"
        >
          Subir archivo CSV
        </label>

        <button className="w-[17%] text-[2rem] bg-principal flex items-center justify-center">
          <UploadIcon />
        </button>

        <input
          id="file_input"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && <p className="text-green-500">data cargada</p>}
    </main>
  );
};

export default LoadFile;
