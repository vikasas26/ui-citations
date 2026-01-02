import { X } from "lucide-react";
import type { ThemeConfig } from "../types/artifact";

interface Props {
  airelevanceScore?: number;
  gifUrl?: string;
  title: string;
  onCloseHandler?: () => void;
  theme?: ThemeConfig;
}

export default function Header({
  title,
  gifUrl,
  airelevanceScore,
  onCloseHandler,
}: Props) {
  return (
    <div className="flex items-center rounded-lg justify-between px-4 py-3 border-b bg-[#F3F1F8] border-[#E5E7EB]">
      {/* LEFT: Video + Title */}
      <div className="flex items-center gap-2">
        {gifUrl && (
          <video
            src={gifUrl}
            loop
            autoPlay
            muted
            playsInline
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        )}
        <h2 className="text-lg font-semibold text-[#1F2937]">
          {title}
        </h2>
      </div>

      {/* RIGHT: AI relevance + Close */}
      <div className="flex items-center gap-3">
        {airelevanceScore !== undefined && (
          <span className="px-4 py-1 text-sm font-medium rounded-full border border-[#A855F7] bg-white text-[#1F2937] whitespace-nowrap">
            ✨ AI Relevance: {airelevanceScore}%
          </span>
        )}

        <div onClick={onCloseHandler}>
          <X className="cursor-pointer h-6 w-6 text-[#6B7280]" />
        </div>
      </div>
    </div>
  );
}
