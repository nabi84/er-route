export type VoiceScreenControls = {
  paused: boolean;
  onInterrupt: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
};
