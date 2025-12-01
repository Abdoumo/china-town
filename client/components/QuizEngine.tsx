import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Volume2 } from "lucide-react";

interface QuizOption {
  text: string;
  correct: boolean;
}

interface MatchingPair {
  prompt: string;
  answer: string;
  id: string;
}

interface ReadingPassage {
  title?: string;
  text: string;
  questions?: Array<{
    id: string;
    question: string;
    options: QuizOption[];
  }>;
}

interface ListeningQuestion {
  audio?: string;
  transcript?: string;
  translation?: string;
  options?: QuizOption[];
}

interface FillInBlankQuestion {
  sentence: string;
  blank: string;
  options?: QuizOption[];
}

interface TranslationQuestion {
  english: string;
  chinese?: string;
  pinyin?: string;
  options?: QuizOption[];
}

interface QuizQuestion {
  id: string;
  type: "multipleChoice" | "matching" | "readingComprehension" | "listening" | "fillInBlank" | "translation" | "shortAnswer";
  question: string;
  options?: QuizOption[];
  pairs?: MatchingPair[];
  passage?: ReadingPassage;
  listening?: ListeningQuestion;
  fillInBlank?: FillInBlankQuestion;
  translation?: TranslationQuestion;
  shortAnswerOptions?: string[];
}

interface QuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  onQuizComplete?: (score: number) => void;
  hskLevel?: number;
  isFinalExam?: boolean;
}

