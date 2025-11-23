// Import all lesson data
import lesson1 from "@/data/lessons/level1/lesson1.json";
import lesson2 from "@/data/lessons/level1/lesson2.json";
import lesson3 from "@/data/lessons/level1/lesson3.json";
import lesson4 from "@/data/lessons/level1/lesson4.json";
import lesson5 from "@/data/lessons/level1/lesson5.json";
import lesson6 from "@/data/lessons/level1/lesson6.json";
import lesson7 from "@/data/lessons/level1/lesson7.json";
import lesson8 from "@/data/lessons/level1/lesson8.json";
import lesson9 from "@/data/lessons/level1/lesson9.json";
import lesson10 from "@/data/lessons/level1/lesson10.json";
import lesson11 from "@/data/lessons/level1/lesson11.json";
import lesson12 from "@/data/lessons/level1/lesson12.json";
import lesson13 from "@/data/lessons/level1/lesson13.json";
import lesson14 from "@/data/lessons/level1/lesson14.json";
import lesson15 from "@/data/lessons/level1/lesson15.json";

export interface Vocabulary {
  id: string;
  character: string;
  pinyin: string;
  english: string;
  partOfSpeech?: string;
  example: string;
  exampleTranslation: string;
}

export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  english: string;
}

export interface Dialogue {
  title: string;
  lines: DialogueLine[];
}

export interface GrammarPoint {
  point: string;
  explanation: string;
  example: string;
  translation: string;
}

export interface Character {
  id: string;
  character: string;
  pinyin: string;
  meaning: string;
  radical: string;
  radicalMeaning: string;
  strokeCount: number;
  strokeOrder: string[];
}

export interface Exercise {
  id: string;
  type: string;
  title: string;
  pairs?: Array<{ chinese: string; english: string; id: string }>;
  options?: Array<{ text: string; correct: boolean }>;
  sentence?: string;
  answer?: string;
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  type: string;
  question: string;
  options?: Array<{ text: string; correct: boolean }>;
  pairs?: Array<{ prompt: string; answer: string; id: string }>;
}

export interface LessonData {
  id: string;
  sessionId: string;
  title: string;
  englishTitle: string;
  pageNumber: number;
  difficulty: string;
  objectives?: string[];
  vocabulary: Vocabulary[];
  dialogue: Dialogue;
  grammar: GrammarPoint[];
  characters: Character[];
  exercises: Exercise[];
  quiz: {
    title: string;
    questions: QuizQuestion[];
  };
}

const lessonsData: Record<string, LessonData> = {
  lesson1: lesson1 as LessonData,
  lesson2: lesson2 as LessonData,
  lesson3: lesson3 as LessonData,
  lesson4: lesson4 as LessonData,
  lesson5: lesson5 as LessonData,
  lesson6: lesson6 as LessonData,
  lesson7: lesson7 as LessonData,
  lesson8: lesson8 as LessonData,
  lesson9: lesson9 as LessonData,
  lesson10: lesson10 as LessonData,
  lesson11: lesson11 as LessonData,
  lesson12: lesson12 as LessonData,
  lesson13: lesson13 as LessonData,
  lesson14: lesson14 as LessonData,
  lesson15: lesson15 as LessonData,
};

export function getLesson(lessonId: string): LessonData | null {
  return lessonsData[lessonId] || null;
}

export function getAllLessons(): Record<string, LessonData> {
  return lessonsData;
}
