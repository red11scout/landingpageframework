import { useState } from "react";
import { Link, useParams } from "wouter";
import { useProgress } from "@/contexts/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Award, CheckCircle2, XCircle, ChevronRight } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizData: Record<number, { title: string; questions: QuizQuestion[] }> = {
  1: {
    title: "Seeds of Discontent",
    questions: [
      { question: "How long did it take to sail from England to America in 1750?", options: ["2 weeks", "6-8 weeks", "3 months", "1 year"], correct: 1, explanation: "It took 6-8 weeks to cross the Atlantic, depending on the wind." },
      { question: "Who was the first person killed in the Boston Massacre?", options: ["Paul Revere", "Samuel Adams", "Crispus Attucks", "John Hancock"], correct: 2, explanation: "Crispus Attucks — a man of African and Native American descent — was the first to fall." },
      { question: "What did the Sons of Liberty dump into Boston Harbor?", options: ["Sugar", "Stamps", "Tea", "Gunpowder"], correct: 2, explanation: "On December 16, 1773, they dumped 342 chests of British tea into the harbor." },
      { question: "Who defended the British soldiers after the Boston Massacre?", options: ["Samuel Adams", "John Adams", "Paul Revere", "Benjamin Franklin"], correct: 1, explanation: "John Adams defended them because he believed every person deserves a fair trial." },
      { question: "What were the 'Intolerable Acts' meant to punish?", options: ["New York", "Philadelphia", "Boston", "Charleston"], correct: 2, explanation: "The Intolerable Acts punished Boston for the Tea Party by closing its port." },
    ]
  },
  2: {
    title: "The Breaking Point",
    questions: [
      { question: "How many militiamen faced 700 British soldiers at Lexington?", options: ["77", "200", "500", "1,000"], correct: 0, explanation: "Just 77 farmers and shopkeepers stood on Lexington Green that morning." },
      { question: "What did Thomas Paine's 'Common Sense' argue for?", options: ["Higher taxes", "Peace with Britain", "Independence", "Moving west"], correct: 2, explanation: "Common Sense argued plainly that America should be independent from Britain." },
      { question: "How many copies of Common Sense were sold in 3 months?", options: ["1,000", "10,000", "50,000", "150,000"], correct: 3, explanation: "150,000 copies in a country of 2.5 million — the best-selling book relative to population." },
      { question: "The Battle of Bunker Hill was actually fought on which hill?", options: ["Bunker Hill", "Breed's Hill", "Dorchester Heights", "Prospect Hill"], correct: 1, explanation: "The battle was fought on Breed's Hill, but the name 'Bunker Hill' stuck." },
      { question: "Who said 'Give me liberty, or give me death'?", options: ["Samuel Adams", "Thomas Jefferson", "Patrick Henry", "George Washington"], correct: 2, explanation: "Patrick Henry spoke these words on March 23, 1775, in Richmond, Virginia." },
    ]
  },
  3: {
    title: "Declaring Freedom",
    questions: [
      { question: "Who wrote the Declaration of Independence?", options: ["John Adams", "Benjamin Franklin", "Thomas Jefferson", "George Washington"], correct: 2, explanation: "Thomas Jefferson wrote it in 17 days at age 33." },
      { question: "How many men signed the Declaration?", options: ["13", "39", "56", "100"], correct: 2, explanation: "56 men signed, risking their lives for treason against the Crown." },
      { question: "On what date did Congress vote for independence?", options: ["July 2, 1776", "July 4, 1776", "June 7, 1776", "August 2, 1776"], correct: 0, explanation: "Congress voted for independence on July 2. July 4 is when they approved the final text." },
      { question: "Who signed the Declaration first and largest?", options: ["Benjamin Franklin", "John Adams", "John Hancock", "Thomas Jefferson"], correct: 2, explanation: "John Hancock signed first and largest — 'So King George can read it without his spectacles.'" },
      { question: "What did the Declaration say governments are created to do?", options: ["Collect taxes", "Protect people's rights", "Fight wars", "Build roads"], correct: 1, explanation: "The Declaration says governments exist to protect life, liberty, and the pursuit of happiness." },
    ]
  },
  4: {
    title: "The Darkest Hours",
    questions: [
      { question: "What river did Washington cross on Christmas night 1776?", options: ["Hudson River", "Potomac River", "Delaware River", "Charles River"], correct: 2, explanation: "Washington crossed the icy Delaware River to attack Trenton." },
      { question: "What were the Hessians?", options: ["French allies", "German mercenaries", "British generals", "American spies"], correct: 1, explanation: "Hessians were German soldiers hired by Britain to fight in America." },
      { question: "How many soldiers died at Valley Forge — not from battle but from cold and disease?", options: ["200", "500", "1,000", "2,000"], correct: 3, explanation: "About 2,000 of the 12,000 soldiers died from cold, hunger, and disease." },
      { question: "Who trained the army at Valley Forge?", options: ["Lafayette", "Baron von Steuben", "Benjamin Franklin", "Nathanael Greene"], correct: 1, explanation: "Baron von Steuben, a Prussian drillmaster, transformed the army into professionals." },
      { question: "What were Nathan Hale's famous last words?", options: ["Give me liberty or give me death", "I only regret that I have but one life to lose for my country", "Don't fire until you see the whites of their eyes", "We must all hang together"], correct: 1, explanation: "Nathan Hale was 21 when he was hanged as a spy. His words became immortal." },
    ]
  },
  5: {
    title: "Allies and Enemies",
    questions: [
      { question: "Which country became America's most important ally?", options: ["Spain", "France", "Netherlands", "Prussia"], correct: 1, explanation: "France provided money, soldiers, and a navy that proved decisive at Yorktown." },
      { question: "Who convinced France to join the war?", options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"], correct: 2, explanation: "Franklin charmed the French court and secured the alliance after Saratoga." },
      { question: "How old was Lafayette when he sailed to America?", options: ["16", "19", "25", "30"], correct: 1, explanation: "Lafayette was just 19 when he left his wealth and family to fight for American freedom." },
      { question: "What battle convinced France that America could win?", options: ["Bunker Hill", "Trenton", "Saratoga", "Yorktown"], correct: 2, explanation: "Saratoga — where Burgoyne surrendered 6,000 men — proved America could defeat a British army." },
      { question: "Who was Benedict Arnold before he became a traitor?", options: ["A spy", "America's best general", "A diplomat", "A printer"], correct: 1, explanation: "Arnold was the hero of Saratoga — America's best battlefield general before his betrayal." },
    ]
  },
  6: {
    title: "People of the Revolution",
    questions: [
      { question: "What did Abigail Adams ask John to 'remember'?", options: ["The soldiers", "The Ladies", "The children", "The farmers"], correct: 1, explanation: "'Remember the Ladies,' she wrote — decades before women's suffrage." },
      { question: "Who was the first African American to publish a book?", options: ["Crispus Attucks", "James Armistead", "Phillis Wheatley", "Frederick Douglass"], correct: 2, explanation: "Phillis Wheatley published her book of poetry in 1773." },
      { question: "What did Deborah Sampson do during the war?", options: ["Wrote propaganda", "Disguised herself as a man and fought", "Spied for Washington", "Nursed the wounded"], correct: 1, explanation: "She served 17 months as 'Robert Shurtliff' and was wounded twice." },
      { question: "How many years did Joseph Plumb Martin serve?", options: ["1 year", "3 years", "5 years", "7 years"], correct: 3, explanation: "Martin served from 1776 to 1783 — seven years as a common soldier." },
      { question: "Who funded the Revolution when Congress had no money?", options: ["George Washington", "Haym Salomon", "John Hancock", "Thomas Jefferson"], correct: 1, explanation: "Haym Salomon brokered loans and personally lent over $650,000 — most never repaid." },
    ]
  },
  7: {
    title: "The War in the South",
    questions: [
      { question: "What was the worst American defeat of the war?", options: ["Long Island", "Charleston", "Camden", "Brandywine"], correct: 1, explanation: "5,000 Americans surrendered at Charleston in May 1780." },
      { question: "What was Francis Marion's nickname?", options: ["The Fox", "The Swamp Fox", "The Ghost", "The Shadow"], correct: 1, explanation: "The British called him the Swamp Fox because they could never catch him." },
      { question: "Who set the brilliant trap at Cowpens?", options: ["Nathanael Greene", "Daniel Morgan", "Francis Marion", "George Washington"], correct: 1, explanation: "Daniel Morgan used three lines of troops to destroy Tarleton's force." },
      { question: "Nathanael Greene lost every battle in the South. What did he win?", options: ["Nothing", "The campaign", "A medal", "A promotion"], correct: 1, explanation: "'We fight, get beat, rise, and fight again.' He bled the British dry." },
      { question: "Where did Cornwallis march after Guilford Courthouse?", options: ["Back to Charleston", "To New York", "To Virginia", "To Canada"], correct: 2, explanation: "Cornwallis marched to Virginia — and into the trap at Yorktown." },
    ]
  },
  8: {
    title: "Victory",
    questions: [
      { question: "How many miles did Washington's army march in secret to reach Yorktown?", options: ["100", "200", "300", "450"], correct: 3, explanation: "The army marched 450 miles from New York to Virginia in the war's greatest deception." },
      { question: "Whose fleet sealed the Chesapeake Bay and trapped Cornwallis?", options: ["Admiral de Grasse", "Admiral d'Estaing", "John Paul Jones", "Admiral Graves"], correct: 0, explanation: "Admiral de Grasse's 28 French warships blocked Cornwallis's escape by sea." },
      { question: "Who led the bayonet charge on Redoubt 10 at Yorktown?", options: ["George Washington", "Lafayette", "Alexander Hamilton", "Nathanael Greene"], correct: 2, explanation: "Hamilton was 24. His men took the position in ten minutes with bayonets only." },
      { question: "What did Washington do after winning the war?", options: ["Became king", "Stayed in command", "Resigned and went home", "Moved to France"], correct: 2, explanation: "He resigned his commission and rode home to Mount Vernon — shocking the world." },
      { question: "What song did the British band play at the surrender?", options: ["God Save the King", "Yankee Doodle", "The World Turned Upside Down", "Rule Britannia"], correct: 2, explanation: "Tradition says they played 'The World Turned Upside Down' — and it was." },
    ]
  },
  9: {
    title: "Building the Republic",
    questions: [
      { question: "Why did the Articles of Confederation fail?", options: ["Too much power", "Too little power", "Too expensive", "Too complicated"], correct: 1, explanation: "Congress couldn't tax, raise an army, or enforce laws — it was too weak to govern." },
      { question: "What rebellion scared leaders into writing a new Constitution?", options: ["Bacon's Rebellion", "Shays' Rebellion", "Whiskey Rebellion", "Nat Turner's Rebellion"], correct: 1, explanation: "Shays' Rebellion proved the government was too weak to maintain order." },
      { question: "How many branches does the Constitution create?", options: ["2", "3", "4", "5"], correct: 1, explanation: "Three: Executive (President), Legislative (Congress), and Judicial (Courts)." },
      { question: "What was the Three-Fifths Compromise about?", options: ["Taxes", "Counting enslaved people for representation", "Voting age", "Term limits"], correct: 1, explanation: "It counted each enslaved person as 3/5 of a person for Congressional representation." },
      { question: "How many amendments are in the Bill of Rights?", options: ["5", "8", "10", "12"], correct: 2, explanation: "Ten amendments protecting individual freedoms were ratified in 1791." },
    ]
  },
};

