import Spinner from "@/icons/spinner";
import {
  EMPTY_FORMDATA,
  type MultimediaInfo,
  type MultimediaTypes,
} from "@/types/data.type";

type ListaSugeridaProps = {
  lista: MultimediaInfo[];
  query: string;
  type: MultimediaTypes;
  select: (item: MultimediaInfo) => void;
};
const ListaSugerida = ({ lista, query, type, select }: ListaSugeridaProps) => {
  return (
    <div className="bg-gray-700 rounded-b-sm w-full min-h-10 max-h-80 mb-4 overflow-y-auto absolute top-12.5">
      {!lista.length && (
        <li className="p-3 flex justify-center">
          <Spinner />
        </li>
      )}

      {lista.length > 0 && (
        <ul>
          <li
            onMouseDown={() =>
              select({ type, item: { ...EMPTY_FORMDATA, name: query } })
            }
            className="mb-2 p-3 cursor-pointer hover:bg-background2 rounded-sm"
          >
            Custom option
          </li>

          {lista.map((i, key) => {
            const { image, smallImage, largeImage } = i.item.images ?? {};

            return (
              <li
                key={key}
                onMouseDown={() => select(i)}
                className="mb-2 p-3 grid grid-rows-[auto_auto] grid-cols-[auto_auto_1fr] gap-2 cursor-pointer hover:bg-background2 rounded-sm"
              >
                <img
                  src={image ? image : smallImage ? smallImage : largeImage}
                  alt="img"
                  className="aspect-square w-25 object-cover row-span-2"
                />

                <p className="col-span-2">{i.item.name}</p>
                <p>
                  Temporadas: {i.item.actual_season ?? 0}/
                  {i.item.total_seasons ?? 0}
                </p>
                <p>
                  Capítulos: {i.item.actual_episode ?? 0}/
                  {i.item.total_caps ?? 0}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListaSugerida;
