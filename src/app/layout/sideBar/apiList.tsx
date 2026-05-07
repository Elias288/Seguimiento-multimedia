import { getAvailableApis, type ApiOption } from "@/apis/apiFactory";
import { useInterfaceContext } from "@/context/interfaceContext";
import { useEffect, useState } from "react";

const ApiList = () => {
  const { setSelectedApi } = useInterfaceContext();
  const [apis, setApis] = useState<{ label: string; key: ApiOption }[]>([]);

  useEffect(() => {
    setApis(getAvailableApis());
  }, []);

  return (
    <div className="border-b border-gray-700 pb-4 relative">
      <h3 className="mb-2">Apis</h3>

      <div className="flex flex-col gap-3 max-h-50 overflow-y-auto">
        {apis.map((api, key) => (
          <button
            key={key}
            onClick={() => setSelectedApi(api.key)}
            className="bg-gray-900 block w-full rounded-sm py-3 cursor-pointer hover:opacity-70"
          >
            {api.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApiList;
