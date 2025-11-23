import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface LessonProgress {
  lessonId: string;
  lessonTitle: string;
  completed: boolean;
  progress: number;
}

interface ProgressTrackerProps {
  lessons: LessonProgress[];
}

export default function ProgressTracker({ lessons }: ProgressTrackerProps) {
  const completedCount = lessons.filter((l) => l.completed).length;
  const totalCount = lessons.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">Your Progress</h3>
        <p className="text-sm text-gray-600">
          {completedCount} of {totalCount} lessons completed
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-semibold">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {lessons.map((lesson) => (
          <div key={lesson.lessonId} className="space-y-1">
            <div className="flex items-center gap-2">
              {lesson.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
              <span className="text-sm font-medium">{lesson.lessonTitle}</span>
            </div>
            <div className="ml-7 bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
