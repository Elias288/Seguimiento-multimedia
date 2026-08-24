import { useNavigate, useParams } from "react-router";

type Props = {
  toggleSidebar: () => void;
};
export const CategoriesNav = ({ toggleSidebar }: Props) => {
  let navigate = useNavigate();
  const { cat } = useParams();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleSidebar();
    navigate("category/" + event.currentTarget.value);
  };

  return (
    <div className="border-b border-gray-700 pb-4">
      <h3 className="mb-2">Categorías</h3>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        <button
          value="anime"
          title="Anime"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 col-span-full ${cat === "anime" ? "border border-principal" : ""}`}
        >
          Anime
        </button>

        <button
          value="serie"
          title="Serie"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 col-span-full ${cat === "serie" ? "border border-principal" : ""}`}
        >
          Serie
        </button>

        <button
          value="manga"
          title="Manga"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 col-span-full ${cat === "manga" ? "border border-principal" : ""}`}
        >
          Manga
        </button>

        <button
          value="comic"
          title="Comic"
          onClick={handleClick}
          className={`block bg-input rounded-sm py-3 cursor-pointer hover:opacity-70 col-span-full ${cat === "comic" ? "border border-principal" : ""}`}
        >
          Comic
        </button>
      </div>
    </div>
  );
};
