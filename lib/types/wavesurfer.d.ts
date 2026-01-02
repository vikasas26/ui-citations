declare module "wavesurfer.js" {
  export interface WaveSurferOptions {
    container: HTMLElement;
    url?: string;
    waveColor?: string;
    progressColor?: string;
    cursorColor?: string;
    barWidth?: number;
    barRadius?: number;
    height?: number;
    normalize?: boolean;
    peaks?: Float32Array[];
    duration?: number;
    plugins?: any[];
  }

  export interface WaveSurferPlugin {
    destroy?: () => void;
    clearRegions?: () => void;
    addRegion?: (options: any) => void;
  }

  export interface WaveSurferInstance {
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    destroy(): void;
    on(event: string, cb: (...args: any[]) => void): void;
    seekTo(progress: number): void;
    getDuration(): number;

    /** ✅ THIS IS WHAT YOU WERE MISSING */
    registerPlugin<T extends WaveSurferPlugin>(plugin: T): T;
  }

  const WaveSurfer: {
    create(options: WaveSurferOptions): WaveSurferInstance;
  };

  export default WaveSurfer;
}
