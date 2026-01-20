import { getApiBaseUrl } from "../config/apiConfig";

export async function getSignedUrl(gsutilUrl: string): Promise<string> {
  const res = await fetch(
    `${getApiBaseUrl()}/backend/gcs/get-signed-url/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        gsutil_url: gsutilUrl,
        expiration_hours: 3,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get signed URL");
  }

  const data = await res.json();
  return data.signed_url;
}
