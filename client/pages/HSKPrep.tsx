import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Volume2,
  Users,
  Zap,
  Check,
  ArrowRight,
  MessageCircle,
  Pen,
  Award,
  LogOut,
  BarChart3,
  Target,
  Clock,
} from "lucide-react";
import { useLevel, getLevelColor, getLevelInfo } from "@/contexts/LevelContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const hskLevels = [
  { id: "hsk1", number: 1, title: "HSK Level 1", subtitle: "Elementary", words: "150 words", lessonRange: "61-65" },
  { id: "hsk2", number: 2, title: "HSK Level 2", subtitle: "Elementary", words: "300 words", lessonRange: "66-70" },
  { id: "hsk3", number: 3, title: "HSK Level 3", subtitle: "Intermediate", words: "600 words", lessonRange: "71-75" },
  { id: "hsk4", number: 4, title: "HSK Level 4", subtitle: "Intermediate", words: "1200 words", lessonRange: "76-80" },
  { id: "hsk5", number: 5, title: "HSK Level 5", subtitle: "Advanced", words: "2500 words", lessonRange: "81-85" },
  { id: "hsk6", number: 6, title: "HSK Level 6", subtitle: "Advanced", words: "5000+ words", lessonRange: "86-90" },
];

const hskFeatures = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Official HSK Standards",
    description: "Aligned with official Hanyu Shuiping Kaoshi exam requirements",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Timed Practice Tests",
    description: "Complete mock exams with time limits to simulate real test conditions",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Detailed Analytics",
    description: "Track your progress with comprehensive statistics and weak areas",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Certification Prep",
    description: "Master all vocabulary and grammar required for certification",
  },
];

