import { ThresholdLevel } from "@/contexts/LevelContext";
import { LessonData } from "./lessonLoader";

// Level 1 lessons
import level1_lesson1 from "@/data/lessons/level1/lesson1.json";
import level1_lesson2 from "@/data/lessons/level1/lesson2.json";
import level1_lesson3 from "@/data/lessons/level1/lesson3.json";
import level1_lesson4 from "@/data/lessons/level1/lesson4.json";
import level1_lesson5 from "@/data/lessons/level1/lesson5.json";
import level1_lesson6 from "@/data/lessons/level1/lesson6.json";
import level1_lesson7 from "@/data/lessons/level1/lesson7.json";
import level1_lesson8 from "@/data/lessons/level1/lesson8.json";
import level1_lesson9 from "@/data/lessons/level1/lesson9.json";
import level1_lesson10 from "@/data/lessons/level1/lesson10.json";
import level1_lesson11 from "@/data/lessons/level1/lesson11.json";
import level1_lesson12 from "@/data/lessons/level1/lesson12.json";
import level1_lesson13 from "@/data/lessons/level1/lesson13.json";
import level1_lesson14 from "@/data/lessons/level1/lesson14.json";
import level1_lesson15 from "@/data/lessons/level1/lesson15.json";

// Level 2 lessons
import level2_lesson16 from "@/data/lessons/level2/lesson16.json";
import level2_lesson17 from "@/data/lessons/level2/lesson17.json";
import level2_lesson18 from "@/data/lessons/level2/lesson18.json";
import level2_lesson19 from "@/data/lessons/level2/lesson19.json";
import level2_lesson20 from "@/data/lessons/level2/lesson20.json";
import level2_lesson21 from "@/data/lessons/level2/lesson21.json";
import level2_lesson22 from "@/data/lessons/level2/lesson22.json";
import level2_lesson23 from "@/data/lessons/level2/lesson23.json";
import level2_lesson24 from "@/data/lessons/level2/lesson24.json";
import level2_lesson25 from "@/data/lessons/level2/lesson25.json";
import level2_lesson26 from "@/data/lessons/level2/lesson26.json";
import level2_lesson27 from "@/data/lessons/level2/lesson27.json";
import level2_lesson28 from "@/data/lessons/level2/lesson28.json";
import level2_lesson29 from "@/data/lessons/level2/lesson29.json";
import level2_lesson30 from "@/data/lessons/level2/lesson30.json";

// Level 3 lessons - Add imports here as files are created
// import level3_lesson1 from "@/data/lessons/level3/lesson1.json";
// etc...

const level1Lessons: Record<string, LessonData> = {
  lesson1: level1_lesson1 as LessonData,
  lesson2: level1_lesson2 as LessonData,
  lesson3: level1_lesson3 as LessonData,
  lesson4: level1_lesson4 as LessonData,
  lesson5: level1_lesson5 as LessonData,
  lesson6: level1_lesson6 as LessonData,
  lesson7: level1_lesson7 as LessonData,
  lesson8: level1_lesson8 as LessonData,
  lesson9: level1_lesson9 as LessonData,
  lesson10: level1_lesson10 as LessonData,
  lesson11: level1_lesson11 as LessonData,
  lesson12: level1_lesson12 as LessonData,
  lesson13: level1_lesson13 as LessonData,
  lesson14: level1_lesson14 as LessonData,
  lesson15: level1_lesson15 as LessonData,
};

// Level 2 lessons structure
const level2Lessons: Record<string, LessonData> = {
  lesson16: level2_lesson16 as LessonData,
  lesson17: level2_lesson17 as LessonData,
  lesson18: level2_lesson18 as LessonData,
  lesson19: level2_lesson19 as LessonData,
  lesson20: level2_lesson20 as LessonData,
  lesson21: level2_lesson21 as LessonData,
  lesson22: level2_lesson22 as LessonData,
  lesson23: level2_lesson23 as LessonData,
  lesson24: level2_lesson24 as LessonData,
  lesson25: level2_lesson25 as LessonData,
  lesson26: level2_lesson26 as LessonData,
  lesson27: level2_lesson27 as LessonData,
  lesson28: level2_lesson28 as LessonData,
  lesson29: level2_lesson29 as LessonData,
  lesson30: level2_lesson30 as LessonData,
};

// Level 3 lessons structure - will be filled with data
const level3Lessons: Record<string, LessonData> = {
  // Add Level 3 lessons here
};

export function getLessonsByLevel(level: ThresholdLevel): Record<string, LessonData> {
  switch (level) {
    case "level1":
      return level1Lessons;
    case "level2":
      return level2Lessons;
    case "level3":
      return level3Lessons;
  }
}

export function getLessonByLevelAndId(level: ThresholdLevel, lessonId: string): LessonData | null {
  const lessons = getLessonsByLevel(level);
  return lessons[lessonId] || null;
}

export function getLevelSessions(level: ThresholdLevel) {
  const lessons = getLessonsByLevel(level);

  // Group lessons into sessions (every 3-5 lessons per session)
  const sessions: any[] = [];
  let currentSession: any = null;
  let sessionIndex = 0;

  Object.entries(lessons).forEach(([lessonId, lesson], index) => {
    if (!currentSession || currentSession.lessons.length >= 3) {
      if (currentSession) sessions.push(currentSession);

      sessionIndex++;
      currentSession = {
        id: `session${sessionIndex}`,
        title: `Session ${sessionIndex}`,
        lessons: [],
      };
    }

    currentSession.lessons.push({
      id: lessonId,
      title: lesson.title,
    });
  });

  if (currentSession) sessions.push(currentSession);

  return sessions;
}
