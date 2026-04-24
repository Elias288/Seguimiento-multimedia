import { getCSVData } from "./bin/getCSVData.js";
import { getJSONData } from "./bin/getJSONData.js";
import { loadAnime } from "./bin/loadAnime.js";

document.addEventListener("DOMContentLoaded", async function () {
  // const pre = document.querySelector("pre");
  // const data = await getJSONData();

  const data = await getCSVData("data/contenido.csv");
  // pre.innerHTML = JSON.stringify(data, null, 4);

  loadAnime(data.anime);
});
