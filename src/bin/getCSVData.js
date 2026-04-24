export async function getCSVData(path) {
  try {
    const res = await fetch(path);

    if (!res.ok) throw new Error(`Error al cargar el archivo: ${res.status}`);

    const textoCSV = await res.text();
    const lineas = textoCSV.split("\n").filter((linea) => linea.trim() !== "");
    if (lineas.length < 2) return {};

    // const cabeceras = lineas[0].split(",").map((c) => c.trim().toLowerCase());
    const cabeceras = [
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

    const datos = {};
    for (let i = 1; i < lineas.length; i++) {
      const valores = lineas[i].split(",").map((v) => v.trim());

      if (valores.length < cabeceras.length) continue;

      console.log(valores[indiceTipo]);

      const categoria = valores[indiceTipo]
        ? valores[indiceTipo].trim().toLowerCase()
        : "sin_categorizar";

      const objeto = {};

      cabeceras.forEach((cabecera, index) => {
        if (cabecera == "type") return;
        let valor = valores[index] ? valores[index].trim() : "";
        objeto[cabecera] = valor;
      });

      if (!datos[categoria]) datos[categoria] = [];

      datos[categoria].push(objeto);
    }

    return datos;
  } catch (error) {
    console.error("Hubo un problema con la lectura del archivo:", error);
    return null;
  }
}
