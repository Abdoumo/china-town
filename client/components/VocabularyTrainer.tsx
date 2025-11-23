import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, ChevronLeft, ChevronRight, Repeat2, Mic, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

interface VocabularyItem {
  id: string;
  character: string;
  pinyin: string;
  english: string;
  example: string;
  exampleTranslation: string;
}

interface VocabularyTrainerProps {
  vocabulary: VocabularyItem[];
}

export default function VocabularyTrainer({
  vocabulary,
}: VocabularyTrainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [speakingMode, setSpeakingMode] = useState<"character" | "pinyin" | null>(null);

  const speechRecognition = useSpeechRecognition();

  const current = vocabulary[currentIndex];

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = isFlipped ? 0.7 : 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeakCharacter = () => {
    setSpeakingMode("character");
    speechRecognition.startListening(current.character);
  };

  const handleSpeakPinyin = () => {
    setSpeakingMode("pinyin");
    speechRecognition.startListening(current.pinyin);
  };

  const SpeechResultDisplay = () => {
    if (!speechRecognition.result && !speechRecognition.error && !speechRecognition.isListening) {
      return null;
    }

    return (
      <div className="mt-4 p-4 rounded-lg border">
        {speechRecognition.isListening && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Listening...
            </div>
          </div>
        )}

        {speechRecognition.result && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {speechRecognition.result.isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={speechRecognition.result.isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {speechRecognition.result.isCorrect ? "Correct!" : "Incorrect"}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">You said:</p>
                <p className="font-medium">{speechRecognition.result.transcript}</p>
              </div>

              <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded">
                <span className="text-gray-600">Accuracy:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      speechRecognition.result.isCorrect ? "bg-green-500" : "bg-red-500"
                    )}
                    style={{ width: `${speechRecognition.result.accuracy}%` }}
                  />
                </div>
                <span className="font-semibold">{speechRecognition.result.accuracy}%</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => speechRecognition.clearResult()}
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        )}

        {speechRecognition.error && (
          <div className="text-red-600 text-sm">
            <p className="font-semibold">Error:</p>
            <p>{speechRecognition.error}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={viewMode === "card" ? "default" : "outline"}
          onClick={() => setViewMode("card")}
        >
          Flashcard
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          onClick={() => setViewMode("list")}
        >
          List
        </Button>
      </div>

      {viewMode === "card" ? (
        <div className="space-y-6">
          {/* Flashcard */}
          <div
            className={cn(
              "h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 cursor-pointer transform transition-transform duration-300 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl",
              isFlipped && "from-green-500 to-green-600"
            )}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {!isFlipped ? (
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold">{current.character}</div>
                <div className="text-xl">{current.pinyin}</div>
                <div className="text-sm opacity-75">Click to reveal</div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-2xl font-semibold">{current.english}</div>
                <div className="text-sm opacity-75">
                  Example: {current.example}
                </div>
                <div className="text-sm italic">
                  {current.exampleTranslation}
                </div>
              </div>
            )}
          </div>

          {/* Audio Controls */}
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              variant="outline"
              onClick={() => playAudio(current.character)}
              className="gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Character
            </Button>
            <Button
              variant="outline"
              onClick={() => playAudio(current.pinyin)}
              className="gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Pinyin
            </Button>
            <Button
              variant="outline"
              onClick={() => playAudio(current.english)}
              className="gap-2"
            >
              <Volume2 className="w-4 h-4" />
              English
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsFlipped(!isFlipped)}
              className="gap-2"
            >
              <Repeat2 className="w-4 h-4" />
              Flip
            </Button>

            {speechRecognition.isSupported && (
              <>
                <Button
                  variant={speakingMode === "character" ? "default" : "outline"}
                  onClick={handleSpeakCharacter}
                  disabled={speechRecognition.isListening}
                  className="gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Speak Character
                </Button>
                <Button
                  variant={speakingMode === "pinyin" ? "default" : "outline"}
                  onClick={handleSpeakPinyin}
                  disabled={speechRecognition.isListening}
                  className="gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Speak Pinyin
                </Button>
              </>
            )}
          </div>

          {/* Speech Recognition Result */}
          <SpeechResultDisplay />

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
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === vocabulary.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {vocabulary.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-colors",
                    index === currentIndex
                      ? "bg-blue-50 border-blue-300"
                      : "bg-gray-50 border-gray-200"
                  )}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsFlipped(false);
                    speechRecognition.clearResult();
                  }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="text-xl font-bold">{item.character}</div>
                      <div className="text-sm text-gray-600">{item.pinyin}</div>
                      <div className="text-sm mt-1">{item.english}</div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(item.character);
                        }}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      {speechRecognition.isSupported && index === currentIndex && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSpeakingMode("character");
                              speechRecognition.startListening(item.character);
                            }}
                            disabled={speechRecognition.isListening}
                          >
                            <Mic className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSpeakingMode("pinyin");
                              speechRecognition.startListening(item.pinyin);
                            }}
                            disabled={speechRecognition.isListening}
                          >
                            <Mic className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Speech Recognition Result for List View */}
          {currentIndex >= 0 && currentIndex < vocabulary.length && (
            <SpeechResultDisplay />
          )}
        </div>
      )}
    </div>
  );
}
