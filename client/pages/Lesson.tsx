import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import VocabularyTrainer from "@/components/VocabularyTrainer";
import DialoguePlayer from "@/components/DialoguePlayer";
import CharacterLearning from "@/components/CharacterLearning";
import QuizEngine from "@/components/QuizEngine";
import ProgressTracker from "@/components/ProgressTracker";
import { useLevel } from "@/contexts/LevelContext";
import { getLessonByLevelAndId, getLevelSessions, getHSKLesson, getHSKLevelSessions, getHSKFinalExamQuestions } from "@/utils/levelsLoader";
import { Card } from "@/components/ui/card";

interface LessonProps {
  isHSK?: boolean;
}

export default function Lesson({ isHSK = false }: LessonProps) {
  const { lessonId, hskLevel } = useParams<{ lessonId: string; hskLevel: string }>();
  const { selectedLevel, setSelectedLevel } = useLevel();
  const [detectedLevel, setDetectedLevel] = useState(selectedLevel);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const isFinalExam = lessonId === 'final-exam';

  // Effect to detect and update level based on lesson ID
  useEffect(() => {
    if (isHSK && hskLevel) {
      setDetectedLevel(`hsk${hskLevel}` as any);
      setSelectedLevel(`hsk${hskLevel}` as any);
    } else if (lessonId) {
      const lessonNum = parseInt(lessonId.replace('lesson', ''));
      let newLevel: typeof selectedLevel = selectedLevel;

      if (lessonNum >= 1 && lessonNum <= 15) {
        newLevel = 'level1';
      } else if (lessonNum >= 16 && lessonNum <= 30) {
        newLevel = 'level2';
      } else if (lessonNum >= 31 && lessonNum <= 45) {
        newLevel = 'level3';
      } else if (lessonNum >= 46 && lessonNum <= 60) {
        newLevel = 'level4';
      }

      setDetectedLevel(newLevel);
      if (newLevel !== selectedLevel) {
        setSelectedLevel(newLevel);
      }
    }
  }, [lessonId, hskLevel, isHSK, selectedLevel, setSelectedLevel]);

  let lessonData: any = null;

  if (isFinalExam && isHSK && hskLevel) {
    const finalExamQuestions = getHSKFinalExamQuestions(hskLevel);
    lessonData = {
      id: 'final-exam',
      sessionId: 'final-exam',
      title: `HSK Level ${hskLevel} - Final Exam`,
      englishTitle: 'Comprehensive Final Examination',
      pageNumber: 0,
      difficulty: 'HSK',
      vocabulary: [],
      dialogue: { title: '', lines: [] },
      grammar: [],
      characters: [],
      exercises: [],
      quiz: {
        title: `HSK Level ${hskLevel} - Final Exam`,
        questions: finalExamQuestions,
      },
    };
  } else if (isHSK && hskLevel) {
    lessonData = getHSKLesson(hskLevel, parseInt(lessonId?.replace('lesson', '') || '0'));
  } else {
    lessonData = lessonId ? getLessonByLevelAndId(detectedLevel, lessonId) : null;
  }

  let SESSIONS: any[] = [];
  if (isHSK && hskLevel) {
    SESSIONS = getHSKLevelSessions(hskLevel);
  } else {
    SESSIONS = getLevelSessions(detectedLevel);
  }

  useEffect(() => {
    const stored = localStorage.getItem("completedLessons");
    if (stored) {
      try {
        const completed = JSON.parse(stored);
        setCompletedLessons(new Set(completed));
      } catch (e) {
        console.error("Failed to parse completed lessons", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(Array.from(completedLessons)));
  }, [completedLessons]);

  const handleQuizComplete = (score: number) => {
    if (lessonId && score >= 70) {
      setCompletedLessons((prev) => new Set([...prev, lessonId]));
    }
  };

  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Lesson not found</h1>
          <p className="text-gray-600">Please select a lesson from the sidebar</p>
        </div>
      </div>
    );
  }

  const progressLessons = SESSIONS.flatMap((s) =>
    s.lessons.map((l) => ({
      lessonId: l.id,
      lessonTitle: l.title,
      completed: completedLessons.has(l.id),
      progress: completedLessons.has(l.id) ? 100 : 0,
    }))
  );

  // Create level sections for sidebar - show all HSK levels, filtered based on what's available
  const allHSKLevels = [
    { number: "1", title: "HSK Level 1" },
    { number: "2", title: "HSK Level 2" },
    { number: "3", title: "HSK Level 3" },
    { number: "4", title: "HSK Level 4" },
    { number: "5", title: "HSK Level 5" },
    { number: "6", title: "HSK Level 6" },
  ];

  const levelSections = isHSK ? allHSKLevels.map(hsk => ({
    level: `hsk${hsk.number}` as any,
    title: hsk.title,
    sessions: getHSKLevelSessions(hsk.number),
    isHSK: true,
  })).filter((section) => section.sessions.length > 0) : [
    {
      level: "level1" as const,
      title: "Threshold Level 1",
      sessions: getLevelSessions("level1"),
    },
    {
      level: "level2" as const,
      title: "Threshold Level 2",
      sessions: getLevelSessions("level2"),
    },
    {
      level: "level3" as const,
      title: "Threshold Level 3",
      sessions: getLevelSessions("level3"),
    },
    {
      level: "level4" as const,
      title: "Threshold Level 4",
      sessions: getLevelSessions("level4"),
    },
  ].filter((section) => section.sessions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex">
        <Sidebar levelSections={levelSections} />
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {lessonData.title}
              </h1>
              <p className="text-lg text-gray-600">{lessonData.englishTitle}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {isFinalExam ? (
                  <div className="space-y-6">
                    <Card className="p-6 border-2 border-emerald-200 bg-emerald-50">
                      <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                        {lessonData.quiz.title}
                      </h2>
                      <p className="text-emerald-700">
                        This comprehensive final exam covers all vocabulary, grammar, and concepts from this HSK level. Answer all questions correctly to demonstrate mastery.
                      </p>
                    </Card>
                    {lessonData.quiz.questions.length > 0 ? (
                      <QuizEngine
                        questions={lessonData.quiz.questions}
                        title={lessonData.quiz.title}
                        onQuizComplete={handleQuizComplete}
                        hskLevel={isHSK && hskLevel ? parseInt(hskLevel) : undefined}
                        isFinalExam={true}
                      />
                    ) : (
                      <p className="text-gray-600">
                        No questions available for this final exam yet
                      </p>
                    )}
                  </div>
                ) : (
                  <Tabs defaultValue="vocabulary" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                      <TabsTrigger value="dialogue">Dialogue</TabsTrigger>
                      <TabsTrigger value="characters">Characters</TabsTrigger>
                      <TabsTrigger value="grammar">Grammar</TabsTrigger>
                      <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    </TabsList>

                    <TabsContent value="vocabulary" className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">Vocabulary</h2>
                        <VocabularyTrainer vocabulary={lessonData.vocabulary} />
                      </div>
                    </TabsContent>

                    <TabsContent value="dialogue" className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">Dialogue</h2>
                        <DialoguePlayer
                          title={lessonData.dialogue.title}
                          lines={lessonData.dialogue.lines}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="characters" className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">
                          Character Learning
                        </h2>
                        {lessonData.characters && lessonData.characters.length > 0 ? (
                          <CharacterLearning characters={lessonData.characters} />
                        ) : (
                          <p className="text-gray-600">
                            No characters for this lesson
                          </p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="grammar" className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">
                          Grammar Points
                        </h2>
                        <div className="space-y-4">
                          {lessonData.grammar && lessonData.grammar.length > 0 ? (
                            lessonData.grammar.map((point, index) => (
                              <div
                                key={index}
                                className="bg-white p-6 rounded-lg border border-gray-200"
                              >
                                <h3 className="font-bold text-lg mb-2">
                                  {point.point}
                                </h3>
                                <p className="text-gray-700 mb-3">
                                  {point.explanation}
                                </p>
                                <div className="bg-blue-50 p-3 rounded">
                                  <p className="font-mono text-blue-900">
                                    {point.example}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {point.translation}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-600">
                              No grammar points for this lesson
                            </p>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="quiz" className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">
                          {lessonData.quiz.title}
                        </h2>
                        {lessonData.quiz.questions.length > 0 ? (
                          <QuizEngine
                            questions={lessonData.quiz.questions}
                            title={lessonData.quiz.title}
                            onQuizComplete={handleQuizComplete}
                            hskLevel={isHSK && hskLevel ? parseInt(hskLevel) : undefined}
                          />
                        ) : (
                          <p className="text-gray-600">
                            No quiz questions available yet
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>

              <div className="lg:col-span-1">
                <ProgressTracker lessons={progressLessons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
