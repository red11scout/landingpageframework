import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProgressState {
  completedLessons: number[];
  visitedFigures: string[];
  markComplete: (lessonId: number) => void;
  markIncomplete: (lessonId: number) => void;
  isComplete: (lessonId: number) => boolean;
  markFigureVisited: (figureId: string) => void;
  isFigureVisited: (figureId: string) => boolean;
  totalCompleted: number;
  percentComplete: number;
}

const ProgressContext = createContext<ProgressState | null>(null);

const STORAGE_KEY = "revolution-nights-progress";
const FIGURES_STORAGE_KEY = "revolution-nights-figures-visited";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [visitedFigures, setVisitedFigures] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FIGURES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(FIGURES_STORAGE_KEY, JSON.stringify(visitedFigures));
  }, [visitedFigures]);

  const markComplete = (lessonId: number) => {
    setCompletedLessons(prev => prev.includes(lessonId) ? prev : [...prev, lessonId].sort((a, b) => a - b));
  };

  const markIncomplete = (lessonId: number) => {
    setCompletedLessons(prev => prev.filter(id => id !== lessonId));
  };

  const isComplete = (lessonId: number) => completedLessons.includes(lessonId);

  const markFigureVisited = (figureId: string) => {
    setVisitedFigures(prev => prev.includes(figureId) ? prev : [...prev, figureId]);
  };

  const isFigureVisited = (figureId: string) => visitedFigures.includes(figureId);

  return (
    <ProgressContext.Provider value={{
      completedLessons,
      visitedFigures,
      markComplete,
      markIncomplete,
      isComplete,
      markFigureVisited,
      isFigureVisited,
      totalCompleted: completedLessons.length,
      percentComplete: Math.round((completedLessons.length / 90) * 100),
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
