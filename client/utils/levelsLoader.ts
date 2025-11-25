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

// Level 3 lessons
import level3_lesson31 from "@/data/lessons/level3/lesson31.json";
import level3_lesson32 from "@/data/lessons/level3/lesson32.json";
import level3_lesson33 from "@/data/lessons/level3/lesson33.json";
import level3_lesson34 from "@/data/lessons/level3/lesson34.json";
import level3_lesson35 from "@/data/lessons/level3/lesson35.json";
import level3_lesson36 from "@/data/lessons/level3/lesson36.json";
import level3_lesson37 from "@/data/lessons/level3/lesson37.json";
import level3_lesson38 from "@/data/lessons/level3/lesson38.json";
import level3_lesson39 from "@/data/lessons/level3/lesson39.json";
import level3_lesson40 from "@/data/lessons/level3/lesson40.json";
import level3_lesson41 from "@/data/lessons/level3/lesson41.json";
import level3_lesson42 from "@/data/lessons/level3/lesson42.json";
import level3_lesson43 from "@/data/lessons/level3/lesson43.json";
import level3_lesson44 from "@/data/lessons/level3/lesson44.json";
import level3_lesson45 from "@/data/lessons/level3/lesson45.json";

// Level 4 lessons
import level4_lesson46 from "@/data/lessons/level4/lesson46.json";
import level4_lesson47 from "@/data/lessons/level4/lesson47.json";
import level4_lesson48 from "@/data/lessons/level4/lesson48.json";
import level4_lesson49 from "@/data/lessons/level4/lesson49.json";
import level4_lesson50 from "@/data/lessons/level4/lesson50.json";
import level4_lesson51 from "@/data/lessons/level4/lesson51.json";
import level4_lesson52 from "@/data/lessons/level4/lesson52.json";
import level4_lesson53 from "@/data/lessons/level4/lesson53.json";
import level4_lesson54 from "@/data/lessons/level4/lesson54.json";
import level4_lesson55 from "@/data/lessons/level4/lesson55.json";
import level4_lesson56 from "@/data/lessons/level4/lesson56.json";
import level4_lesson57 from "@/data/lessons/level4/lesson57.json";
import level4_lesson58 from "@/data/lessons/level4/lesson58.json";
import level4_lesson59 from "@/data/lessons/level4/lesson59.json";
import level4_lesson60 from "@/data/lessons/level4/lesson60.json";

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

// Level 3 lessons structure
const level3Lessons: Record<string, LessonData> = {
  lesson31: level3_lesson31 as LessonData,
  lesson32: level3_lesson32 as LessonData,
  lesson33: level3_lesson33 as LessonData,
  lesson34: level3_lesson34 as LessonData,
  lesson35: level3_lesson35 as LessonData,
  lesson36: level3_lesson36 as LessonData,
  lesson37: level3_lesson37 as LessonData,
  lesson38: level3_lesson38 as LessonData,
  lesson39: level3_lesson39 as LessonData,
  lesson40: level3_lesson40 as LessonData,
  lesson41: level3_lesson41 as LessonData,
  lesson42: level3_lesson42 as LessonData,
  lesson43: level3_lesson43 as LessonData,
  lesson44: level3_lesson44 as LessonData,
  lesson45: level3_lesson45 as LessonData,
};

// Level 4 lessons structure
const level4Lessons: Record<string, LessonData> = {
  lesson46: level4_lesson46 as LessonData,
  lesson47: level4_lesson47 as LessonData,
  lesson48: level4_lesson48 as LessonData,
  lesson49: level4_lesson49 as LessonData,
  lesson50: level4_lesson50 as LessonData,
  lesson51: level4_lesson51 as LessonData,
  lesson52: level4_lesson52 as LessonData,
  lesson53: level4_lesson53 as LessonData,
  lesson54: level4_lesson54 as LessonData,
  lesson55: level4_lesson55 as LessonData,
  lesson56: level4_lesson56 as LessonData,
  lesson57: level4_lesson57 as LessonData,
  lesson58: level4_lesson58 as LessonData,
  lesson59: level4_lesson59 as LessonData,
  lesson60: level4_lesson60 as LessonData,
};

export function getLessonsByLevel(level: ThresholdLevel): Record<string, LessonData> {
  switch (level) {
    case "level1":
      return level1Lessons;
    case "level2":
      return level2Lessons;
    case "level3":
      return level3Lessons;
    case "level4":
      return level4Lessons;
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
