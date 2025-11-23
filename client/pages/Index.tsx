import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useLevel, getLevelColor, getLevelInfo } from "@/contexts/LevelContext";

const features = [
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: "Pronunciation Training",
    description: "Master pinyin and tones with audio guidance",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Real Conversations",
    description: "Learn through authentic dialogues and scenarios",
  },
  {
    icon: <Pen className="w-6 h-6" />,
    title: "Character Writing",
    description: "Practice stroke order with interactive canvas",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Interactive Quizzes",
    description: "Test your knowledge with engaging exercises",
  },
];

const lessons = [
  { num: 1, title: "你好", subtitle: "Hello & Greetings" },
  { num: 2, title: "你好吗", subtitle: "How Are You?" },
  { num: 3, title: "你吃什么", subtitle: "What Do You Eat?" },
  { num: 4, title: "多少钱", subtitle: "How Much?" },
  { num: 5, title: "图书馆在哪儿", subtitle: "Where Is?" },
];

export default function Index() {
  const { selectedLevel, setSelectedLevel } = useLevel();
  const levelColors = getLevelColor(selectedLevel);
  const levelInfo = getLevelInfo(selectedLevel);

  const levelBadgeColor = selectedLevel === "level1" ? "bg-blue-500/20 border-blue-400/30 text-blue-300" :
                         selectedLevel === "level2" ? "bg-purple-500/20 border-purple-400/30 text-purple-300" :
                         "bg-pink-500/20 border-pink-400/30 text-pink-300";

  const gradientFrom = selectedLevel === "level1" ? "from-slate-900 via-blue-900 to-slate-900" :
                       selectedLevel === "level2" ? "from-slate-900 via-purple-900 to-slate-900" :
                       "from-slate-900 via-pink-900 to-slate-900";

  return (
    <div className={`min-h-screen bg-gradient-to-b ${gradientFrom}`}>
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">汉语速成</h1>
              <p className="text-xs text-blue-200">Short-Term Spoken Chinese</p>
            </div>
          </Link>
          <Link to="/lesson/lesson1">
            <Button className="gap-2">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-40 -left-40" />
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -bottom-40 -right-40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-block">
              <span className={`px-4 py-2 border rounded-full text-sm font-medium ${levelBadgeColor}`}>
                {levelInfo.title} • {levelInfo.subtitle}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Master Everyday Chinese in{" "}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                selectedLevel === "level1" ? "from-blue-400 via-cyan-400 to-blue-300" :
                selectedLevel === "level2" ? "from-purple-400 via-violet-400 to-purple-300" :
                "from-pink-400 via-rose-400 to-pink-300"
              }`}>
                4-6 Weeks
              </span>
            </h2>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              An interactive learning platform designed for short-term Chinese
              language programs. Learn pronunciation, vocabulary, conversations,
              and characters through engaging, multimedia lessons.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/lesson/lesson1">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Zap className="w-5 h-5" />
                  Start Learning Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                View Curriculum
              </Button>
            </div>

            {/* Level Selector */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-blue-200 text-sm font-medium mb-4">Select Your Level</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => setSelectedLevel("level1")}
                  variant={selectedLevel === "level1" ? "default" : "outline"}
                  className={selectedLevel === "level1" ? "bg-blue-500 hover:bg-blue-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}
                >
                  Level 1 - Beginner
                </Button>
                <Button
                  onClick={() => setSelectedLevel("level2")}
                  variant={selectedLevel === "level2" ? "default" : "outline"}
                  className={selectedLevel === "level2" ? "bg-purple-500 hover:bg-purple-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}
                >
                  Level 2 - Intermediate
                </Button>
                <Button
                  onClick={() => setSelectedLevel("level3")}
                  variant={selectedLevel === "level3" ? "default" : "outline"}
                  className={selectedLevel === "level3" ? "bg-pink-500 hover:bg-pink-600" : "bg-white/5 border-white/20 text-white hover:bg-white/10"}
                >
                  Level 3 - Advanced
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-20">
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                selectedLevel === "level1" ? "text-blue-400" :
                selectedLevel === "level2" ? "text-purple-400" :
                "text-pink-400"
              }`}>15</div>
              <p className="text-sm text-blue-200">Interactive Lessons</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                selectedLevel === "level1" ? "text-cyan-400" :
                selectedLevel === "level2" ? "text-violet-400" :
                "text-rose-400"
              }`}>300+</div>
              <p className="text-sm text-blue-200">Vocabulary Words</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                selectedLevel === "level1" ? "text-blue-400" :
                selectedLevel === "level2" ? "text-purple-400" :
                "text-pink-400"
              }`}>50+</div>
              <p className="text-sm text-blue-200">Character Lessons</p>
            </div>
            <div className="text-center col-span-3 md:col-span-1">
              <div className={`text-3xl font-bold ${
                selectedLevel === "level1" ? "text-cyan-400" :
                selectedLevel === "level2" ? "text-violet-400" :
                "text-rose-400"
              }`}>∞</div>
              <p className="text-sm text-blue-200">Practice Exercises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/5 backdrop-blur-md border-y border-white/10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Comprehensive Learning Features
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-blue-400 mt-1 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-blue-200">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Lessons */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-4">
            15 Comprehensive Lessons
          </h3>
          <p className="text-blue-200 text-center mb-16 max-w-2xl mx-auto">
            From basic greetings to directions, each lesson includes vocabulary,
            dialogues, characters, grammar, and interactive quizzes
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {lessons.map((lesson) => (
              <Link
                key={lesson.num}
                to={`/lesson/lesson${lesson.num}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 rounded-lg p-6 hover:border-blue-400/50 transition-all cursor-pointer h-full hover:bg-blue-500/30">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {lesson.num}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-blue-200">{lesson.subtitle}</p>
                  <div className="mt-4 flex items-center gap-2 text-blue-300 group-hover:translate-x-1 transition-transform">
                    <span className="text-xs font-medium">Start</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="bg-white/5 backdrop-blur-md border-y border-white/10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Structured Learning Path
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Vocabulary Training
              </h4>
              <p className="text-blue-200">
                Learn 300+ essential words with flashcards and audio
                pronunciation
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Real Conversations
              </h4>
              <p className="text-blue-200">
                Practice authentic dialogues with line-by-line playback and
                shadowing mode
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Mastery Assessment
              </h4>
              <p className="text-blue-200">
                Quiz yourself with multiple formats and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Master Chinese?
          </h3>
          <p className="text-xl text-blue-200 mb-8">
            Start your 4-6 week journey to fluency with our comprehensive
            learning platform
          </p>
          <Link to="/lesson/lesson1">
            <Button size="lg" className="gap-2">
              <Zap className="w-5 h-5" />
              Begin Your Journey Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-blue-200 text-sm">
          <p>
            Based on "汉语口语速成" (Short-Term Spoken Chinese) Threshold Vol. 1
          </p>
          <p className="mt-2">
            Beijing Language and Culture University Press • Interactive Learning
            Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
