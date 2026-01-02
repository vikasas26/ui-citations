export interface ChatMessage {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
  timestamp_start?: number;
  timestamp_end?: number;
}

export interface KeyTakeaway {
  takeawayId: string;
  name: string;
  content: string;
  keywords?:string[];
  emoji?: string;
  score?: number;
}

export interface ArtifactData {
  airelavanceScore?: number;
  gifUrl?: string;  
  artifactTitle: string;
  artifactSubTitle?: string;
  fileUrl: string;
  chatHistory: ChatMessage[];
  keyTakeaways: KeyTakeaway[];
}

export interface ThemeConfig {
  // Header styles
  headerBgColor?: string;
  headerTextColor?: string;
  headerTextSize?: string;
  headerPadding?: string;
  headerBorderColor?: string;
  
  // Panel styles
  panelBgColor?: string;
  panelTextColor?: string;
  panelPadding?: string;
  panelBorderColor?: string;
  
  // Typography
  titleFontSize?: string;
  titleFontWeight?: string;
  bodyFontSize?: string;
  bodyFontFamily?: string;
  
  // Colors
  primaryColor?: string;
  accentColor?: string;
  borderRadius?: string;
  
  // Specific component styling
  videoSize?: string;
  closeButtonSize?: string;
  closeButtonColor?: string;
}

export interface CitationsViewerProps {
  artifact: ArtifactData;
  onCloseHandler?: () => void;
  theme?: ThemeConfig;
}
