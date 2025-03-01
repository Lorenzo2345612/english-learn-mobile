export interface Correction {
  error: string;
  explanation: string;
  solution: string;
}

export interface ReviewResponse {
  user_version: string;
  corrected_version: string;
  corrections: Correction[];
  topics_to_review: string[];
  accuracy: number;
}
