import { createContext, useContext, useState, ReactNode } from "react";

export type ThresholdLevel = "level1" | "level2" | "level3";

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
  }
};

export const getLevelInfo = (level: ThresholdLevel) => {
  switch (level) {
    case "level1":
      return { title: "Threshold Level 1", subtitle: "Beginner-Friendly", description: "Start your Chinese journey with basic greetings and essential phrases" };
    case "level2":
      return { title: "Threshold Level 2", subtitle: "Intermediate", description: "Expand your vocabulary and practice everyday conversations" };
    case "level3":
      return { title: "Threshold Level 3", subtitle: "Advanced", description: "Master complex grammar and professional communication" };
  }
};
