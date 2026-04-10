import type { NavigationInfo, PatientContext, Recommendation, SaveSpotPrompt } from "../types";

export const patientContext: PatientContext = {
  visitType: "Child",
  symptom: "Fever",
  location: "Apopka, FL"
};

export const recommendation: Recommendation | null = {
  facilityName: "AdventHealth Apopka ER",
  rating: 4.5,
  reviewCount: 57,
  address: "2100 Ocoee Apopka Rd, Apopka, FL 32703",
  tags: ["Pediatric", "8 min drive"],
  waitMinutes: 18,
  timeToTreatmentMinutes: 23
};

export const navigationInfo: NavigationInfo = {
  ctaTitle: "Start navigation to AdventHealth Apopka ER",
  etaLabel: "Estimated arrival 6:02 PM",
  driveTag: "8 min drive",
  homeLabel: "Your home",
  originLabel: "2100 Ocoee Apopka Rd, Apopka, FL 32712"
};

export const saveSpotPrompt: SaveSpotPrompt = {
  title: "Save your spot",
  body: "A few more details can help speed up your check-in."
};

export const liveSpeechTranscript =
  "My child has a high fever all night and she won’t stop crying...";
