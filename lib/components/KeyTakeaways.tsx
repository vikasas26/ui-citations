import type { KeyTakeaway } from "../types/artifact";

interface Props {
  takeaways: KeyTakeaway[];
  gifUrl?: string;
}

export default function KeyTakeaways({ takeaways, gifUrl }: Props) {

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#1F2937]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

  return (
    <div className="flex h-full flex-col border border-[#e5e7eb] rounded-lg bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-2 p-4 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-2 mb-4">
          <video
            src={gifUrl}
            loop
            autoPlay
            muted
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <h3 className="text-sm font-semibold text-[#1F2937]">
            Extracted Takeaways
          </h3>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {takeaways.map((t) => (
          <div
            key={t.takeawayId}
            className="p-3 rounded-md  bg-white"
          >
            <div className="flex items-start gap-2 text-sm font-medium mb-1 text-[#1F2937]">
              {t.emoji && <span>{t.emoji}</span>}
              <span>{t.name}</span>
            </div>

            <p className="leading-relaxed break-words text-sm text-[#4B5563]">
                {renderBoldText(t.content)}
            </p>

            {t.keywords && t.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {t.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
