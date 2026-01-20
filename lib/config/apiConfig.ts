let API_BASE_URL = "";

export function setApiBaseUrl(url: string) {
  API_BASE_URL = url.replace(/\/$/, ""); // remove trailing slash
}

export function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "API base URL not set. Call setApiBaseUrl() before using the library."
    );
  }
  return API_BASE_URL;
}
