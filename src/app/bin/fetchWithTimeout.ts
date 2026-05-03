export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 5000,
) {
  const controller = new AbortController();

  const id = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Timeout de la API");
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}
