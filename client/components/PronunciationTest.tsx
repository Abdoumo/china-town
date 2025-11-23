import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Mic, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

interface VocabularyItem {
  id: string;
  character: string;
  pinyin: string;
  english: string;
}

interface PronunciationTestProps {
  vocabulary: VocabularyItem[];
  onClose: () => void;
}

export default function PronunciationTest({
  vocabulary,
  onClose,
}: PronunciationTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testResults, setTestResults] = useState<
    Array<{
      id: string;
      userSaid: string;
      accuracy: number;
      correct: boolean;
    }>
  >([]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [speakingMode, setSpeakingMode] = useState<"character" | "pinyin" | null>(null);

  const speechRecognition = useSpeechRecognition();

  if (!vocabulary || vocabulary.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">No vocabulary items available.</p>
      </div>
    );
  }

  const current = vocabulary[currentIndex];
  const currentResult = testResults.find((r) => r.id === current.id);

  const playAudio = (text: string, type: "character" | "pinyin") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  };

  const calculateAccuracy = (userInput: string, expected: string): number => {
    const userLower = userInput.toLowerCase().trim();
    const expectedLower = expected.toLowerCase().trim();

    if (userLower === expectedLower) return 100;

    const maxLength = Math.max(userLower.length, expectedLower.length);
    let matches = 0;

    for (let i = 0; i < Math.min(userLower.length, expectedLower.length); i++) {
      if (userLower[i] === expectedLower[i]) matches++;
    }

    return Math.round((matches / maxLength) * 100);
  };

  const handleTestCharacter = () => {
    setSpeakingMode("character");
    speechRecognition.startListening(current.character);
  };

  const handleTestPinyin = () => {
    setSpeakingMode("pinyin");
    speechRecognition.startListening(current.pinyin);
  };

  const recordResult = (mode: "character" | "pinyin") => {
    if (!speechRecognition.result) return;

    const userSaid = speechRecognition.result.transcript;
    const expected = mode === "character" ? current.character : current.pinyin;
    const accuracy = calculateAccuracy(userSaid, expected);
    const isCorrect = accuracy >= 80;

    const newResult = {
      id: current.id,
      userSaid,
      accuracy,
      correct: isCorrect,
    };

    const existingIndex = testResults.findIndex((r) => r.id === current.id);
    if (existingIndex >= 0) {
      const updated = [...testResults];
      updated[existingIndex] = newResult;
      setTestResults(updated);
    } else {
      setTestResults([...testResults, newResult]);
    }
  };

  const handleNext = () => {
    if (speechRecognition.result) {
      recordResult(speakingMode || "pinyin");
    }

    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSpeakingMode(null);
      speechRecognition.clearResult();
    } else {
      setIsTestComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSpeakingMode(null);
      speechRecognition.clearResult();
    }
  };

  const completedCount = testResults.filter((r) => r.correct).length;
  const averageAccuracy = testResults.length > 0
    ? Math.round(testResults.reduce((sum, r) => sum + r.accuracy, 0) / testResults.length)
    : 0;

  if (isTestComplete) {
    return (
      <div className="space-y-6">
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Pronunciation Test Complete! 🎉</h2>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600">Words Passed</p>
                <p className="text-3xl font-bold text-green-600">{completedCount}/{testResults.length}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600">Average Accuracy</p>
                <p className="text-3xl font-bold text-blue-600">{averageAccuracy}%</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600">Pass Rate</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round((completedCount / testResults.length) * 100)}%
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-lg">Results</h3>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {testResults.map((result) => {
                  const vocab = vocabulary.find((v) => v.id === result.id);
                  return (
                    <div
                      key={result.id}
                      className="p-3 bg-white rounded border flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{vocab?.character}</p>
                        <p className="text-sm text-gray-600">
                          You said: "{result.userSaid}" (Accuracy: {result.accuracy}%)
                        </p>
                      </div>
                      {result.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0);
                  setTestResults([]);
                  setIsTestComplete(false);
                  setSpeakingMode(null);
                  speechRecognition.clearResult();
                }}
              >
                Retake Test
              </Button>
              <Button onClick={onClose}>Back to Vocabulary</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Question {currentIndex + 1} of {vocabulary.length}
          </span>
          <span className="text-blue-600 font-semibold">
            {testResults.filter((r) => r.correct).length} correct
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Test Card */}
      <Card className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <div className="text-center space-y-6">
          <div>
            <p className="text-sm opacity-75 mb-2">Pronounce this character:</p>
            <div className="text-6xl font-bold mb-4">{current.character}</div>
            <div className="text-xl">{current.pinyin}</div>
          </div>

          {/* Audio Controls */}
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => playAudio(current.character, "character")}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Hear Character
            </Button>
            <Button
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => playAudio(current.pinyin, "pinyin")}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Hear Pinyin
            </Button>
          </div>

          {/* Recording Prompt */}
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm mb-3">Click below to record your pronunciation:</p>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={handleTestCharacter}
                disabled={speechRecognition.isListening}
                className={cn(
                  "gap-2",
                  speakingMode === "character"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-white hover:bg-gray-100"
                )}
              >
                <Mic className="w-4 h-4" />
                <span className={speakingMode === "character" ? "text-white" : "text-gray-900"}>
                  {speakingMode === "character" && speechRecognition.isListening
                    ? "Recording..."
                    : "Record Character"}
                </span>
              </Button>
              <Button
                onClick={handleTestPinyin}
                disabled={speechRecognition.isListening}
                className={cn(
                  "gap-2",
                  speakingMode === "pinyin"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-white hover:bg-gray-100"
                )}
              >
                <Mic className="w-4 h-4" />
                <span className={speakingMode === "pinyin" ? "text-white" : "text-gray-900"}>
                  {speakingMode === "pinyin" && speechRecognition.isListening
                    ? "Recording..."
                    : "Record Pinyin"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Display */}
      {currentResult && (
        <Card className="p-6 border-2" style={{
          borderColor: currentResult.correct ? '#10b981' : '#ef4444'
        }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {currentResult.correct ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <p className={cn(
                "font-semibold mb-2",
                currentResult.correct ? "text-green-600" : "text-red-600"
              )}>
                {currentResult.correct ? "Great job!" : "Keep practicing!"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                You said: <span className="font-medium text-gray-900">"{currentResult.userSaid}"</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Accuracy:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      currentResult.correct ? "bg-green-500" : "bg-orange-500"
                    )}
                    style={{ width: `${currentResult.accuracy}%` }}
                  />
                </div>
                <span className="font-semibold">{currentResult.accuracy}%</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-4 justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          {currentIndex + 1} / {vocabulary.length}
        </span>
        <Button
          onClick={handleNext}
          disabled={!currentResult}
        >
          {currentIndex === vocabulary.length - 1 ? "Complete Test" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Close Button */}
      <div className="flex justify-center pt-4 border-t">
        <Button variant="ghost" onClick={onClose}>
          Exit Test
        </Button>
      </div>
    </div>
  );
}
