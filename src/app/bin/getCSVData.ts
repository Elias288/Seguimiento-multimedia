import type { Multimedia, MultimediaItem } from "@/types/data.type";

export async function getCSVData(data: string) {
  try {
    const lineas = data.split("\n").filter((linea) => linea.trim() !== "");
    if (lineas.length < 2) return {};

    const cabeceras: (keyof MultimediaItem | "type")[] = [
      "name",
      "alternative_name",
      "description",
      "type",
      "total_caps",
      "total_seasons",
      "actual_season",
      "actual_episode",
      "status",
    ];

    const indiceTipo = cabeceras.indexOf("type");
    if (indiceTipo === -1)
      throw new Error('La columna "type" no fue encontrada');

    const datos: Multimedia = {};
    for (let i = 1; i < lineas.length; i++) {
      const valores = lineas[i].split(",").map((v) => v.trim());

      if (valores.length < cabeceras.length) continue;

      const categoria = valores[indiceTipo]
        ? valores[indiceTipo].trim().toLowerCase()
        : "sin_categorizar";

      const objeto: MultimediaItem = {
        name: "",
        alternative_name: "",
        description: "",
        status: "por ver",
      };

      cabeceras.forEach((cabecera, index) => {
        if (cabecera === "type") return;

        let valor = valores[index] ?? "";

        if (valor === "") return;

        if (
          cabecera === "total_caps" ||
          cabecera === "total_seasons" ||
          cabecera === "actual_season" ||
          cabecera === "actual_episode"
        ) {
          const num = Number(valor);
          if (!isNaN(num)) {
            (objeto as any)[cabecera] = num;
          }
          return;
        }

        if (cabecera === "status") {
          (objeto as any)[cabecera] = valor as MultimediaItem["status"];
          return;
        }

        (objeto as any)[cabecera] = valor;
      });

      if (!datos[categoria]) datos[categoria] = [];

      datos[categoria].push(objeto as MultimediaItem);
    }

    return datos;
  } catch (error) {
    console.error("Hubo un problema con la lectura del archivo:", error);
    return null;
  }
}
