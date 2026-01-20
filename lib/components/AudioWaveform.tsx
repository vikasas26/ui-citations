import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";


type WS = ReturnType<typeof WaveSurfer.create>;

// Convert GCS URL (gs://) to public HTTPS URL
function convertGcsToHttps(url: string): string {
  if (url.startsWith('gs://')) {
    // Convert gs://bucket/path to https://storage.googleapis.com/bucket/path
    const path = url.replace('gs://', '');
    return `https://storage.googleapis.com/${path}`;
  }
  return url;
}

interface HighlightSegment {
  start: number;
  end: number;
  color?: string;
}

interface AudioWaveformProps {
  src: string;
  peaks?: number[];
  duration?: number;
  highlights?: HighlightSegment[];
  onTimeUpdate?: (time: number) => void;
  timestampStart?: number;
  timestampEnd?: number;
}

export function AudioWaveform({
  src,
  highlights = [],
  onTimeUpdate,
  timestampStart = 0,
  timestampEnd,
}: AudioWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WS | null>(null);
  const regionsRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [totalTime, setTotalTime] = useState("00:00:00");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let ws: WS | null = null;
    let aborted = false;

    const initWaveSurfer = () => {
      try {
        setError(null);
        setIsLoading(true);
        
        // Convert GCS URL to HTTPS if needed
        const audioUrl = convertGcsToHttps(src);
        console.log("Original URL:", src);
        console.log("Converted URL:", audioUrl);
        
        // Create WaveSurfer with direct URL - let the browser handle CORS
       ws = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: "#D0D5DD",
            progressColor: "#9CA3AF",
            cursorColor: "#6B7280",
            barWidth: 2,
            barRadius: 3,
            height: 72,
            normalize: true,
            url: audioUrl,
        });

waveRef.current = ws;
regionsRef.current = ws.registerPlugin(RegionsPlugin.create());



        ws.on("ready", () => {
          if (aborted) return;
          const d = ws!.getDuration();
          console.log("WaveSurfer ready, duration:", d);
          setTotalTime(formatTime(d));
          setError(null);
          setIsLoading(false);

          // Render timestamp range highlight if provided
          if (timestampEnd !== undefined && timestampEnd > timestampStart && regionsRef.current) {
            regionsRef.current.addRegion({
              start: timestampStart,
              end: timestampEnd,
              color: "rgb(254, 239, 137)", // Yellow highlight
              drag: false,
              resize: false,
            });
            console.log(`Added timestamp region: ${timestampStart}s - ${timestampEnd}s`);
          }

          // Render additional highlights if provided
          if (highlights.length > 0 && regionsRef.current) {
            highlights.forEach((h) => {
              regionsRef.current.addRegion({
                start: h.start,
                end: h.end,
                color: h.color ?? "rgb(254, 239, 137)",
                drag: false,
                resize: false,
              });
            });
          }
        });

        ws.on("error", (error: any) => {
          if (aborted) return;
          console.error("WaveSurfer error:", error);
          const errorMsg = error?.message ? String(error.message) : 'Unknown error';
          setError("Audio preview unavailable");
          setIsLoading(false);
        });

        ws.on("audioprocess", (time : any) => {
          setCurrentTime(formatTime(time));
          onTimeUpdate?.(time);
    
          // Stop playback if we're past the timestamp_end
          if (timestampEnd !== undefined && time >= timestampEnd && ws!.isPlaying()) {
            ws!.pause();
            ws!.seekTo(timestampStart / ws!.getDuration()); // Reset to start of range
            console.log("Reached end of timestamp range, pausing playback");
          }
        });

        ws.on("play", () => setIsPlaying(true));
        ws.on("pause", () => setIsPlaying(false));

      } catch (err: any) {
        if (aborted) return;
        console.error("Failed to create WaveSurfer:", err);
        const errorMsg = err?.message ? String(err.message) : String(err);
        setError(`Failed to initialize audio player: ${errorMsg}`);
        setIsLoading(false);
      }
    };

    initWaveSurfer();

    return () => {
      aborted = true;
      if (waveRef.current) {
        waveRef.current.destroy();
      }
    };
  }, [src, highlights, onTimeUpdate, timestampStart, timestampEnd]);

  const togglePlay = () => {
    if (!waveRef.current) return;
    
    if(waveRef.current.isPlaying()) {
      waveRef.current.pause();
    } else {
      // If we have a timestamp range, start from the beginning of the range
      if (timestampEnd !== undefined) {
        waveRef.current.seekTo(timestampStart / waveRef.current.getDuration());
      }
      waveRef.current.play();
    }
  };
console.log("AudioWaveform src:", src);

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white py-8 px-4 max-w-full overflow-hidden">
      {error && (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Audio preview is unavailable for this item.
        </div>
      )}
      {isLoading && !error && (
        <div className="mb-3 p-2 bg-blue-100 text-blue-700 text-sm rounded">
          Loading audio...
        </div>
      )}
    {!error && (
      <div className="flex gap-4 items-start">
        <button
          onClick={togglePlay}
          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
          style={{ 
            backgroundColor: '#FFFFFF',
            border: 'none'
          }}
          disabled={!!error || isLoading}
        >
          {isPlaying ? (
            <Pause size={20} color="#6B7280" fill="#6B7280" />
          ) : (
            <Play size={20} color="#6B7280" fill="#6B7280" />
          )}
        </button>

        <div ref={containerRef} className="flex-1 max-w-full overflow-hidden" style={{
    height: 72,
    minHeight: 72,
    maxHeight: 72,
  }}/>

      </div>
      )}

      <div className="mt-2 text-sm text-gray-600">
        {currentTime} / {totalTime}
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
export default AudioWaveform;