import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  type?: "A" | "B" | "C" | "D" | "Quiz";
}

interface Session {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface LevelSection {
  level: "level1" | "level2" | "level3";
  title: string;
  sessions: Session[];
}

interface SidebarProps {
  levelSections: LevelSection[];
}

export default function Sidebar({ levelSections }: SidebarProps) {
  const location = useLocation();
  const [expandedLevel, setExpandedLevel] = useState<string>("level1");
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const getColorClasses = (level: "level1" | "level2" | "level3") => {
    const colorClass = level === "level1" ? "text-blue-600" :
                       level === "level2" ? "text-purple-600" :
                       "text-pink-600";

    const hoverBgClass = level === "level1" ? "hover:bg-blue-50 bg-blue-50" :
                         level === "level2" ? "hover:bg-purple-50 bg-purple-50" :
                         "hover:bg-pink-50 bg-pink-50";

    const textHoverClass = level === "level1" ? "text-blue-700" :
                           level === "level2" ? "text-purple-700" :
                           "text-pink-700";

    const levelBgClass = level === "level1" ? "bg-blue-50 border-blue-200" :
                         level === "level2" ? "bg-purple-50 border-purple-200" :
                         "bg-pink-50 border-pink-200";

    return { colorClass, hoverBgClass, textHoverClass, levelBgClass };
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 space-y-4 overflow-y-auto max-h-screen">
      <div className="px-4 py-2">
        <h1 className="text-xl font-bold text-gray-900">Learn Chinese</h1>
        <p className="text-xs text-gray-600 mt-1">All Levels</p>
      </div>

      <div className="space-y-4">
        {levelSections.map((section) => {
          const { colorClass, levelBgClass } = getColorClasses(section.level);
          const isExpanded = expandedLevel === section.level;

          return (
            <div key={section.level}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between text-left font-bold px-4 py-3 rounded-lg border",
                  levelBgClass
                )}
                onClick={() =>
                  setExpandedLevel(isExpanded ? "" : section.level)
                }
              >
                <span className={colorClass}>{section.title}</span>
                {isExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${colorClass}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${colorClass}`} />
                )}
              </Button>

              {isExpanded && (
                <div className="space-y-2 mt-2 ml-2">
                  {section.sessions.map((session) => (
                    <div key={session.id} className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 px-3 py-1">
                        {session.title}
                      </p>
                      {session.lessons.map((lesson) => {
                        const { hoverBgClass, textHoverClass } = getColorClasses(section.level);
                        return (
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
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
