import { useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

// Browser speech synthesis keeps narration available without network audio files.
const preGeneratedAudio: Record<number, string> = {};

interface AudioNarrationProps {
  lessonId: number;
  narrative?: string;
}

export function AudioNarration({ lessonId, narrative }: AudioNarrationProps) {
  const audioUrl = preGeneratedAudio[lessonId];
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [usingSpeechSynth, setUsingSpeechSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const hasPreGenerated = !!audioUrl;

  const togglePlay = () => {
    if (hasPreGenerated) {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Use browser Speech Synthesis for lessons without pre-generated audio
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setUsingSpeechSynth(false);
      } else if (narrative) {
        const utterance = new SpeechSynthesisUtterance(narrative.replace(/\n\n/g, '. '));
        utterance.rate = 0.85;
        utterance.pitch = 0.95;
        utterance.lang = 'en-US';
        utterance.onend = () => { setIsPlaying(false); setUsingSpeechSynth(false); setProgress(100); };
        utterance.onboundary = (e) => {
          if (narrative) {
            const pct = (e.charIndex / narrative.length) * 100;
            setProgress(pct);
          }
        };
        synthRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setUsingSpeechSynth(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !hasPreGenerated) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="manuscript-card p-4 mb-6"
    >
      {hasPreGenerated && <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />}

      <div className="flex items-center gap-3">
        {/* Play button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-[oklch(0.6_0.25_25)] text-[white] flex items-center justify-center hover:bg-[oklch(0.55_0.25_25)] transition-colors active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-[var(--font-sans)] font-medium text-muted-foreground flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              {hasPreGenerated ? "Listen to this lesson" : "Read aloud (browser voice)"}
            </span>
            {hasPreGenerated && duration > 0 && (
              <span className="text-xs font-[var(--font-sans)] text-muted-foreground">
                {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div
            className={`h-2 bg-[oklch(0.25_0.03_250)] rounded-full relative overflow-hidden ${hasPreGenerated ? 'cursor-pointer' : ''}`}
            onClick={handleSeek}
          >
            <div
              className="absolute inset-y-0 left-0 bg-[oklch(0.6_0.25_25)] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground font-[var(--font-body)] italic mt-2">
        For younger listeners — have Father read aloud, or press play and listen together.
      </p>
    </motion.div>
  );
}
