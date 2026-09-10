import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, BookOpen, ChevronRight } from "lucide-react";

interface HistoricalEvent {
  month: number;
  day: number;
  year: number;
  event: string;
  detail: string;
  lessonId?: number;
}

const historicalEvents: HistoricalEvent[] = [
  // January
  { month: 1, day: 1, year: 1776, event: "Norfolk, Virginia burned", detail: "British ships bombarded Norfolk. Patriots finished the destruction. The largest city in Virginia was gone.", lessonId: 17 },
  { month: 1, day: 3, year: 1777, event: "Battle of Princeton", detail: "Washington attacked the British garrison three days after Trenton. General Mercer was bayoneted seven times.", lessonId: 31 },
  { month: 1, day: 5, year: 1781, event: "Benedict Arnold raids Richmond", detail: "The traitor, now a British general, burned Virginia's capital with 1,600 men.", lessonId: 42 },
  { month: 1, day: 9, year: 1776, event: "Common Sense published", detail: "Thomas Paine's pamphlet appeared in Philadelphia. Within months, 150,000 copies were sold.", lessonId: 17 },
  { month: 1, day: 10, year: 1776, event: "Common Sense changes minds", detail: "Paine wrote: 'A government of our own is our natural right.' The colonies began to agree.", lessonId: 17 },
  { month: 1, day: 15, year: 1776, event: "Paine's words spread", detail: "Common Sense reached every colony. Taverns and churches buzzed with talk of independence.", lessonId: 17 },
  { month: 1, day: 17, year: 1781, event: "Battle of Cowpens", detail: "Daniel Morgan's brilliant trap destroyed Tarleton's force in under an hour. 110 killed, 830 captured.", lessonId: 59 },
  { month: 1, day: 25, year: 1776, event: "Henry Knox arrives with cannons", detail: "Knox dragged 60 cannons 300 miles from Ticonderoga through snow and ice. Boston's liberation was near.", lessonId: 16 },
  // February
  { month: 2, day: 6, year: 1778, event: "France signs alliance", detail: "Two treaties signed in Paris. France recognized American independence and pledged military support.", lessonId: 36 },
  { month: 2, day: 14, year: 1778, event: "First foreign salute to American flag", detail: "A French warship fired a 9-gun salute to the Stars and Stripes in Quiberon Bay.", lessonId: 36 },
  { month: 2, day: 23, year: 1778, event: "Von Steuben arrives at Valley Forge", detail: "The Prussian drillmaster began transforming scarecrows into soldiers.", lessonId: 35 },
  { month: 2, day: 27, year: 1782, event: "Parliament votes to end the war", detail: "The House of Commons voted against continuing offensive operations in America.", lessonId: 68 },
  // March
  { month: 3, day: 5, year: 1770, event: "The Boston Massacre", detail: "Five colonists killed by British soldiers on King Street. Crispus Attucks fell first.", lessonId: 7 },
  { month: 3, day: 15, year: 1781, event: "Battle of Guilford Courthouse", detail: "Greene lost the battle but destroyed a quarter of Cornwallis's army. A Pyrrhic British 'victory.'", lessonId: 62 },
  { month: 3, day: 17, year: 1776, event: "British evacuate Boston", detail: "Howe loaded 9,000 soldiers onto ships and sailed away. Boston was free.", lessonId: 16 },
  { month: 3, day: 22, year: 1765, event: "Stamp Act passed", detail: "Parliament taxed every piece of paper in the colonies. The seeds of revolution were planted.", lessonId: 4 },
  { month: 3, day: 23, year: 1775, event: "Patrick Henry's speech", detail: "'Give me liberty, or give me death!' Henry thundered in Richmond, Virginia.", lessonId: 13 },
  { month: 3, day: 31, year: 1776, event: "Abigail Adams writes 'Remember the Ladies'", detail: "She told John that women would 'foment a Rebellion' if ignored. He laughed. She was not joking.", lessonId: 44 },
  // April
  { month: 4, day: 14, year: 1775, event: "General Gage receives secret orders", detail: "London ordered him to arrest rebel leaders and seize weapons at Concord. The clock was ticking.", lessonId: 13 },
  { month: 4, day: 18, year: 1775, event: "Paul Revere's Ride", detail: "Revere, Dawes, and Prescott rode through the night. 'The Regulars are coming out!'", lessonId: 13 },
  { month: 4, day: 19, year: 1775, event: "Battles of Lexington and Concord", detail: "The shot heard round the world. Eight militiamen died on Lexington Green. The war began.", lessonId: 13 },
  { month: 4, day: 23, year: 1775, event: "Massachusetts calls for 30,000 troops", detail: "The Provincial Congress asked New England colonies to raise an army. They came.", lessonId: 14 },
  { month: 4, day: 30, year: 1789, event: "Washington inaugurated", detail: "The first president took the oath on the balcony of Federal Hall in New York City.", lessonId: 79 },
  // May
  { month: 5, day: 10, year: 1775, event: "Fort Ticonderoga captured", detail: "Ethan Allen and the Green Mountain Boys took the fort 'in the name of the Great Jehovah and the Continental Congress.'", lessonId: 15 },
  { month: 5, day: 10, year: 1776, event: "Congress recommends new governments", detail: "John Adams pushed a resolution urging colonies to form their own governments. Independence was coming.", lessonId: 18 },
  { month: 5, day: 12, year: 1780, event: "Charleston surrenders", detail: "5,000 Americans captured. The worst defeat of the war. The South lay open.", lessonId: 56 },
  { month: 5, day: 25, year: 1787, event: "Constitutional Convention opens", detail: "Fifty-five delegates gathered in Philadelphia. They would throw out the Articles and start over.", lessonId: 73 },
  // June
  { month: 6, day: 7, year: 1776, event: "Richard Henry Lee's resolution", detail: "'These United Colonies are, and of right ought to be, free and independent States.'", lessonId: 18 },
  { month: 6, day: 11, year: 1776, event: "Committee of Five appointed", detail: "Congress chose Jefferson, Adams, Franklin, Sherman, and Livingston to draft the Declaration.", lessonId: 19 },
  { month: 6, day: 14, year: 1775, event: "Continental Army created", detail: "Congress established the army. The next day, they chose Washington to command it.", lessonId: 15 },
  { month: 6, day: 17, year: 1775, event: "Battle of Bunker Hill", detail: "The British took the hill but lost 1,000 men. The Americans would fight.", lessonId: 15 },
  { month: 6, day: 19, year: 1778, event: "Army leaves Valley Forge", detail: "After six months of suffering and training, the Continental Army marched out transformed.", lessonId: 35 },
  // July
  { month: 7, day: 2, year: 1776, event: "Congress votes for independence", detail: "Twelve colonies voted yes. New York abstained. John Adams thought this would be the great anniversary.", lessonId: 20 },
  { month: 7, day: 4, year: 1776, event: "Declaration of Independence adopted", detail: "Congress approved Jefferson's text. 'We hold these truths to be self-evident...'", lessonId: 20 },
  { month: 7, day: 8, year: 1776, event: "Declaration read publicly", detail: "Colonel Nixon read it aloud in Philadelphia. Church bells rang. Bonfires lit the night.", lessonId: 22 },
  { month: 7, day: 9, year: 1776, event: "Statue of King George pulled down", detail: "New Yorkers toppled the gilded lead statue. They melted it into 42,088 musket balls.", lessonId: 22 },
  { month: 7, day: 16, year: 1787, event: "The Great Compromise", detail: "Roger Sherman's plan saved the Convention: House by population, Senate by equality.", lessonId: 75 },
  // August
  { month: 8, day: 2, year: 1776, event: "Declaration signed", detail: "Most delegates signed on this day. Hancock first. Large and bold.", lessonId: 21 },
  { month: 8, day: 16, year: 1777, event: "Battle of Bennington", detail: "Vermont militia destroyed a Hessian foraging party. Burgoyne's supply problems worsened.", lessonId: 33 },
  { month: 8, day: 18, year: 1776, event: "Today in 1776", detail: "The Continental Army was in New York, preparing for the British invasion. Washington knew it was coming.", lessonId: 26 },
  { month: 8, day: 27, year: 1776, event: "Battle of Long Island", detail: "The British flanked Washington's army. Only a miraculous nighttime evacuation saved them.", lessonId: 26 },
  // September
  { month: 9, day: 3, year: 1783, event: "Treaty of Paris signed", detail: "Britain recognized American independence. The war was officially over.", lessonId: 68 },
  { month: 9, day: 5, year: 1774, event: "First Continental Congress meets", detail: "Fifty-six delegates from twelve colonies gathered in Philadelphia. They were angry.", lessonId: 12 },
  { month: 9, day: 5, year: 1781, event: "Battle of the Chesapeake", detail: "De Grasse's fleet held the bay. Cornwallis was trapped. The most important naval battle in American history.", lessonId: 65 },
  { month: 9, day: 17, year: 1787, event: "Constitution signed", detail: "Thirty-nine delegates signed. Franklin saw the sun on Washington's chair — 'a rising, not a setting Sun.'", lessonId: 74 },
  { month: 9, day: 22, year: 1776, event: "Nathan Hale executed", detail: "'I only regret that I have but one life to lose for my country.' He was twenty-one.", lessonId: 27 },
  { month: 9, day: 28, year: 1781, event: "Siege of Yorktown begins", detail: "17,000 allied troops surrounded Cornwallis. The trap was closed.", lessonId: 66 },
  // October
  { month: 10, day: 7, year: 1780, event: "Battle of Kings Mountain", detail: "Americans fought Americans. The frontier riflemen destroyed Ferguson's Loyalist force.", lessonId: 58 },
  { month: 10, day: 14, year: 1781, event: "Hamilton storms Redoubt 10", detail: "Twenty-four years old. Bayonets only. Ten minutes. The position fell.", lessonId: 66 },
  { month: 10, day: 17, year: 1777, event: "Burgoyne surrenders at Saratoga", detail: "5,791 British soldiers laid down their arms. France decided to help.", lessonId: 33 },
  { month: 10, day: 19, year: 1781, event: "British surrender at Yorktown", detail: "Cornwallis's army marched out. The band played 'The World Turned Upside Down.' It was.", lessonId: 67 },
  { month: 10, day: 25, year: 1774, event: "Edenton Tea Party", detail: "Fifty-one women in North Carolina signed a resolution boycotting British tea. Women acted.", lessonId: 47 },
  // November
  { month: 11, day: 7, year: 1775, event: "Lord Dunmore's Proclamation", detail: "Virginia's governor promised freedom to enslaved people who fought for Britain. Thousands responded.", lessonId: 48 },
  { month: 11, day: 15, year: 1777, event: "Articles of Confederation adopted", detail: "America's first constitution. Too weak to work — but a start.", lessonId: 71 },
  { month: 11, day: 16, year: 1776, event: "Fort Washington falls", detail: "2,800 Americans captured. The darkest days of the Revolution.", lessonId: 26 },
  { month: 11, day: 25, year: 1783, event: "Last British troops leave New York", detail: "After seven years of occupation, the redcoats sailed away. Washington rode in.", lessonId: 70 },
  // December
  { month: 12, day: 15, year: 1791, event: "Bill of Rights ratified", detail: "Ten amendments. Ten promises. The freedoms we still fight about today.", lessonId: 78 },
  { month: 12, day: 16, year: 1773, event: "Boston Tea Party", detail: "342 chests of tea dumped into the harbor. 'The boldest stroke yet,' said John Adams.", lessonId: 10 },
  { month: 12, day: 19, year: 1777, event: "Army enters Valley Forge", detail: "12,000 men marched into winter camp. 2,000 would not march out.", lessonId: 34 },
  { month: 12, day: 23, year: 1783, event: "Washington resigns his commission", detail: "He gave the power back. The most important thing he ever did.", lessonId: 69 },
  { month: 12, day: 25, year: 1776, event: "Washington crosses the Delaware", detail: "Christmas night. Ice on the river. Everything at stake. The army crossed.", lessonId: 29 },
  { month: 12, day: 26, year: 1776, event: "Battle of Trenton", detail: "Dawn attack. Hessians surprised. 900 captured. Zero Americans killed in battle. Hope returned.", lessonId: 30 },
];

