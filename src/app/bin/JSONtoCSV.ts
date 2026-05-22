import { CABECERAS, type Multimedia } from "@/types/data.type";

export function jsonToCSV(data: Multimedia): string {
  const rows: string[] = [];

  Object.entries(data.media).forEach(([type, items]) => {
    if (!items) return;

    items.forEach((item) => {
      const row = [
        normalizeAndEscapeCSV(item.name),
        normalizeAndEscapeCSV(item.alternative_name),
        normalizeAndEscapeCSV(item.description),
        type,
        item.timestamp,
        item.total_caps,
        item.total_seasons,
        item.actual_season,
        item.actual_episode,
        item.status,
        `image:${item.images?.image};smallImage:${item.images?.smallImage};largeImage:${item.images?.largeImage};`,
      ]
        .map((val) => `${String(val).replace(/''/g, '""')}`)
        .join(",");

      rows.push(row);
    });
  });

  return [CABECERAS.join(","), ...rows].join("\n");
}

function normalizeAndEscapeCSV(value: string) {
  if (value == null) return "";
  let str = String(value);
  str = str.replace(/\r?\n|\r/g, " ");
  str = str.replace(/\s+/g, " ").trim();
  if (str.includes('"') && !str.includes('""')) str = str.replace(/"/g, '""');
  if (str.includes(",") || str.includes('"')) str = `"${str}"`;
  return str;
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
