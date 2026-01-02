<<<<<<< HEAD
# ui-citations

A plug-and-play React + TypeScript component to display **audio citations**, **transcripts**, and **AI-extracted key takeaways** in a clean, card-style UI.

The library automatically:
- Resolves `gs://` (Google Cloud Storage) audio URLs to signed URLs
- Renders audio waveform with highlighted timestamp ranges
- Displays transcript and key takeaways
- Ships with full TypeScript support

---

## ✨ Features

- ✅ Automatic GCS (`gs://`) → signed URL resolution  
- 🎧 Audio waveform with timestamp highlights  
- 📝 Transcript viewer  
- 💡 Key takeaways with `**bold**` text support  
- 🧩 Fully typed (TypeScript)  
- 🎨 Includes ready-to-use CSS  

---

## 📦 Installation

```bash
npm install ui-citations
```

or

```bash
yarn add ui-citations
```

---

## 🎨 Import Styles (Required)

```ts
import "ui-citations/ui-citations.css";
```

> ⚠️ Styles will not apply unless this CSS file is imported.

---

## 🚀 Basic Usage

```tsx
import { useState } from "react";
import { CitationsViewer, type ArtifactData } from "ui-citations";
import "ui-citations/ui-citations.css";

export default function App() {
  const [open, setOpen] = useState(true);

  const artifact: ArtifactData = {
    airelavanceScore: 0,
    gifUrl: "",
    artifactTitle: "",
    fileUrl: "",
    chatHistory: [],
    keyTakeaways: [],
  };

  return (
    <>
      {open && (
        <CitationsViewer
          artifact={artifact}
          onCloseHandler={() => setOpen(false)}
        />
      )}
    </>
  );
}
```

---

## 🧩 ArtifactData Format

This is the complete TypeScript shape expected by the component.  
You can start with empty values and populate later.

```ts
export interface ArtifactData {
  airelavanceScore: number;
  gifUrl: string;
  artifactTitle: string;
  fileUrl: string; // https:// or gs://

  chatHistory: {
    role: "assistant" | "user";
    message: string;
    timestamp: string;
    timestamp_start?: number;
    timestamp_end?: number;
  }[];

  keyTakeaways: {
    takeawayId: string;
    name: string;
    content: string; // Supports **bold**
    emoji?: string;
    keywords?: string[];
  }[];
}
```

---

## 🎧 Audio URL Support

You can pass **either** a public URL:

```ts
fileUrl: "https://example.com/audio.mp3"
```

or a Google Cloud Storage path:

```ts
fileUrl: "gs://your-bucket/path/audio.mp3"
```

👉 `gs://` URLs are **automatically converted to signed URLs internally**.  
No manual signing required.

---

## 🧠 Notes

- Timestamp ranges in `chatHistory` are used to highlight the audio waveform
- `**double asterisks**` inside key takeaways render as **bold**
- Ideal for dashboards, modals, or side panels

---

## 📄 License

MIT
