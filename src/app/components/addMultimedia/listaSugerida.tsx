import Spinner from "@/icons/spinner";
import {
  EMPTY_FORMDATA,
  MultimediaTypes,
  type MultimediaItem,
} from "@/types/data.type";

type ListaSugeridaProps = {
  lista: MultimediaItem[];
  query: string;
  customOption?: boolean;
  float?: boolean;
  type?: MultimediaTypes;
  select: (item: MultimediaItem) => void;
};
const ListaSugerida = ({
  type,
  lista,
  query,
  customOption = false,
  float = true,
  select,
}: ListaSugeridaProps) => {
  return (
    <div
      className={`rounded-b-sm w-full min-h-10 mb-4 overflow-y-auto ${float ? "absolute bg-gray-700" : ""}`}
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
              onMouseDown={() =>
                select({ ...EMPTY_FORMDATA, name: query, type })
              }
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
                onMouseDown={() => select({ ...i, type })}
                className="bg-gray-700 mb-2 p-3 grid grid-rows-[auto_auto] grid-cols-[auto_1fr] gap-2 cursor-pointer border-b-2 border-b-gray-600 hover:bg-background2 rounded-sm"
              >
                {showImage && (
                  <img
                    src={showImage}
                    alt="img"
                    className="aspect-square w-25 object-cover row-span-3"
                  />
                )}

                <strong className="col-span-1">{i.name}</strong>
                {i.alternative_name && (
                  <p className="col-span-1">{i.alternative_name}</p>
                )}
                <p className="col-span-1 text-ellipsis overflow-hidden whitespace-nowrap">
                  {i.description}
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
