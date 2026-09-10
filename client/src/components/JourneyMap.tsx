import { useProgress } from "@/contexts/ProgressContext";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, MapPin } from "lucide-react";

// Journey waypoints from Boston to Yorktown
const waypoints = [
  { lessonRange: [1, 10], label: "Boston", x: 82, y: 12, city: true },
  { lessonRange: [11, 14], label: "Lexington", x: 78, y: 18, city: false },
  { lessonRange: [15, 18], label: "Bunker Hill", x: 80, y: 24, city: false },
  { lessonRange: [19, 25], label: "Philadelphia", x: 62, y: 42, city: true },
  { lessonRange: [26, 28], label: "New York", x: 72, y: 32, city: true },
  { lessonRange: [29, 31], label: "Trenton", x: 66, y: 38, city: false },
  { lessonRange: [32, 33], label: "Saratoga", x: 74, y: 8, city: false },
  { lessonRange: [34, 35], label: "Valley Forge", x: 60, y: 46, city: false },
  { lessonRange: [36, 42], label: "Alliance", x: 40, y: 30, city: false },
  { lessonRange: [43, 55], label: "The People", x: 50, y: 55, city: false },
  { lessonRange: [56, 63], label: "Southern Campaign", x: 55, y: 70, city: false },
  { lessonRange: [64, 67], label: "Yorktown", x: 58, y: 62, city: true },
  { lessonRange: [68, 70], label: "Peace", x: 45, y: 75, city: false },
  { lessonRange: [71, 80], label: "Constitution", x: 62, y: 44, city: false },
  { lessonRange: [81, 90], label: "Legacy", x: 50, y: 85, city: false },
];

export function JourneyMap() {
  const { completedLessons, totalCompleted, percentComplete } = useProgress();

  const isWaypointComplete = (range: number[]) => {
    for (let i = range[0]; i <= range[1]; i++) {
      if (!completedLessons.includes(i)) return false;
    }
    return true;
  };

  const waypointProgress = (range: number[]) => {
    let done = 0;
    const total = range[1] - range[0] + 1;
    for (let i = range[0]; i <= range[1]; i++) {
      if (completedLessons.includes(i)) done++;
    }
    return Math.round((done / total) * 100);
  };

  return (
    <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-[var(--font-display)] font-bold">Your Journey</h2>
          <p className="text-sm text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">
            {totalCompleted} of 90 nights complete
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-[var(--font-display)] font-bold text-[oklch(0.6_0.25_25)]">{percentComplete}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-[oklch(0.25_0.03_250)] rounded-full overflow-hidden mb-8 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.6_0.25_25)] to-[oklch(0.6_0.25_25)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentComplete}%` }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />
        {/* Wax seal at progress point */}
        {percentComplete > 0 && percentComplete < 100 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[oklch(0.6_0.25_25)] border-2 border-[oklch(0.15_0.03_250)] shadow-md"
            initial={{ left: 0 }}
            animate={{ left: `${percentComplete}%` }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginLeft: '-10px' }}
          />
        )}
      </div>

      {/* Journey Waypoints - Linear Path */}
      <div className="space-y-3">
        {waypoints.map((wp, index) => {
          const complete = isWaypointComplete(wp.lessonRange);
          const progress = waypointProgress(wp.lessonRange);
          const isActive = progress > 0 && !complete;

          return (
            <div key={wp.label} className="flex items-center gap-3">
              {/* Status icon */}
              <div className="shrink-0">
                {complete ? (
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.6_0.25_25)]" />
                ) : isActive ? (
                  <div className="relative">
                    <Circle className="w-5 h-5 text-[oklch(0.6_0.25_25)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[oklch(0.6_0.25_25)] animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-[oklch(0.3_0.03_250)]" />
                )}
              </div>

              {/* Waypoint info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-[var(--font-display)] font-bold ${complete ? 'text-[oklch(0.6_0.25_25)]' : isActive ? 'text-white' : 'text-[oklch(0.6_0.02_250)]'}`}>
                    {wp.label}
                  </span>
                  {wp.city && <MapPin className="w-3 h-3 text-[oklch(0.6_0.25_25)]" />}
                </div>
                <span className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">
                  Nights {wp.lessonRange[0]}–{wp.lessonRange[1]}
                </span>
              </div>

              {/* Mini progress */}
              <div className="shrink-0 w-16">
                <div className="h-1.5 bg-[oklch(0.25_0.03_250)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[oklch(0.6_0.25_25)] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement */}
      <div className="mt-6 pt-4 border-t border-[oklch(1_0_0/0.08)] text-center">
        {totalCompleted === 0 && (
          <p className="text-sm font-[var(--font-body)] italic text-[oklch(0.6_0.02_250)]">
            The journey begins with a single night. <Link href="/lesson/1" className="text-[oklch(0.6_0.25_25)] hover:underline">Start Night 1 →</Link>
          </p>
        )}
        {totalCompleted > 0 && totalCompleted < 90 && (
          <p className="text-sm font-[var(--font-body)] italic text-[oklch(0.6_0.02_250)]">
            {90 - totalCompleted} nights remain. The road to Yorktown continues.
          </p>
        )}
        {totalCompleted === 90 && (
          <p className="text-sm font-[var(--font-body)] italic text-[oklch(0.6_0.25_25)]">
            The journey is complete. You walked from Boston to Yorktown together. Well done.
          </p>
        )}
      </div>
    </div>
  );
}
