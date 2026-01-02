import type { ChatMessage, ThemeConfig } from "../types/artifact";

interface Props {
  messages: ChatMessage[];
  theme?: ThemeConfig;
}

export default function ChatHistory({ messages, theme }: Props) {
  return (
   <div
  className="border rounded-lg p-4 flex flex-col"
  style={{
    backgroundColor: theme?.panelBgColor || "#FFFFFF",
    borderColor: theme?.panelBorderColor || "#E5E7EB",
    color: theme?.panelTextColor || "#1F2937",
  }}
>
      <h3 className="font-semibold mb-3">Saved Conversation</h3>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {messages.map((msg, i) => (
          <div
  key={i}
  className="p-3 rounded-md leading-relaxed break-words"
  style={{
    backgroundColor:
      msg.role === "assistant"
        ? theme?.panelBgColor || "#FFFFFF"
        : theme?.accentColor || "#EFF6FF",
    color: theme?.panelTextColor || "#1F2937",
    fontSize: theme?.bodyFontSize || "0.875rem",
  }}
>

            <span className="font-semibold capitalize mr-1">
  {msg.role}:
</span>
          </div>
        ))}
      </div>
    </div>
  );
}
