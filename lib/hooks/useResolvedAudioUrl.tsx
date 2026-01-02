import { useEffect, useState } from "react";
import { getSignedUrl } from "./getSignedUrl";

export function useResolvedAudioUrl(fileUrl: string) {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!fileUrl) return;

    let cancelled = false;

    async function resolve() {
      try {
        // HTTPS → use directly
        if (fileUrl.startsWith("http")) {
          if (!cancelled) setResolvedUrl(fileUrl);
          return;
        }

        // GS → signed URL
        if (fileUrl.startsWith("gs://")) {
          const signed = await getSignedUrl(fileUrl);
          if (!cancelled) setResolvedUrl(signed);
        }
      } catch (err) {
        console.error("Failed to resolve audio URL", err);
        if (!cancelled) setResolvedUrl(null);
      }
    }

    resolve();

    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  return resolvedUrl;
}
