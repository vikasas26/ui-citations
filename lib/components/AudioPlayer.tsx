import { useRef } from "react";
import type { ThemeConfig } from "../types/artifact";

interface Props {
  src: string;
  theme?: ThemeConfig;
}

export default function AudioPlayer({ src, theme }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);


 return (
  <div
    className="p-4 h-[300px] border rounded-lg max-w-full overflow-hidden"
    style={{
      backgroundColor: theme?.panelBgColor || "white",
      borderColor: theme?.panelBorderColor || "#d1d5db",
    }}
  >
    <audio
      ref={audioRef}
      controls
      src={src}
      preload="metadata"
      className="w-full max-w-full"
    />
  </div>
);

}
