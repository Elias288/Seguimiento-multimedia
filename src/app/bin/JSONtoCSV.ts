import type { Multimedia, MultimediaItem } from "@/types/data.type";

export function jsonToCSV(data: Multimedia): string {
  const cabeceras: (keyof MultimediaItem | "type")[] = [
    "name",
    "alternative_name",
    "description",
    "type",
    "total_caps",
    "total_seasons",
    "actual_season",
    "actual_episode",
    "status",
    "images",
  ];
  const rows: string[] = [];

  Object.entries(data).forEach(([type, items]) => {
    if (!items) return;

    items.forEach((item) => {
      const row = [
        item.name,
        item.alternative_name,
        item.description,
        type,
        item.total_caps,
        item.total_seasons,
        item.actual_episode,
        item.actual_season,
        item.status,
        `image:${item.images?.image};smallImage:${item.images?.smallImage};largeImage:${item.images?.largeImage};`,
      ]
        .map((val) => `${String(val).replace(/''/g, '""')}`)
        .join(",");

      rows.push(row);
    });
  });

  return [cabeceras.join(","), ...rows].join("\n");
}

const defaultFileName = `data_${new Date().toISOString()}.csv`;
export function downloadCSV(csv: string, filename = defaultFileName) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
