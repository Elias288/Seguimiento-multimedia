import { useMediaContext } from "@/context/mediaContext";
import { useEffect } from "react";
/* clearMessage actualiza todo, no */
const MessageBottom = () => {
  const { status, clearMessage } = useMediaContext();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (status.message && !status.isError) {
        clearMessage();
      }
    }, 10000);

    return () => clearTimeout(timeOutId);
  }, [status]);

  return (
    <>
      {status.message && !status.isError && (
        <div className="w-fit bg-green-900 border-green-950 border px-4 py-2 flex gap-10 rounded-md shadow-2xl shadow-black">
          <span>{status.message}</span>

          <button
            onClick={() => clearMessage()}
            className="cursor-pointer hover:opacity-70"
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default MessageBottom;
