export function loadAnime(animeList) {
  const content_list = document.querySelector("#anime .content__list");
  content_list.innerHTML = "";

  animeList.map((item) => {
    const card = document.createElement("div");
    card.className = "anime__card";

    const parrafo = document.createElement("p");
    parrafo.innerText = item.name;

    card.appendChild(parrafo);

    content_list.appendChild(card);
  });
}
