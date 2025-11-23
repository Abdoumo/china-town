import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLevel, getLevelColor, getLevelInfo } from "@/contexts/LevelContext";

interface Lesson {
  id: string;
  title: string;
  type: "A" | "B" | "C" | "D" | "Quiz";
}

interface Session {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface SidebarProps {
  sessions: Session[];
}

export default function Sidebar({ sessions }: SidebarProps) {
  const location = useLocation();
  const { selectedLevel } = useLevel();
  const levelColors = getLevelColor(selectedLevel);
  const levelInfo = getLevelInfo(selectedLevel);
  const [expandedSession, setExpandedSession] = useState<string | null>(
    sessions[0]?.id || null
  );

  const colorClass = selectedLevel === "level1" ? "text-blue-600" :
                     selectedLevel === "level2" ? "text-purple-600" :
                     "text-pink-600";

  const hoverBgClass = selectedLevel === "level1" ? "hover:bg-blue-50 bg-blue-50" :
                       selectedLevel === "level2" ? "hover:bg-purple-50 bg-purple-50" :
                       "hover:bg-pink-50 bg-pink-50";

  const textHoverClass = selectedLevel === "level1" ? "text-blue-700" :
                         selectedLevel === "level2" ? "text-purple-700" :
                         "text-pink-700";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 space-y-4 overflow-y-auto max-h-screen">
      <div className="px-4 py-2">
        <h1 className={`text-xl font-bold ${colorClass}`}>Learn Chinese</h1>
        <p className="text-xs text-gray-600 mt-1">{levelInfo.title}</p>
      </div>

      <div className="space-y-2">
        {sessions.map((session) => (
          <div key={session.id}>
            <Button
              variant="ghost"
              className="w-full justify-between text-left font-semibold"
              onClick={() =>
                setExpandedSession(
                  expandedSession === session.id ? null : session.id
                )
              }
            >
              <span>{session.title}</span>
              {expandedSession === session.id ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            {expandedSession === session.id && (
              <div className="ml-2 space-y-1 mt-2">
                {session.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${lesson.id}`}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm transition-colors",
                      location.pathname.includes(lesson.id)
                        ? `${hoverBgClass} ${textHoverClass} font-semibold`
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {lesson.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
