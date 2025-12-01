import { createContext, useContext, useState, ReactNode } from "react";

export type ThresholdLevel = "level1" | "level2" | "level3" | "level4" | "hsk1" | "hsk2" | "hsk3" | "hsk4" | "hsk5" | "hsk6";

interface LevelContextType {
  selectedLevel: ThresholdLevel;
  setSelectedLevel: (level: ThresholdLevel) => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLevel, setSelectedLevel] = useState<ThresholdLevel>("level1");

  return (
    <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel must be used within LevelProvider");
  }
  return context;
};

export const getLevelColor = (level: ThresholdLevel) => {
  switch (level) {
    case "level1":
      return { bg: "bg-blue-50", text: "text-blue-600", button: "bg-blue-500 hover:bg-blue-600", border: "border-blue-300" };
    case "level2":
      return { bg: "bg-purple-50", text: "text-purple-600", button: "bg-purple-500 hover:bg-purple-600", border: "border-purple-300" };
    case "level3":
      return { bg: "bg-pink-50", text: "text-pink-600", button: "bg-pink-500 hover:bg-pink-600", border: "border-pink-300" };
    case "level4":
      return { bg: "bg-orange-50", text: "text-orange-600", button: "bg-orange-500 hover:bg-orange-600", border: "border-orange-300" };
    case "hsk1":
      return { bg: "bg-emerald-50", text: "text-emerald-600", button: "bg-emerald-500 hover:bg-emerald-600", border: "border-emerald-300" };
    case "hsk2":
      return { bg: "bg-teal-50", text: "text-teal-600", button: "bg-teal-500 hover:bg-teal-600", border: "border-teal-300" };
    case "hsk3":
      return { bg: "bg-cyan-50", text: "text-cyan-600", button: "bg-cyan-500 hover:bg-cyan-600", border: "border-cyan-300" };
    case "hsk4":
      return { bg: "bg-sky-50", text: "text-sky-600", button: "bg-sky-500 hover:bg-sky-600", border: "border-sky-300" };
    case "hsk5":
      return { bg: "bg-indigo-50", text: "text-indigo-600", button: "bg-indigo-500 hover:bg-indigo-600", border: "border-indigo-300" };
    case "hsk6":
      return { bg: "bg-violet-50", text: "text-violet-600", button: "bg-violet-500 hover:bg-violet-600", border: "border-violet-300" };
  }
};

export const getLevelInfo = (level: ThresholdLevel) => {
  switch (level) {
    case "level1":
      return { title: "Short-Term Spoken Chinese", subtitle: "Beginner", description: "Start your Chinese journey with basic greetings and essential phrases" };
    case "level2":
      return { title: "Threshold Level 2", subtitle: "Beginner", description: "Build on basics and practice more vocabulary" };
    case "level3":
      return { title: "Short-Term Spoken Chinese", subtitle: "Pre-Intermediate", description: "Expand your vocabulary and practice everyday conversations" };
    case "level4":
      return { title: "Intermediate", subtitle: "Intermediate", description: "Master complex grammar and professional communication" };
    case "hsk1":
      return { title: "HSK Level 1", subtitle: "Elementary", description: "Master 150 essential words and basic survival phrases" };
    case "hsk2":
      return { title: "HSK Level 2", subtitle: "Elementary", description: "Learn 300 words and conduct simple daily conversations" };
    case "hsk3":
      return { title: "HSK Level 3", subtitle: "Intermediate", description: "Understand 600 words and communicate in various scenarios" };
    case "hsk4":
      return { title: "HSK Level 4", subtitle: "Intermediate", description: "Master 1200 words and discuss diverse topics fluently" };
    case "hsk5":
      return { title: "HSK Level 5", subtitle: "Advanced", description: "Learn 2500 words and understand news and literature" };
    case "hsk6":
      return { title: "HSK Level 6", subtitle: "Advanced", description: "Master 5000+ words and achieve near-native proficiency" };
  }
};
