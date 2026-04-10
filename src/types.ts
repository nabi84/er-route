export type Screen =
  | "preloading"
  | "preIntake"
  | "intake"
  | "intakeConfirm"
  | "loading"
  | "results"
  | "direction"
  | "saveSpot"
  | "infoSent"
  | "parkingInfo"
  | "reassurance";

export interface PatientContext {
  visitType: string;
  symptom: string;
  location: string;
}

export interface Recommendation {
  facilityName: string;
  rating: number;
  reviewCount: number;
  address: string;
  tags: string[];
  waitMinutes: number;
  timeToTreatmentMinutes: number;
}

export interface NavigationInfo {
  ctaTitle: string;
  etaLabel: string;
  driveTag: string;
  homeLabel: string;
  originLabel: string;
}

export interface SaveSpotPrompt {
  title: string;
  body: string;
}

export interface FlowState {
  screen: Screen;
  paused: boolean;
  isQaOverride: boolean;
}
