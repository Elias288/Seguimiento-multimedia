import { useMediaContext } from "@/context/mediaContext";
import { useEffect, useState } from "react";

const UpdatedFlag = () => {
  const { status, downloadData } = useMediaContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (status.different) setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [status.different]);

  return (
    <>
      {show && (
        <div className="w-fit bg-orange-900 border-orange-950 border px-4 py-2 flex gap-20 rounded-md shadow-2xl shadow-black">
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
