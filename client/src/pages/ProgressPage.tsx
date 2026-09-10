import { Link } from "wouter";
import { useProgress } from "@/contexts/ProgressContext";
import { JourneyMap } from "@/components/JourneyMap";
import { lessons, themes } from "@/lib/lessons";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Award } from "lucide-react";

export default function ProgressPage() {
  const { isComplete, markComplete, markIncomplete, completedLessons } = useProgress();

  return (
    <div className="min-h-screen parchment-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold">Our Journey</h1>
          <Link href="/" className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <section className="container py-8">
        <JourneyMap />
      </section>

      {/* Quiz Night Section */}
      <section className="container py-8">
        <h2 className="text-xl font-[var(--font-display)] font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[oklch(0.6_0.25_25)]" />
          Family Quiz Nights
        </h2>
        <p className="text-sm text-[oklch(0.6_0.02_250)] font-[var(--font-body)] mb-6">
          After every 10 lessons, unlock a quiz to test what your family has learned together. Need at least 7 of 10 lessons complete to unlock each quiz.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3,4,5,6,7,8,9].map(setNum => {
            const start = (setNum - 1) * 10 + 1;
            const end = setNum * 10;
            const done = Array.from({length: 10}, (_, i) => start + i).filter(id => completedLessons.includes(id)).length;
            const unlocked = done >= 7;
            const quizTitles: Record<number, string> = {1:"Seeds of Discontent",2:"The Breaking Point",3:"Declaring Freedom",4:"The Darkest Hours",5:"Allies and Enemies",6:"People of the Revolution",7:"The War in the South",8:"Victory",9:"Building the Republic"};
            return (
              <Link key={setNum} href={`/quiz/${setNum}`}>
                <div className={`p-4 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] ${unlocked ? 'hover:border-[oklch(0.55_0.2_25/0.4)]' : 'opacity-60'} transition-all`}>
                  <div className="flex items-center gap-3">
                    <div className={`wax-seal text-xs ${!unlocked ? 'opacity-40' : ''}`}>{setNum}</div>
                    <div>
                      <p className="font-[var(--font-display)] font-bold text-sm">{quizTitles[setNum]}</p>
                      <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">
                        {unlocked ? "Ready to play!" : `${done}/7 lessons needed`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Lesson Checklist by Theme */}
      <section className="container py-8">
        <h2 className="text-xl font-[var(--font-display)] font-bold mb-6">Mark Lessons Complete</h2>
        <p className="text-sm text-[oklch(0.6_0.02_250)] font-[var(--font-body)] mb-6">
          Tap the circle next to each lesson after your family finishes it together. Your progress is saved on this device.
        </p>

        <div className="space-y-8">
          {themes.map(theme => {
            const themeLessons = lessons.filter(l => l.themeId === theme.id);
            const completedCount = themeLessons.filter(l => isComplete(l.id)).length;

            return (
              <div key={theme.id}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[var(--font-display)] font-bold text-base">{theme.title}</h3>
                  <span className="text-xs font-[var(--font-sans)] text-[oklch(0.6_0.02_250)]">{completedCount}/{themeLessons.length}</span>
                </div>
                <div className="space-y-1.5">
                  {themeLessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center gap-3 py-1.5">
                      <button
                        onClick={() => isComplete(lesson.id) ? markIncomplete(lesson.id) : markComplete(lesson.id)}
                        className="shrink-0"
                      >
                        {isComplete(lesson.id) ? (
                          <CheckCircle2 className="w-5 h-5 text-[oklch(0.6_0.25_25)]" />
                        ) : (
                          <Circle className="w-5 h-5 text-[oklch(0.82_0.03_75)] hover:text-[oklch(0.6_0.25_25)] transition-colors" />
                        )}
                      </button>
                      <Link href={`/lesson/${lesson.id}`} className="flex-1 min-w-0">
                        <span className={`text-sm font-[var(--font-sans)] ${isComplete(lesson.id) ? 'text-[oklch(0.6_0.02_250)] line-through' : 'text-foreground hover:text-[oklch(0.6_0.25_25)]'} transition-colors`}>
                          Night {lesson.id}: {lesson.title}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
