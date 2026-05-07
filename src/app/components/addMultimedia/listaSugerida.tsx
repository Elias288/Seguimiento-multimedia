import Spinner from "@/icons/spinner";
import { EMPTY_FORMDATA, type MultimediaItem } from "@/types/data.type";

type ListaSugeridaProps = {
  lista: MultimediaItem[];
  query: string;
  customOption?: boolean;
  float?: boolean;
  select: (item: MultimediaItem) => void;
};
const ListaSugerida = ({
  lista,
  query,
  customOption = false,
  float = true,
  select,
}: ListaSugeridaProps) => {
  return (
    <div
      className={`bg-gray-700 rounded-b-sm w-full min-h-10 mb-4 overflow-y-auto ${float ? "absolute" : ""}`}
    >
      {!lista.length && (
        <li className="p-3 flex justify-center">
          <Spinner />
        </li>
      )}

      {lista.length > 0 && (
        <ul>
          {customOption && (
            <li
              onMouseDown={() => select({ ...EMPTY_FORMDATA, name: query })}
              className="mb-2 p-3 cursor-pointer hover:bg-background2 rounded-sm"
            >
              Custom option
            </li>
          )}

          {lista.map((i, key) => {
            const { image, smallImage, largeImage } = i.images ?? {};
            const showImage = image
              ? image
              : smallImage
                ? smallImage
                : largeImage;

            return (
              <li
                key={key}
                onMouseDown={() => select(i)}
                className="mb-2 p-3 grid grid-rows-[auto_auto] grid-cols-[auto_auto_1fr] gap-2 cursor-pointer hover:bg-background2 rounded-sm"
              >
                {showImage && (
                  <img
                    src={showImage}
                    alt="img"
                    className="aspect-square w-25 object-cover row-span-2"
                  />
                )}

                <p className="col-span-2">{i.name}</p>
                <p>Temporadas: {i.total_seasons ?? 0}</p>
                <p>Capítulos: {i.total_caps ?? 0}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListaSugerida;
