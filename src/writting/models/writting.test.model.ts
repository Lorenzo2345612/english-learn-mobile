export interface Hint {
  word: string;
  definition: string;
  example: string;
  relatedWords: string[] | null;
}

export interface WrittingTestModel {
  songId: string;
  verseId: string;
  artist: string;
  title: string;
  verse: string;
  hints: Hint[];
  level: number;
}