export default function QuizPage() {
  const params = useParams<{ set: string }>();
  const setNum = parseInt(params.set || "1");
  const quiz = quizData[setNum];
  const { completedLessons } = useProgress();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Check if lessons are complete for this quiz set
  const startLesson = (setNum - 1) * 10 + 1;
  const endLesson = setNum * 10;
  const lessonsComplete = Array.from({ length: 10 }, (_, i) => startLesson + i).filter(id => completedLessons.includes(id)).length;
  const unlocked = lessonsComplete >= 7; // Need at least 7 of 10 to unlock

  if (!quiz) {
    return (
      <div className="min-h-screen parchment-bg flex items-center justify-center">
        <p className="font-[var(--font-display)] text-xl">Quiz not found.</p>
      </div>
    );
  }

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === quiz.questions[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen parchment-bg">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/progress" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Progress
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold">Quiz Night {setNum}</h1>
          <Link href="/"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="w-6 h-6" /></Link>
        </div>
      </header>

      <div className="container py-8 max-w-2xl mx-auto">
        {!unlocked ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="wax-seal mx-auto mb-6 opacity-40" style={{ width: '4rem', height: '4rem', fontSize: '1.5rem' }}>🔒</div>
            <h2 className="text-2xl font-[var(--font-display)] font-bold mb-3">Quiz Locked</h2>
            <p className="text-[oklch(0.6_0.02_250)] font-[var(--font-body)] mb-4">
              Complete at least 7 of the 10 lessons (Nights {startLesson}–{endLesson}) to unlock this quiz.
            </p>
            <p className="text-sm text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">{lessonsComplete}/10 lessons complete</p>
            <Link href={`/lesson/${startLesson}`}>
              <button className="mt-6 px-5 py-2.5 bg-[oklch(0.6_0.25_25)] text-white font-[var(--font-sans)] font-medium text-sm hover:bg-[oklch(0.5_0.2_25)] transition-colors">
                Continue Learning →
              </button>
            </Link>
          </motion.div>
        ) : showResult ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            {/* Wax seal reward */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-6"
            >
              <div className="wax-seal mx-auto" style={{ width: '5rem', height: '5rem', fontSize: '1.5rem' }}>
                {score >= 4 ? '★' : score >= 3 ? '✦' : '•'}
              </div>
            </motion.div>
            <h2 className="text-3xl font-[var(--font-display)] font-bold mb-2">
              {score === 5 ? "Perfect!" : score >= 4 ? "Excellent!" : score >= 3 ? "Well Done!" : "Keep Learning!"}
            </h2>
            <p className="text-xl font-[var(--font-display)] text-[oklch(0.6_0.25_25)] mb-4">{score} of 5 correct</p>
            <p className="text-[oklch(0.6_0.02_250)] font-[var(--font-body)] italic mb-8 max-w-md mx-auto">
              {score === 5 ? "Your family knows this chapter of the Revolution cold. The founders would be proud." :
               score >= 3 ? "Strong work. The knowledge is taking root. Come back and try again anytime." :
               "The Revolution took eight years. Learning takes time too. Review the lessons and try again."}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={resetQuiz} className="px-5 py-2.5 border border-[oklch(1_0_0/0.08)] font-[var(--font-sans)] text-sm hover:border-[oklch(0.55_0.2_25/0.4)] transition-colors">
                Try Again
              </button>
              {setNum < 9 && (
                <Link href={`/quiz/${setNum + 1}`}>
                  <button className="px-5 py-2.5 bg-[oklch(0.6_0.25_25)] text-white font-[var(--font-sans)] text-sm hover:bg-[oklch(0.5_0.2_25)] transition-colors">
                    Next Quiz →
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-[var(--font-sans)] text-[oklch(0.6_0.02_250)]">Question {currentQ + 1} of {quiz.questions.length}</span>
              <span className="text-sm font-[var(--font-sans)] text-[oklch(0.6_0.25_25)]">{score} correct</span>
            </div>
            <div className="h-1.5 bg-[oklch(0.25_0.03_250)] rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-[oklch(0.6_0.25_25)] rounded-full transition-all duration-300" style={{ width: `${((currentQ) / quiz.questions.length) * 100}%` }} />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl md:text-2xl font-[var(--font-display)] font-bold mb-6">
                  {quiz.questions[currentQ].question}
                </h2>

                <div className="space-y-3 mb-6">
                  {quiz.questions[currentQ].options.map((option, idx) => {
                    const isCorrect = idx === quiz.questions[currentQ].correct;
                    const isSelected = idx === selected;
                    let borderClass = "border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.55_0.2_25/0.4)]";
                    if (answered) {
                      if (isCorrect) borderClass = "border-[oklch(0.6_0.25_25)] bg-[oklch(0.4_0.1_145/0.05)]";
                      else if (isSelected) borderClass = "border-[oklch(0.6_0.25_25)] bg-[oklch(0.55_0.2_25/0.05)]";
                      else borderClass = "border-[oklch(1_0_0/0.08)] opacity-50";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={answered}
                        className={`w-full text-left p-4 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] border ${borderClass} transition-all duration-200 flex items-center gap-3`}
                      >
                        <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-[var(--font-sans)] font-bold">
                          {answered && isCorrect ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.6_0.25_25)]" /> :
                           answered && isSelected && !isCorrect ? <XCircle className="w-4 h-4 text-[oklch(0.6_0.25_25)]" /> :
                           String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-[var(--font-body)] text-base">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {answered && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] p-4 mb-6">
                    <p className="text-sm font-[var(--font-body)]">{quiz.questions[currentQ].explanation}</p>
                  </motion.div>
                )}

                {/* Next button */}
                {answered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <button onClick={nextQuestion} className="flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.6_0.25_25)] text-white font-[var(--font-sans)] font-medium text-sm hover:bg-[oklch(0.5_0.2_25)] transition-colors active:scale-[0.97]">
                      {currentQ < quiz.questions.length - 1 ? "Next Question" : "See Results"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
