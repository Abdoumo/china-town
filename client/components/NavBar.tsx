import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Settings } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90">
          <BookOpen className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">汉语速成</h1>
            <p className="text-xs opacity-75">Short-Term Chinese</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-500 gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Progress
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-500 gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </nav>
  );
}
