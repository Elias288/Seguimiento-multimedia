import { useMediaContext } from "@/context/mediaContext";
import {
  type MultimediaItem,
  MultimediaTypes,
  Status,
} from "@/types/data.type";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import CustomInput from "./CustomInputProps";
import { useInterfaceContext } from "@/context/interfaceContext";
import { NumberInput } from "./NumberInput";

const statusColor: Record<Status, string> = {
  [Status.VIENDO]: "bg-viendo border-viendo",
  [Status.DEJADO]: "bg-dejado border-dejado",
  [Status.POR_VER]: "bg-porVer border-porVer",
  [Status.VISTO]: "bg-visto border-visto",
};

interface Props {}
const ShowMultimedia = ({}: Props) => {
  const { selectedMultimedia, selectMultimedia, toggleOpenUpdateMultimedia } =
    useInterfaceContext();
  const { data, updateItem, deleteItem } = useMediaContext();
  const [formData, setFormData] = useState<MultimediaItem>({
    name: selectedMultimedia?.name ?? "",
    type: selectedMultimedia?.type ?? MultimediaTypes.ANIMES,
    alternative_name: selectedMultimedia?.alternative_name ?? "",
    description: selectedMultimedia?.description ?? "",
    status: selectedMultimedia?.status ?? Status.POR_VER,
    timestamp: selectedMultimedia?.timestamp ?? "",
    actual_episode: selectedMultimedia?.actual_episode ?? 0,
    actual_season: selectedMultimedia?.actual_season ?? 0,
    total_caps: selectedMultimedia?.total_caps ?? 0,
    total_seasons: selectedMultimedia?.total_seasons ?? 1,
    images: selectedMultimedia?.images,
  });
  const [updated, setUpdated] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateFormData = ({ name, value }: { name: string; value: any }) => {
    setUpdated(true);

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, image: value },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const close = () => {
    selectMultimedia(undefined);
    toggleOpenUpdateMultimedia();
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    setUpdated(false);
  };

  const handleDelete = () => {
    if (!data || !selectedMultimedia) return;

    if (confirm("Seguro que quiere eliminar?")) {
      deleteItem(selectedMultimedia);
      close();
    }
  };

  const handleClose = () => {
    if (updated && !confirm("Seguro que quiere cerrar sin guardar?")) return;
    close();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="animate-in fade-in zoom-in-95 duration-200 bg-background1 border border-principal/30 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6"
      >
        {/* HEADER */}
        <div className="mb-6">
          <div>
            <h2 className="text-3xl font-bold">{formData.name}</h2>

            <p className="text-sm text-gray-400">{formData.alternative_name}</p>
          </div>

          {updated && (
            <span className="text-yellow-400 font-medium flex-1 col-span-full">
              ⚠ Cambios sin guardar
            </span>
          )}
        </div>

        {/* CONTENIDO */}
        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          {/* PORTADA */}
          <div className="space-y-4">
            <div className="aspect-3/4 overflow-hidden rounded-xl border border-gray-700">
              {formData.images?.image ? (
                <img
                  src={formData.images.image}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}
            </div>
          </div>

          {/* DATOS */}
          <div className="space-y-4">
            <CustomInput
              title="Nombre alternativo"
              type="text"
              name="alternative_name"
              value={formData.alternative_name}
              onChange={(e) =>
                updateFormData({
                  name: "alternative_name",
                  value: e.target.value,
                })
              }
            />

            <CustomInput
              title="Descripción"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={(e) =>
                updateFormData({ name: "description", value: e.target.value })
              }
            />

            <CustomInput
              title="Imagen"
              type="url"
              name="image"
              value={formData.images?.image ?? ""}
              onChange={(e) =>
                updateFormData({ name: "image", value: e.target.value })
              }
            />
          </div>

          {/* Estado */}
          <div className="flex flex-wrap gap-2 col-span-full">
            {Object.values(Status).map((status) => (
              <button
                key={status}
                type="button"
                name="status"
                value={status}
                onClick={() =>
                  updateFormData({ name: "status", value: status })
                }
                className={`px-4 py-2 cursor-pointer rounded-full border ${formData.status === status ? `text-white ${statusColor[status]}` : "border-gray-700"}`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* ESTADÍSTICAS */}
          <div className="grid gap-y-4 md:gap-x-16 md:gap-y-0 md:grid-cols-2 md:col-span-full">
            {/* Capítulos */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Capítulos</span>

                <span>
                  {formData.actual_episode} / {formData.total_caps}
                </span>
              </div>

              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-principal"
                  style={{
                    width: `${
                      formData.total_caps
                        ? (Number(formData.actual_episode) /
                            Number(formData.total_caps)) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateFormData({
                      name: "actual_episode",
                      value: Math.max(0, Number(formData.actual_episode) - 1),
                    })
                  }
                  className="cursor-pointer size-10 rounded-full bg-gray-700"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {formData.actual_episode}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateFormData({
                      name: "actual_episode",
                      value: Math.min(
                        Number(formData.total_caps),
                        Number(formData.actual_episode) + 1,
                      ),
                    })
                  }
                  className="cursor-pointer size-10 rounded-full bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Temporadas */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Temporadas</span>

                <span>
                  {formData.actual_season} / {formData.total_seasons}
                </span>
              </div>

              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-principal"
                  style={{
                    width: `${
                      formData.total_seasons
                        ? (Number(formData.actual_season) /
                            Number(formData.total_seasons)) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateFormData({
                      name: "actual_season",
                      value: Math.max(0, Number(formData.actual_season) - 1),
                    })
                  }
                  className="cursor-pointer size-10 rounded-full bg-gray-700"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {formData.actual_season}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateFormData({
                      name: "actual_season",
                      value: Math.min(
                        Number(formData.total_seasons),
                        Number(formData.actual_season) + 1,
                      ),
                    })
                  }
                  className="cursor-pointer size-10 rounded-full bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <NumberInput
              title="Total capítulos"
              name="total_caps"
              min={0}
              value={formData.total_caps ?? 0}
              onChange={(e) =>
                updateFormData({ name: "total_caps", value: e.target.value })
              }
            />

            <NumberInput
              title="Total temporadas"
              name="total_seasons"
              min={0}
              value={formData.total_seasons ?? 0}
              onChange={(e) =>
                updateFormData({ name: "total_seasons", value: e.target.value })
              }
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 mt-8 border-t border-gray-700 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer flex-1 md:flex-none px-4 py-2 bg-gray-700 rounded"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer flex-1 md:flex-none px-4 py-2 bg-red-700 rounded"
          >
            Eliminar
          </button>

          <button
            type="submit"
            className="cursor-pointer flex-1 md:flex-none px-4 py-2 bg-principal rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowMultimedia;
