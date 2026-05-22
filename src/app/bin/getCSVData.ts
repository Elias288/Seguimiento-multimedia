import {
  CABECERAS,
  EMPTY_MULTIMEDIA,
  mapToCategoria,
  Status,
  type Multimedia,
  type MultimediaItem,
} from "@/types/data.type";
import Papa from "papaparse";

export function readCSVData(
  data: string,
  filename: string,
): Promise<Multimedia> {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(data, {
      header: false,
      skipEmptyLines: true,
      complete: ({ data: rows }) => {
        const datos: Multimedia = EMPTY_MULTIMEDIA();
        datos.fileName = filename;

        const parseNumber = (v: string) => {
          const n = Number(v);
          return isNaN(n) ? undefined : n;
        };

        const parseImages = (valor: string) => {
          if (!valor) return undefined;

          const get = (key: string): string | undefined => {
            const raw = valor.split(`${key}:`)[1]?.split(";")[0];
            return raw !== "undefined" ? raw : undefined;
          };

          return {
            image: get("image"),
            smallImage: get("smallImage"),
            largeImage: get("largeImage"),
          };
        };

        rows.slice(1).forEach((linea) => {
          const category = mapToCategoria(linea[3]);

          const objeto: MultimediaItem = {
            name: "",
            alternative_name: "",
            description: "",
            status: Status.POR_VER,
            timestamp: "",
          };

          CABECERAS.forEach((key, i) => {
            if (key === "type") return;

            const valor = linea[i];
            if (!valor) return;

            switch (key) {
              case "total_caps":
              case "total_seasons":
              case "actual_season":
              case "actual_episode":
                const num = parseNumber(valor);
                if (num !== undefined) (objeto as any)[key] = num;
                break;

              case "status":
                (objeto as any)[key] = valor;
                break;

              case "images":
                const images = parseImages(valor);
                if (images) (objeto as any)[key] = images;
                break;

              default:
                (objeto as any)[key] = valor;
            }
          });

          datos.media[category].push(objeto);
        });

        resolve(datos);
      },
      error: reject,
    });
  });
}
