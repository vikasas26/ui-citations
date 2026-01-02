import type { ChatMessage } from "../types/artifact";

interface Props {
  chatHistory: ChatMessage[];
  gifUrl?: string;
  timestampStart?: number;
  timestampEnd?: number;
}

export default function Transcript({
  chatHistory,
  gifUrl,
  timestampStart = 0,
  timestampEnd,
}: Props) {
  const isMessageActive = (msg: ChatMessage): boolean => {
    if (timestampEnd === undefined) return false;
    const msgStart = msg.timestamp_start ?? 0;
    const msgEnd = msg.timestamp_end ?? timestampEnd;
    return msgStart <= timestampEnd && msgEnd >= timestampStart;
  };

  return (
    <div className="flex h-full flex-col border-2 border-[#e5e7eb] rounded-lg bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-2 p-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 mb-3">
          <video
            src={gifUrl}
            loop
            autoPlay
            muted
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <h3 className="text-sm font-semibold text-[#1F2937]">
            STORMEE'S TRANSCRIPT
          </h3>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatHistory.map((msg, i) => {
          const isActive = isMessageActive(msg);

          return (
            <div
              key={i}
              className={`rounded-md px-3 py-2 text-sm leading-relaxed transition-colors ${
                isActive ? "bg-[#FEEF89]" : "bg-transparent"
              }`}
            >
              {msg.timestamp_start !== undefined && (
                <span className="mr-2 text-xs font-mono text-[#6B7280]">
                  {msg.timestamp_start.toFixed(2)}s
                </span>
              )}
              <span className="text-[#1F2937]">{msg.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
 
}