function getEventsForToday(): HistoricalEvent[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Get exact matches
  let events = historicalEvents.filter(e => e.month === month && e.day === day);
  
  // If no exact match, find closest events within 2 days
  if (events.length === 0) {
    events = historicalEvents.filter(e => e.month === month && Math.abs(e.day - day) <= 2);
  }
  
  // If still nothing, pick a random notable event from this month
  if (events.length === 0) {
    const monthEvents = historicalEvents.filter(e => e.month === month);
    if (monthEvents.length > 0) {
      events = [monthEvents[Math.floor(Math.random() * monthEvents.length)]];
    }
  }
  
  return events;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function ThisDayInHistory() {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [today, setToday] = useState<{ month: string; day: number }>({ month: "", day: 0 });

  useEffect(() => {
    const now = new Date();
    setToday({ month: monthNames[now.getMonth()], day: now.getDate() });
    setEvents(getEventsForToday());
  }, []);

  if (events.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] p-5 md:p-6 relative overflow-hidden"
    >
      {/* Decorative corner flourish */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M64 0 C64 35 35 64 0 64" stroke="currentColor" strokeWidth="1.5" className="text-[oklch(0.6_0.25_25)]" />
          <path d="M64 16 C64 43 43 64 16 64" stroke="currentColor" strokeWidth="1" className="text-[oklch(0.6_0.25_25)]" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-sm bg-[oklch(0.55_0.2_25/0.1)] border border-[oklch(0.55_0.2_25/0.2)] flex items-center justify-center">
          <Calendar className="w-5 h-5 text-[oklch(0.6_0.25_25)]" />
        </div>
        <div>
          <h3 className="font-[var(--font-display)] font-bold text-sm text-white">This Day in Revolution History</h3>
          <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">{today.month} {today.day}</p>
        </div>
      </div>

      {/* Events */}
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="relative pl-4 border-l-2 border-[oklch(0.55_0.2_25/0.3)]">
            <p className="text-xs font-[var(--font-sans)] font-medium text-[oklch(0.6_0.25_25)] mb-1">
              {monthNames[event.month - 1]} {event.day}, {event.year}
            </p>
            <p className="font-[var(--font-display)] font-bold text-base mb-1 text-white">{event.event}</p>
            <p className="text-sm font-[var(--font-body)] text-[oklch(0.6_0.02_250)] leading-relaxed">{event.detail}</p>
            {event.lessonId && (
              <Link href={`/lesson/${event.lessonId}`} className="inline-flex items-center gap-1 mt-2 text-xs font-[var(--font-sans)] font-medium text-[oklch(0.6_0.25_25)] hover:underline">
                <BookOpen className="w-3 h-3" />
                Read Night {event.lessonId}
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
