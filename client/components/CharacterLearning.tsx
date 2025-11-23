import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Character {
  id: string;
  character: string;
  pinyin: string;
  meaning: string;
  radical: string;
  radicalMeaning: string;
  strokeCount: number;
  strokeOrder: string[];
}

interface CharacterLearningProps {
  characters: Character[];
}

export default function CharacterLearning({
  characters,
}: CharacterLearningProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [strokeIndex, setStrokeIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [characterInput, setCharacterInput] = useState("");
  const [pinyinInput, setPinyinInput] = useState("");
  const [characterFeedback, setCharacterFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [pinyinFeedback, setPinyinFeedback] = useState<"correct" | "incorrect" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const current = characters[currentIndex];

  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStrokeIndex(0);
      clearCanvas();
      resetInputs();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setStrokeIndex(0);
      clearCanvas();
      resetInputs();
    }
  };

  const resetInputs = () => {
    setCharacterInput("");
    setPinyinInput("");
    setCharacterFeedback(null);
    setPinyinFeedback(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    // Account for scaling between display size and internal canvas size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleNextStroke = () => {
    if (strokeIndex < current.strokeCount - 1) {
      setStrokeIndex(strokeIndex + 1);
    }
  };

  const validateCharacter = () => {
    const isCorrect = characterInput.trim() === current.character;
    setCharacterFeedback(isCorrect ? "correct" : "incorrect");
    return isCorrect;
  };

  const validatePinyin = () => {
    const normalizedInput = pinyinInput.toLowerCase().trim();
    const normalizedTarget = current.pinyin.toLowerCase().trim();
    const isCorrect = normalizedInput === normalizedTarget;
    setPinyinFeedback(isCorrect ? "correct" : "incorrect");
    return isCorrect;
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Character Display */}
        <Card className="p-8 flex flex-col items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="text-7xl font-bold text-blue-600">
              {current.character}
            </div>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Pinyin:</span> {current.pinyin}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Meaning:</span> {current.meaning}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Radical:</span> {current.radical}{" "}
                ({current.radicalMeaning})
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Stroke Count:</span>{" "}
                {current.strokeCount}
              </p>
            </div>
          </div>
        </Card>

        {/* Stroke Order */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Stroke Order</h3>
          <div className="bg-gray-50 p-4 rounded-lg min-h-32 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Stroke {strokeIndex + 1} of {current.strokeCount}
              </p>
              <p className="text-2xl font-semibold">
                {current.strokeOrder[strokeIndex] || ""}
              </p>
            </div>
          </div>
          <Button
            onClick={handleNextStroke}
            disabled={strokeIndex >= current.strokeCount - 1}
            className="w-full"
          >
            Next Stroke
          </Button>
        </Card>
      </div>

      {/* Handwriting Canvas */}
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Handwriting Practice</h3>
          <p className="text-sm text-gray-600 mb-4">
            Draw the character {current.character} on the canvas below
          </p>
        </div>
        <div className="bg-white border-2 border-gray-300 rounded-lg p-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            className="cursor-crosshair w-full"
            style={{ display: "block" }}
          />
        </div>
        <Button
          onClick={clearCanvas}
          variant="outline"
          className="w-full gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </Card>

      {/* Character & Pinyin Practice */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Character Input */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Character Practice</h3>
            <p className="text-sm text-gray-600 mb-4">
              Type the character: <span className="font-bold text-lg">{current.character}</span>
            </p>
          </div>
          <input
            type="text"
            value={characterInput}
            onChange={(e) => {
              setCharacterInput(e.target.value);
              setCharacterFeedback(null);
            }}
            placeholder={`Type: ${current.character}`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                validateCharacter();
              }
            }}
          />
          <Button
            onClick={validateCharacter}
            className="w-full"
            variant={characterFeedback === null ? "default" : characterFeedback === "correct" ? "outline" : "destructive"}
          >
            Check Character
          </Button>

          {characterFeedback && (
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-lg",
              characterFeedback === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            )}>
              {characterFeedback === "correct" ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-semibold">Try again</span>
                </>
              )}
            </div>
          )}
        </Card>

        {/* Pinyin Input */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Pinyin Practice</h3>
            <p className="text-sm text-gray-600 mb-4">
              Type the pinyin: <span className="font-bold text-lg">{current.pinyin}</span>
            </p>
          </div>
          <input
            type="text"
            value={pinyinInput}
            onChange={(e) => {
              setPinyinInput(e.target.value);
              setPinyinFeedback(null);
            }}
            placeholder={`Type: ${current.pinyin}`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                validatePinyin();
              }
            }}
          />
          <Button
            onClick={validatePinyin}
            className="w-full"
            variant={pinyinFeedback === null ? "default" : pinyinFeedback === "correct" ? "outline" : "destructive"}
          >
            Check Pinyin
          </Button>

          {pinyinFeedback && (
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-lg",
              pinyinFeedback === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            )}>
              {pinyinFeedback === "correct" ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-semibold">Try again</span>
                </>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <span className="text-sm text-gray-600 self-center">
          {currentIndex + 1} / {characters.length}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === characters.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
