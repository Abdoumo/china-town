import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  english: string;
}

interface DialoguePlayerProps {
  title: string;
  lines: DialogueLine[];
}

export default function DialoguePlayer({
  title,
  lines,
}: DialoguePlayerProps) {
  const [viewMode, setViewMode] = useState<"chinese" | "pinyin" | "english">(
    "chinese"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    window.speechSynthesis.speak(utterance);
  };

  const playLine = (lineIndex: number) => {
    const line = lines[lineIndex];
    playAudio(line.chinese);
    setCurrentLine(lineIndex);
  };

  const playFullDialogue = async () => {
    setIsPlaying(true);
    for (let i = 0; i < lines.length; i++) {
      await new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(lines[i].chinese);
        utterance.lang = "zh-CN";
        utterance.onend = () => {
          setCurrentLine(i);
          resolve(null);
        };
        window.speechSynthesis.speak(utterance);
      });
    }
    setIsPlaying(false);
  };

  const getText = (line: DialogueLine) => {
    switch (viewMode) {
      case "pinyin":
        return line.pinyin;
      case "english":
        return line.english;
      default:
        return line.chinese;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        {/* View Mode Toggles */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button
            variant={viewMode === "chinese" ? "default" : "outline"}
            onClick={() => setViewMode("chinese")}
            size="sm"
          >
            中文
          </Button>
          <Button
            variant={viewMode === "pinyin" ? "default" : "outline"}
            onClick={() => setViewMode("pinyin")}
            size="sm"
          >
            Pinyin
          </Button>
          <Button
            variant={viewMode === "english" ? "default" : "outline"}
            onClick={() => setViewMode("english")}
            size="sm"
          >
            English
          </Button>
        </div>

        {/* Dialogue Display */}
        <Card className="p-6 space-y-4">
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border transition-colors cursor-pointer",
                currentLine === index
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-gray-200"
              )}
              onClick={() => playLine(index)}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-600 mb-2">
                    Speaker {line.speaker}
                  </div>
                  <div className="text-base font-medium">{getText(line)}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {line.pinyin === getText(line) ? line.english : line.pinyin}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    playLine(index);
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </Card>

        {/* Playback Controls */}
        <div className="flex gap-2 justify-center mt-6 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setCurrentLine(Math.max(0, currentLine - 1))}
            disabled={currentLine === 0}
          >
            <SkipBack className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={playFullDialogue}
            disabled={isPlaying}
            className="gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Playing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play All
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentLine(Math.min(lines.length - 1, currentLine + 1))}
            disabled={currentLine === lines.length - 1}
          >
            Next
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
