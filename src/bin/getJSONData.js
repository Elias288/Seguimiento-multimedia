export async function getJSONData() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const datos = await res.json();
    // console.log(datos);

    return datos;
  } catch (error) {
    console.error("Error al cargar el JSON", error);
    return [];
  }
}
