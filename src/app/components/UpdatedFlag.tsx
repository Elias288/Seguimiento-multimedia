import { useMedia } from "@/context/useMedia";
import { useEffect, useState } from "react";

const UpdatedFlag = () => {
  const { updated, downloadData } = useMedia();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (updated) setShow(true);
  }, [updated]);

  return (
    <>
      {show && (
        <div className="sticky bottom-0 bg-[#6e3608] px-4 py-2 flex justify-between rounded-t-sm">
          <span>
            Información actualizada, guarde el archivo para no perderla.{" "}
            <button
              onClick={downloadData}
              className="cursor-pointer hover:opacity-70 underline hover:no-underline"
            >
              Descargar
            </button>
          </span>
          <button
            onClick={() => setShow(false)}
            className="cursor-pointer hover:opacity-70"
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default UpdatedFlag;