export default function HSKPrep() {
  const { selectedLevel, setSelectedLevel } = useLevel();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedHSK, setSelectedHSK] = useState<string>("hsk1");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentHSK = hskLevels.find((h) => h.id === selectedHSK) || hskLevels[0];
  
  const getHSKColor = (hskId: string) => {
    switch (hskId) {
      case "hsk1":
        return { bg: "bg-emerald-50", text: "text-emerald-600", button: "bg-emerald-500 hover:bg-emerald-600", border: "border-emerald-300", gradient: "from-emerald-900 via-slate-900 to-slate-900" };
      case "hsk2":
        return { bg: "bg-teal-50", text: "text-teal-600", button: "bg-teal-500 hover:bg-teal-600", border: "border-teal-300", gradient: "from-teal-900 via-slate-900 to-slate-900" };
      case "hsk3":
        return { bg: "bg-cyan-50", text: "text-cyan-600", button: "bg-cyan-500 hover:bg-cyan-600", border: "border-cyan-300", gradient: "from-cyan-900 via-slate-900 to-slate-900" };
      case "hsk4":
        return { bg: "bg-sky-50", text: "text-sky-600", button: "bg-sky-500 hover:bg-sky-600", border: "border-sky-300", gradient: "from-sky-900 via-slate-900 to-slate-900" };
      case "hsk5":
        return { bg: "bg-indigo-50", text: "text-indigo-600", button: "bg-indigo-500 hover:bg-indigo-600", border: "border-indigo-300", gradient: "from-indigo-900 via-slate-900 to-slate-900" };
      case "hsk6":
        return { bg: "bg-violet-50", text: "text-violet-600", button: "bg-violet-500 hover:bg-violet-600", border: "border-violet-300", gradient: "from-violet-900 via-slate-900 to-slate-900" };
      default:
        return { bg: "bg-emerald-50", text: "text-emerald-600", button: "bg-emerald-500 hover:bg-emerald-600", border: "border-emerald-300", gradient: "from-emerald-900 via-slate-900 to-slate-900" };
    }
  };

  const colors = getHSKColor(selectedHSK);
  const badgeColors = selectedHSK === "hsk1" ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300" :
                      selectedHSK === "hsk2" ? "bg-teal-500/20 border-teal-400/30 text-teal-300" :
                      selectedHSK === "hsk3" ? "bg-cyan-500/20 border-cyan-400/30 text-cyan-300" :
                      selectedHSK === "hsk4" ? "bg-sky-500/20 border-sky-400/30 text-sky-300" :
                      selectedHSK === "hsk5" ? "bg-indigo-500/20 border-indigo-400/30 text-indigo-300" :
                      "bg-violet-500/20 border-violet-400/30 text-violet-300";

  const startLesson = (hskNumber: number) => {
    navigate(`/hsk/${hskNumber}/lesson1`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-bold text-white">HSK Preparation</h1>
              <p className="text-xs text-emerald-200">Official Exam Preparation</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              Back to Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -top-40 -left-40" />
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -bottom-40 -right-40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-block">
              <span className={`px-4 py-2 border rounded-full text-sm font-medium ${badgeColors}`}>
                {currentHSK.title} • {currentHSK.subtitle}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Official HSK Exam{" "}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                selectedHSK === "hsk1" || selectedHSK === "hsk2" ? "from-emerald-400 via-teal-400 to-emerald-300" :
                selectedHSK === "hsk3" || selectedHSK === "hsk4" ? "from-cyan-400 via-sky-400 to-cyan-300" :
                "from-indigo-400 via-violet-400 to-indigo-300"
              }`}>
                Preparation
              </span>
            </h2>

            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Master all vocabulary, grammar, and test-taking strategies for the official Hanyu Shuiping Kaoshi (HSK) certification exam. {currentHSK.words} vocabulary, 5 comprehensive lessons, and full exam simulation.
            </p>

            {/* HSK Level Selector */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-emerald-200 text-sm font-medium mb-4">Choose Your HSK Level</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {hskLevels.map((level) => (
                  <Button
                    key={level.id}
                    onClick={() => setSelectedHSK(level.id)}
                    variant={selectedHSK === level.id ? "default" : "outline"}
                    className={
                      selectedHSK === level.id
                        ? level.id === "hsk1"
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : level.id === "hsk2"
                          ? "bg-teal-500 hover:bg-teal-600"
                          : level.id === "hsk3"
                          ? "bg-cyan-500 hover:bg-cyan-600"
                          : level.id === "hsk4"
                          ? "bg-sky-500 hover:bg-sky-600"
                          : level.id === "hsk5"
                          ? "bg-indigo-500 hover:bg-indigo-600"
                          : "bg-violet-500 hover:bg-violet-600"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }
                    size="sm"
                  >
                    HSK {level.number}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{currentHSK.words}</div>
              <p className="text-sm text-emerald-200">Vocabulary</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">5</div>
              <p className="text-sm text-emerald-200">Lessons</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">100%</div>
              <p className="text-sm text-emerald-200">Coverage</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">∞</div>
              <p className="text-sm text-emerald-200">Practice Tests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-4">
            {currentHSK.title} Lessons
          </h3>
          <p className="text-emerald-200 text-center mb-16 max-w-2xl mx-auto">
            Complete all 5 lessons to master this HSK level. Each lesson covers essential vocabulary, grammar, dialogues, and characters.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num) => {
              return (
                <Link key={num} to={`/hsk/${currentHSK.number}/lesson${num}`} className="group">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 rounded-lg p-6 hover:border-emerald-400/50 transition-all cursor-pointer h-full hover:bg-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">{num}</div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Lesson {num}
                    </h4>
                    <p className="text-sm text-emerald-200 mb-4">Complete lesson</p>
                    <div className="flex items-center gap-2 text-emerald-300 group-hover:translate-x-1 transition-transform">
                      <span className="text-xs font-medium">Start</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/5 backdrop-blur-md border-y border-white/10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            HSK Exam Preparation Features
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {hskFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-emerald-400 mt-1 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-emerald-200">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level Progression */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            HSK Level Progression
          </h3>

          <div className="space-y-4">
            {hskLevels.map((level, idx) => (
              <div key={level.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">{level.number}</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-semibold text-white">{level.title}</h4>
                  <p className="text-emerald-200 text-sm">{level.words} • {level.subtitle}</p>
                </div>
                <div className="text-white/50 text-sm">
                  Lessons {level.lessonRange}
                </div>
                {selectedHSK === level.id && (
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Start Your HSK {currentHSK.number} Preparation
          </h3>
          <p className="text-xl text-emerald-200 mb-8">
            Begin with lesson 1 and progress through all lessons to master {currentHSK.title}
          </p>
          <Link to={`/hsk/${currentHSK.number}/lesson1`}>
            <Button size="lg" className="gap-2">
              <Zap className="w-5 h-5" />
              Start Lesson 1 Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-emerald-200 text-sm">
          <p>
            HSK (Hanyu Shuiping Kaoshi) - Official Chinese Proficiency Test
          </p>
          <p className="mt-2">
            Comprehensive Exam Preparation Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
