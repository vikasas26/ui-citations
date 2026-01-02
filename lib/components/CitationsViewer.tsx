import Header from "./Header";
import Transcript from "./Transcript";
import KeyTakeaways from "./KeyTakeaways";
import type { CitationsViewerProps } from "../types/artifact"
import { AudioWaveform } from "./AudioWaveform";
import { useResolvedAudioUrl } from "../hooks/useResolvedAudioUrl";

export default function CitationsViewer({ artifact, onCloseHandler }: CitationsViewerProps) {
  const resolvedAudioUrl = useResolvedAudioUrl(artifact.fileUrl);

  if (!resolvedAudioUrl) {
    return <div className="p-4 text-sm">Loading audio…</div>;
  }

 const firstMessage = artifact.chatHistory[0];
 const timestampStart = firstMessage?.timestamp_start ?? 0;
 const timestampEnd = firstMessage?.timestamp_end;

const highlights =
  typeof timestampEnd === "number"
    ? [{ start: timestampStart, end: timestampEnd }]
    : [];


  return (
    <div className="flex flex-col bg-white w-full min-h-[500px]">
      <Header
        title={artifact.artifactTitle}
        gifUrl={artifact.gifUrl}
        airelevanceScore={artifact.airelavanceScore}
        onCloseHandler={onCloseHandler}
      />

      <div className="flex h-full overflow-hidden">
        <div className="w-1/2 flex flex-col pt-3 px-4 gap-y-3 ">
          <AudioWaveform
            src={resolvedAudioUrl}
            highlights={highlights}
            onTimeUpdate={() => {}}
            timestampStart={timestampStart}
            timestampEnd={timestampEnd}
            />

          <Transcript
            chatHistory={artifact.chatHistory}
            gifUrl={artifact.gifUrl}
            timestampStart={timestampStart}
            timestampEnd={timestampEnd}
          />
        </div>

        <div className="w-1/2 pl-1 pt-3 ">
          <KeyTakeaways
            takeaways={artifact.keyTakeaways}
            gifUrl={artifact.gifUrl}
          />
        </div>
      </div>
    </div>
  );
}