export default function QuizEngine({ questions, title, onQuizComplete, hskLevel, isFinalExam }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const getQuestionKey = (index: number) => `question_${index}`;
  const getMatchingAnswerKey = (index: number, pairId: string) => `question_${index}_pair_${pairId}`;

  const getPassingScore = () => {
    if (!hskLevel) return 70;
    if (hskLevel === 1) return 70;
    if (hskLevel === 2) return 75;
    if (hskLevel === 3) return 80;
    if (hskLevel === 4) return 85;
    if (hskLevel === 5) return 90;
    if (hskLevel === 6) return 95;
    return 70;
  };

  const getDifficultyLabel = () => {
    if (!hskLevel) return "Standard";
    if (hskLevel === 1 || hskLevel === 2) return "Elementary";
    if (hskLevel === 3 || hskLevel === 4) return "Intermediate";
    return "Advanced";
  };

  const passingScore = getPassingScore();

  if (!questions || questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">No questions available for this quiz.</p>
      </Card>
    );
  }

  const current = questions[currentIndex];
  const questionKey = getQuestionKey(currentIndex);
  const userAnswer = answers[questionKey];

  const handleAnswer = (option: string) => {
    setAnswers({
      ...answers,
      [questionKey]: option,
    });
  };

  const handleMatchingAnswer = (pairId: string, selectedAnswer: string) => {
    const matchingKey = getMatchingAnswerKey(currentIndex, pairId);
    setMatchingAnswers({
      ...matchingAnswers,
      [matchingKey]: selectedAnswer,
    });
  };

  const handlePlayAudio = (audioId: string) => {
    setPlayingAudio(audioId);
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  const handleNext = () => {
    if (!isCurrentCorrect()) {
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setShowResults(true);
      if (onQuizComplete && finalScore >= passingScore) {
        onQuizComplete(finalScore);
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const isAnswerCorrect = (question: QuizQuestion, index: number, answer: string): boolean => {
    if (question.type === "matching" && question.pairs) {
      return question.pairs.every((p) => matchingAnswers[getMatchingAnswerKey(index, p.id)] === p.answer);
    } else if (question.type === "readingComprehension") {
      const option = question.passage?.questions?.[0]?.options?.find((o) => o.text === answer);
      return !!option?.correct;
    } else {
      const option = question.options?.find((o) => o.text === answer);
      return !!option?.correct;
    }
  };

  const correctCount = questions.reduce((count, q, index) => {
    const qKey = getQuestionKey(index);
    const answer = answers[qKey];
    if (isAnswerCorrect(q, index, answer)) {
      return count + 1;
    }
    return count;
  }, 0);

  const score = Math.round((correctCount / questions.length) * 100);

  const isCurrentAnswered = () => {
    if (current.type === "matching") {
      return current.pairs?.every((p) => matchingAnswers[getMatchingAnswerKey(currentIndex, p.id)]);
    } else {
      return !!userAnswer;
    }
  };

  const isCurrentCorrect = () => {
    return isAnswerCorrect(current, currentIndex, userAnswer);
  };

  if (showResults) {
    const passed = score >= passingScore;

    return (
      <Card className="p-8 text-center space-y-6">
        <div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                hskLevel
                  ? hskLevel <= 2
                    ? "bg-emerald-100 text-emerald-700"
                    : hskLevel <= 4
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {getDifficultyLabel()}
            </span>
          </div>
          <p className="text-gray-600">
            You got {correctCount} out of {questions.length} correct
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Passing score required: {passingScore}%
          </p>
        </div>

        <div className="flex justify-center">
          <div className={`text-6xl font-bold ${passed ? "text-green-600" : "text-red-600"}`}>
            {score}%
          </div>
        </div>

        {!passed && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">
              You need {passingScore}% or higher to pass.{" "}
              {isFinalExam ? "This is the final exam - please review the material and try again!" : "Please try again!"}
            </p>
          </div>
        )}

        {passed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              {isFinalExam
                ? `🎉 Excellent! You have successfully completed the HSK Level ${hskLevel} final exam!`
                : "Congratulations! You passed this lesson!"}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {questions.map((q, index) => {
            const qKey = getQuestionKey(index);
            const answer = answers[qKey];
            const isCorrect = isAnswerCorrect(q, index, answer);

            return (
              <div key={index} className="text-left p-4 rounded-lg bg-gray-50">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{q.question}</p>
                    {q.type === "matching" && q.pairs ? (
                      <div className="mt-2 space-y-1">
                        {q.pairs.map((pair) => (
                          <div
                            key={pair.id}
                            className={`text-xs p-2 rounded ${
                              matchingAnswers[getMatchingAnswerKey(index, pair.id)] === pair.answer
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <p>
                              {pair.prompt} →{" "}
                              {matchingAnswers[getMatchingAnswerKey(index, pair.id)] || "Not answered"}
                            </p>
                            {matchingAnswers[getMatchingAnswerKey(index, pair.id)] !== pair.answer && (
                              <p className="text-xs mt-1">Correct: {pair.answer}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 mt-1">
                        Your answer: {answer || "Not answered"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Retake Quiz
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{title}</h3>
              {hskLevel && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    hskLevel <= 2
                      ? "bg-emerald-100 text-emerald-700"
                      : hskLevel <= 4
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {getDifficultyLabel()} - {passingScore}% required
                </span>
              )}
            </div>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {current.type === "readingComprehension" && current.passage ? (
            <div className="space-y-4">
              {current.passage.title && (
                <h4 className="text-base font-semibold">{current.passage.title}</h4>
              )}
              <div className="p-4 bg-gray-100 rounded-lg text-sm leading-relaxed">
                {current.passage.text}
              </div>
              {current.passage.questions?.[0] && (
                <div>
                  <h5 className="font-medium mb-3">{current.passage.questions[0].question}</h5>
                  <div className="space-y-2">
                    {current.passage.questions[0].options?.map((option, index) => (
                      <Button
                        key={index}
                        variant={userAnswer === option.text ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleAnswer(option.text)}
                      >
                        <span className="flex items-center gap-3 w-full">
                          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option.text}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : current.type === "listening" ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="default"
                    className="gap-2"
                    onClick={() => handlePlayAudio(`audio-${currentIndex}`)}
                  >
                    <Volume2 className="w-4 h-4" />
                    {playingAudio === `audio-${currentIndex}` ? "Playing..." : "Play Audio"}
                  </Button>
                  {current.listening?.translation && (
                    <p className="text-sm text-gray-600">"{current.listening.translation}"</p>
                  )}
                </div>
              </div>
              {current.listening?.transcript && (
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-blue-600">
                    Show Transcript
                  </summary>
                  <p className="mt-2 p-2 bg-gray-100 rounded text-gray-700">
                    {current.listening.transcript}
                  </p>
                </details>
              )}
              <h4 className="text-base font-medium mt-4">{current.question}</h4>
              <div className="space-y-2">
                {current.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option.text ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleAnswer(option.text)}
                  >
                    <span className="flex items-center gap-3 w-full">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ) : current.type === "fillInBlank" && current.fillInBlank ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm leading-relaxed">
                  {current.fillInBlank.sentence.split("_____").map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < current.fillInBlank!.sentence.split("_____").length - 1 && (
                        <span className="font-bold text-blue-600">_____</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
              <h4 className="text-base font-medium">{current.question}</h4>
              <div className="space-y-2">
                {current.fillInBlank.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option.text ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleAnswer(option.text)}
                  >
                    <span className="flex items-center gap-3 w-full">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ) : current.type === "translation" && current.translation ? (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm font-medium text-amber-900">Translate the following:</p>
                <p className="text-lg font-semibold text-amber-900 mt-2">{current.translation.english}</p>
              </div>
              <h4 className="text-base font-medium">{current.question}</h4>
              <div className="space-y-2">
                {current.translation.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option.text ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleAnswer(option.text)}
                  >
                    <span className="flex items-center gap-3 w-full">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>
                        {option.text}
                        {option.text === current.translation?.chinese && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({current.translation?.pinyin})
                          </span>
                        )}
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ) : current.type === "matching" && current.pairs ? (
            <div className="space-y-4 mt-6">
              {current.pairs.map((pair) => {
                const selectedAnswer = matchingAnswers[getMatchingAnswerKey(currentIndex, pair.id)];
                const pairIsCorrect = selectedAnswer === pair.answer;
                const getUniqueAnswers = () => {
                  const answers = new Set(current.pairs!.map((p) => p.answer));
                  return Array.from(answers);
                };

                return (
                  <div key={pair.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-gray-700">{pair.prompt}</p>
                      {selectedAnswer && (
                        pairIsCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {getUniqueAnswers().map((answer) => (
                        <Button
                          key={`${pair.id}-${answer}`}
                          onClick={() => handleMatchingAnswer(pair.id, answer)}
                          className={`text-xs h-auto py-2 transition-all ${
                            selectedAnswer === answer
                              ? pairIsCorrect
                                ? "bg-green-600 hover:bg-green-700 text-white border-green-700"
                                : "bg-red-600 hover:bg-red-700 text-white border-red-700"
                              : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                          }`}
                          variant={selectedAnswer === answer ? "default" : "outline"}
                        >
                          {answer}
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h4 className="text-base font-medium mt-6 mb-4">{current.question}</h4>
              <div className="space-y-3">
                {current.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option.text ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleAnswer(option.text)}
                  >
                    <span className="flex items-center gap-3 w-full">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        {isCurrentAnswered() && !isCurrentCorrect() && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-700 font-medium">Incorrect answer. Please try again.</span>
          </div>
        )}
        {isCurrentCorrect() && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700 font-medium">Correct! You can proceed.</span>
          </div>
        )}
        <div className="flex gap-2 justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isCurrentCorrect()}
            className={isCurrentCorrect() ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
