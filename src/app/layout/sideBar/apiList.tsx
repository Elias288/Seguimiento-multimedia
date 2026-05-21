import type { ApiOption } from "@/apis/api.types";
import { getAvailableApis } from "@/apis/apiFactory";
import { useInterfaceContext } from "@/context/interfaceContext";
import { useEffect, useState } from "react";

type Props = {
  toggleSidebar: () => void;
};
const ApiList = ({ toggleSidebar }: Props) => {
  const { setSelectedApi } = useInterfaceContext();
  const [apis, setApis] = useState<{ label: string; key: ApiOption }[]>([]);

  useEffect(() => {
    setApis(getAvailableApis());
  }, []);

  return (
    <div className="border-b border-gray-700 pb-4 relative">
      <h3 className="mb-2">Apis</h3>

      <div className="flex flex-col gap-3 max-h-50 overflow-y-auto md:grid md:grid-cols-2">
        {apis.map((api, key) => (
          <button
            key={key}
            onClick={() => {
              setSelectedApi(api.key);
              toggleSidebar();
            }}
            className="bg-input block w-full rounded-sm py-3 cursor-pointer hover:opacity-70"
          >
            {api.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApiList;
