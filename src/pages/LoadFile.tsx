import { useMediaContext } from "@/context/mediaContext";
import { useEffect, useState } from "react";
import { readCSVData } from "@/bin/readCSVData";
import { useNavigate } from "react-router";
import { EMPTY_MULTIMEDIA } from "@/types/data.type";
import Spinner from "@/icons/spinner";
import IconNew from "@/icons/iconNew";
import UploadIcon from "@/icons/upload";

const LoadFile = () => {
  const { data, setData } = useMediaContext();
  const [error, setError] = useState<string | null>(null);
  const [localLoaded, setLocalLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

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

    const fileName = file.name.split(".csv")[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const res = await readCSVData(e.target?.result as string, fileName);
        setData(res);
        navigate("/home");
      } catch (err) {
        setError("Error al procesar el archivo");
      }
    };

    reader.onerror = () => {
      setError("Error al leer el archivo");
    };

    reader.readAsText(file);
  };

  const handleNew = () => {
    setData(EMPTY_MULTIMEDIA());
    navigate("/home");
  };

  const Main = ({ children }: { children: React.ReactNode }) => (
    <main className="flex-1 flex gap-4 items-center justify-center flex-col h-full">
      {children}
    </main>
  );

  if (!localLoaded)
    return (
      <Main>
        <Spinner size={100} />
      </Main>
    );

  return (
    <Main>
      <div className="w-cardW h-12.5 border flex flex-wrap relative rounded-lg overflow-hidden">
        <label
          htmlFor="nuevo"
          className="w-[83%] flex items-center text-[1.5rem] py-0 px-3.75 m-0 cursor-pointer"
        >
          Iniciar nuevo
        </label>
        <button
          id="nuevo"
          onClick={handleNew}
          className="w-[17%] text-[2rem] bg-principal flex items-center justify-center cursor-pointer"
        >
          <IconNew />
        </button>
      </div>

      <div>
        <div className="w-cardW h-12.5 border flex flex-wrap relative rounded-lg overflow-hidden">
          <label
            htmlFor="file_input"
            className="w-[83%] flex items-center text-[1.5rem] py-0 px-3.75 m-0"
          >
            Abrir archivo CSV
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
      </div>
    </Main>
  );
};

export default LoadFile;
