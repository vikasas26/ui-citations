import { useState } from "react";
import { CitationsViewer } from "ui-citations";
import type { ArtifactData } from "ui-citations";

export default function App() {
  const [open, setOpen] = useState(false);

  const artifact: ArtifactData = {
    airelavanceScore: 85,
    gifUrl:
      "https://storage.googleapis.com/stormee_static_files/ai_speaking.mp4",
    artifactTitle: "Live Brainstorm",
    fileUrl:"gs://client-creative-workspace/projects/6943c316dad7ab366f65f4a1/session_merged_audio_6943fd7f12be2d12d6b4c7ac_cf9f190d5c3846e9982d5ddc868d9bad.mp3",
    chatHistory: [
      {
        role: "assistant",
        message: "Hello this is a test audio file",
        timestamp: new Date().toISOString(),
        timestamp_start: 37.2,
        timestamp_end: 63.2,
      },
    ],
    keyTakeaways: [
      {
        takeawayId: "1",
        name: "Feature Spec",
        content:
          "Application for **college** and **school** students. Attendance tracking and insights.",
        keywords: ["attendance", "students"],
        emoji: "💡",
      },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          gap: 20,
          padding: 20,
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          width: 900,
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1 }}>
          <h1>Live Brainstorm</h1>
          <p style={{ color: "#6B7280" }}>
            AI-generated discussion summary
          </p>

          <button
            onClick={() => setOpen(true)}
            style={{
              color: "#2563EB",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            View citations →
          </button>
        </div>

        {/* RIGHT */}
        {open && (
          <div
            style={{
              flex: 2,
              borderLeft: "1px solid #E5E7EB",
              paddingLeft: 20,
            }}
          >
            <CitationsViewer
              artifact={artifact}
              onCloseHandler={() => setOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
