import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface QuizOption {
  text: string;
  correct: boolean;
}

interface MatchingPair {
  prompt: string;
  answer: string;
  id: string;
}

interface QuizQuestion {
  id: string;
  type: string;
  question: string;
  options?: QuizOption[];
  pairs?: MatchingPair[];
}

interface QuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  onQuizComplete?: (score: number) => void;
}

export default function QuizEngine({ questions, title, onQuizComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">No questions available for this quiz.</p>
      </Card>
    );
  }

  const current = questions[currentIndex];
  const userAnswer = answers[current.id];

  const handleAnswer = (option: string) => {
    setAnswers({
      ...answers,
      [current.id]: option,
    });
  };

  const handleMatchingAnswer = (pairId: string, selectedAnswer: string) => {
    setMatchingAnswers({
      ...matchingAnswers,
      [pairId]: selectedAnswer,
    });
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
      if (onQuizComplete && finalScore === 100) {
        onQuizComplete(finalScore);
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const correctCount = questions.reduce((count, q) => {
    if (q.type === "matching" && q.pairs) {
      const correctMatches = q.pairs.filter((pair) => {
        return matchingAnswers[pair.id] === pair.answer;
      }).length;
      return count + (correctMatches === q.pairs.length ? 1 : 0);
    } else {
      const ans = answers[q.id];
      const option = q.options?.find((o) => o.text === ans);
      return count + (option?.correct ? 1 : 0);
    }
  }, 0);

  const score = Math.round((correctCount / questions.length) * 100);

  const isCurrentAnswered = () => {
    if (current.type === "matching") {
      return current.pairs?.every((p) => matchingAnswers[p.id]);
    } else {
      return !!userAnswer;
    }
  };

  const isCurrentCorrect = () => {
    if (current.type === "matching" && current.pairs) {
      return current.pairs.every((p) => matchingAnswers[p.id] === p.answer);
    } else {
      const ans = answers[current.id];
      const option = current.options?.find((o) => o.text === ans);
      return !!option?.correct;
    }
  };

  if (showResults) {
    return (
      <Card className="p-8 text-center space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-gray-600">
            You got {correctCount} out of {questions.length} correct
          </p>
        </div>

        <div className="flex justify-center">
          <div className="text-6xl font-bold text-blue-600">{score}%</div>
        </div>

        <div className="space-y-3">
          {questions.map((q) => {
            let isCorrect = false;

            if (q.type === "matching" && q.pairs) {
              isCorrect = q.pairs.every((p) => matchingAnswers[p.id] === p.answer);
            } else {
              const ans = answers[q.id];
              const option = q.options?.find((o) => o.text === ans);
              isCorrect = !!option?.correct;
            }

            return (
              <div key={q.id} className="text-left p-4 rounded-lg bg-gray-50">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{q.question}</p>
                    {q.type === "matching" && q.pairs ? (
                      <div className="mt-2 space-y-1">
                        {q.pairs.map((pair) => (
                          <div
                            key={pair.id}
                            className={`text-sm p-2 rounded ${
                              matchingAnswers[pair.id] === pair.answer
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <p>{pair.prompt} → {matchingAnswers[pair.id] || "Not answered"}</p>
                            {matchingAnswers[pair.id] !== pair.answer && (
                              <p className="text-xs mt-1">Correct: {pair.answer}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">
                        Your answer: {answers[q.id] || "Not answered"}
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
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${(currentIndex / questions.length) * 100}%`,
              }}
            />
          </div>

          <h4 className="text-base font-medium mt-6">{current.question}</h4>

          {current.type === "matching" && current.pairs ? (
            <div className="space-y-4 mt-6">
              {current.pairs.map((pair) => {
                const selectedAnswer = matchingAnswers[pair.id];
                const pairIsCorrect = selectedAnswer === pair.answer;
                const getUniqueAnswers = () => {
                  const answers = new Set(current.pairs!.map(p => p.answer));
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
            <div className="space-y-3 mt-6">
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
