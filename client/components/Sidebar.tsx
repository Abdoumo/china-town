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
  level: "level1" | "level2" | "level3" | "level4" | string;
  title: string;
  sessions: Session[];
  isHSK?: boolean;
}

interface SidebarProps {
  levelSections: LevelSection[];
}

export default function Sidebar({ levelSections }: SidebarProps) {
  const location = useLocation();
  const [expandedLevel, setExpandedLevel] = useState<string>("level1");
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const getColorClasses = (level: string) => {
    let colorClass = "text-blue-600";
    let hoverBgClass = "hover:bg-blue-50 bg-blue-50";
    let textHoverClass = "text-blue-700";
    let levelBgClass = "bg-blue-50 border-blue-200";

    if (level === "level1") {
      colorClass = "text-blue-600";
      hoverBgClass = "hover:bg-blue-50 bg-blue-50";
      textHoverClass = "text-blue-700";
      levelBgClass = "bg-blue-50 border-blue-200";
    } else if (level === "level2") {
      colorClass = "text-purple-600";
      hoverBgClass = "hover:bg-purple-50 bg-purple-50";
      textHoverClass = "text-purple-700";
      levelBgClass = "bg-purple-50 border-purple-200";
    } else if (level === "level3") {
      colorClass = "text-pink-600";
      hoverBgClass = "hover:bg-pink-50 bg-pink-50";
      textHoverClass = "text-pink-700";
      levelBgClass = "bg-pink-50 border-pink-200";
    } else if (level === "level4") {
      colorClass = "text-orange-600";
      hoverBgClass = "hover:bg-orange-50 bg-orange-50";
      textHoverClass = "text-orange-700";
      levelBgClass = "bg-orange-50 border-orange-200";
    } else if (level?.startsWith("hsk")) {
      colorClass = "text-emerald-600";
      hoverBgClass = "hover:bg-emerald-50 bg-emerald-50";
      textHoverClass = "text-emerald-700";
      levelBgClass = "bg-emerald-50 border-emerald-200";
    }

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
                        const hskLevel = section.isHSK ? section.level.replace('hsk', '') : null;
                        let linkPath = '';

                        if (hskLevel) {
                          if (lesson.id === 'final-exam') {
                            linkPath = `/hsk/${hskLevel}/final-exam`;
                          } else {
                            linkPath = `/hsk/${hskLevel}/${lesson.id}`;
                          }
                        } else {
                          linkPath = `/lesson/${lesson.id}`;
                        }

                        return (
                          <Link
                            key={lesson.id}
                            to={linkPath}
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
