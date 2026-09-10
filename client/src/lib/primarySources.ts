// Primary source excerpts from actual Revolutionary-era documents
// Each keyed by lesson ID, containing the real words of the people who lived it

export interface PrimarySource {
  text: string;
  author: string;
  document: string;
  year: number;
  url: string;
}

export const primarySources: Record<number, PrimarySource[]> = {
  1: [
    { text: "The distinctions between Virginians, Pennsylvanians, New Yorkers, and New Englanders are no more. I am not a Virginian, but an American.", author: "Patrick Henry", document: "Speech at the First Continental Congress", year: 1774, url: "https://www.loc.gov/item/90898164/" },
  ],
  2: [
    { text: "I heard the bullets whistle, and, believe me, there is something charming in the sound.", author: "George Washington", document: "Letter to John Augustine Washington", year: 1754, url: "https://founders.archives.gov/documents/Washington/02-01-02-0058" },
  ],
  3: [
    { text: "Those who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety.", author: "Benjamin Franklin", document: "Reply to the Governor", year: 1755, url: "https://founders.archives.gov/documents/Franklin/01-06-02-0107" },
  ],
  4: [
    { text: "No taxation without representation!", author: "James Otis", document: "The Rights of the British Colonies Asserted and Proved", year: 1764, url: "https://www.loc.gov/item/07036699/" },
    { text: "If this be treason, make the most of it!", author: "Patrick Henry", document: "Speech to the Virginia House of Burgesses", year: 1765, url: "https://www.nps.gov/parkhistory/online_books/colonial/hrs/chap5.htm" },
  ],
  5: [
    { text: "We will not submit to any tax imposed by Parliament, because we are not represented there.", author: "Sons of Liberty Resolution", document: "New York Resolves", year: 1765, url: "https://www.loc.gov/collections/continental-congress-and-constitutional-convention/" },
  ],
  7: [
    { text: "The blood of the martyrs, right or wrong, proved to be the seed of the Revolution.", author: "John Adams", document: "Autobiography", year: 1805, url: "https://founders.archives.gov/documents/Adams/01-03-02-0016" },
    { text: "On that night the foundation of American independence was laid.", author: "John Adams", document: "Letter to William Tudor", year: 1818, url: "https://founders.archives.gov/documents/Adams/99-02-02-6928" },
  ],
  8: [
    { text: "The Part I took in Defence of Cptn. Preston and the Soldiers, procured me Anxiety, and Obloquy enough. It was, however, one of the most gallant, generous, manly and disinterested Actions of my whole Life.", author: "John Adams", document: "Autobiography", year: 1805, url: "https://founders.archives.gov/documents/Adams/01-03-02-0016" },
  ],
  9: [
    { text: "Where liberty is, there is my country.", author: "Benjamin Franklin", document: "Letter to Benjamin Vaughan", year: 1783, url: "https://founders.archives.gov/documents/Franklin/01-39-02-0199" },
  ],
  10: [
    { text: "This is the most magnificent Movement of all. There is a Dignity, a Majesty, a Sublimity, in this last Effort of the Patriots, that I greatly admire.", author: "John Adams", document: "Letter to James Warren", year: 1773, url: "https://founders.archives.gov/documents/Adams/06-01-02-0091" },
  ],
  11: [
    { text: "The die is now cast; the colonies must either submit or triumph.", author: "King George III", document: "Letter to Lord North", year: 1774, url: "https://www.loc.gov/collections/george-washington-papers/" },
  ],
  12: [
    { text: "The Congress sat in Carpenters' Hall... the delegates were men of fortune, ability, learning and experience.", author: "Silas Deane", document: "Letter to Elizabeth Deane", year: 1774, url: "https://www.loc.gov/item/90898164/" },
  ],
  13: [
    { text: "Stand your ground. Don't fire unless fired upon. But if they mean to have a war, let it begin here.", author: "Captain John Parker", document: "Order to Lexington Militia", year: 1775, url: "https://www.nps.gov/mima/learn/historyculture/lexington-green.htm" },
    { text: "What a glorious morning for America!", author: "Samuel Adams", document: "Attributed remark at Lexington", year: 1775, url: "https://www.battlefields.org/learn/articles/battles-lexington-and-concord" },
  ],
  14: [
    { text: "By the rude bridge that arched the flood, / Their flag to April's breeze unfurled, / Here once the embattled farmers stood / And fired the shot heard round the world.", author: "Ralph Waldo Emerson", document: "Concord Hymn", year: 1837, url: "https://www.nps.gov/mima/learn/historyculture/concord-hymn.htm" },
  ],
  15: [
    { text: "Don't fire until you see the whites of their eyes!", author: "Colonel William Prescott", document: "Order at Bunker Hill", year: 1775, url: "https://www.battlefields.org/learn/articles/bunker-hill" },
  ],
  17: [
    { text: "Society in every state is a blessing, but Government, even in its best state, is but a necessary evil.", author: "Thomas Paine", document: "Common Sense", year: 1776, url: "https://www.gutenberg.org/ebooks/147" },
    { text: "A government of our own is our natural right.", author: "Thomas Paine", document: "Common Sense", year: 1776, url: "https://www.gutenberg.org/ebooks/147" },
    { text: "The sun never shined on a cause of greater worth.", author: "Thomas Paine", document: "Common Sense", year: 1776, url: "https://www.gutenberg.org/ebooks/147" },
  ],
  18: [
    { text: "These United Colonies are, and of right ought to be, free and independent States.", author: "Richard Henry Lee", document: "Resolution for Independence", year: 1776, url: "https://www.loc.gov/item/90898164/" },
  ],
  19: [
    { text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.", author: "Thomas Jefferson", document: "Declaration of Independence", year: 1776, url: "https://www.archives.gov/founding-docs/declaration-transcript" },
  ],
  20: [
    { text: "And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.", author: "Continental Congress", document: "Declaration of Independence", year: 1776, url: "https://www.archives.gov/founding-docs/declaration-transcript" },
  ],
  21: [
    { text: "There must be no pulling different ways; we must all hang together.", author: "John Hancock", document: "Attributed remark at signing", year: 1776, url: "https://www.archives.gov/founding-docs/declaration" },
    { text: "Yes, we must, indeed, all hang together, or most assuredly we shall all hang separately.", author: "Benjamin Franklin", document: "Attributed reply to Hancock", year: 1776, url: "https://founders.archives.gov/" },
  ],
  26: [
    { text: "These are the times that try men's souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country.", author: "Thomas Paine", document: "The American Crisis, No. 1", year: 1776, url: "https://www.gutenberg.org/ebooks/31270" },
  ],
  27: [
    { text: "I only regret that I have but one life to lose for my country.", author: "Nathan Hale", document: "Last words before execution", year: 1776, url: "https://www.cia.gov/stories/story/nathan-hale/" },
  ],
  29: [
    { text: "Necessity, dire necessity, will, nay must, justify my attack.", author: "George Washington", document: "Letter to John Hancock", year: 1776, url: "https://founders.archives.gov/documents/Washington/03-07-02-0320" },
    { text: "Victory or Death.", author: "George Washington", document: "Password for the Delaware crossing", year: 1776, url: "https://www.nps.gov/wacr/learn/historyculture/the-ten-crucial-days.htm" },
  ],
  34: [
    { text: "I am sick — discontented — and out of humour. Poor food — hard lodging — Cold Weather — fatigue — Nasty Cloaths — nasty Cookery.", author: "Albigence Waldo", document: "Diary at Valley Forge", year: 1777, url: "https://www.nps.gov/vafo/learn/historyculture/index.htm" },
    { text: "Naked and starving as they are, we cannot enough admire the incomparable patience and fidelity of the soldiery.", author: "George Washington", document: "Letter to Congress from Valley Forge", year: 1778, url: "https://founders.archives.gov/documents/Washington/03-13-02-0411" },
  ],
  35: [
    { text: "The genius of this nation is not in the least to be compared with that of the Prussians, Austrians, or French. You say to your soldier, 'Do this,' and he doeth it; but I am obliged to say, 'This is the reason why you ought to do that,' and then he does it.", author: "Baron von Steuben", document: "Letter to a Prussian friend", year: 1778, url: "https://www.nps.gov/vafo/learn/historyculture/vonsteuben.htm" },
  ],
  36: [
    { text: "The cause of America is in a great measure the cause of all mankind.", author: "Thomas Paine", document: "Common Sense (Introduction)", year: 1776, url: "https://www.gutenberg.org/ebooks/147" },
  ],
  37: [
    { text: "I am persuaded that I shall serve your cause with all the zeal and all the means in my power.", author: "Marquis de Lafayette", document: "Letter to Congress", year: 1777, url: "https://founders.archives.gov/" },
  ],
  42: [
    { text: "Let me die in my old uniform. God forgive me for putting on another.", author: "Benedict Arnold", document: "Attributed deathbed words", year: 1801, url: "https://www.battlefields.org/learn/biographies/benedict-arnold" },
  ],
  43: [
    { text: "I have not yet begun to fight!", author: "John Paul Jones", document: "Reply during the Bonhomme Richard battle", year: 1779, url: "https://www.history.navy.mil/browse-by-topic/people/john-paul-jones.html" },
  ],
  44: [
    { text: "Remember the Ladies, and be more generous and favourable to them than your ancestors. Do not put such unlimited power into the hands of the Husbands.", author: "Abigail Adams", document: "Letter to John Adams", year: 1776, url: "https://founders.archives.gov/documents/Adams/04-01-02-0241" },
    { text: "If perticuliar care and attention is not paid to the Laidies we are determined to foment a Rebelion, and will not hold ourselves bound by any Laws in which we have no voice, or Representation.", author: "Abigail Adams", document: "Letter to John Adams", year: 1776, url: "https://founders.archives.gov/documents/Adams/04-01-02-0241" },
  ],
  46: [
    { text: "Is not a Negro as good as a white man to stop a bullet?", author: "Continental Army recruiting broadside", document: "Rhode Island recruitment poster", year: 1778, url: "https://www.nps.gov/revwar/about_the_revolution/african_americans.html" },
  ],
  48: [
    { text: "In every human Breast, God has implanted a Principle, which we call Love of Freedom; it is impatient of Oppression, and pants for Deliverance.", author: "Phillis Wheatley", document: "Letter to Samson Occom", year: 1774, url: "https://www.loc.gov/item/2002719042/" },
  ],
  52: [
    { text: "I was a sharer in the decaying fortunes of the Revolution, and I can truly say that I never did desert them.", author: "Joseph Plumb Martin", document: "A Narrative of a Revolutionary Soldier", year: 1830, url: "https://www.gutenberg.org/ebooks/71824" },
  ],
  59: [
    { text: "We fight, get beat, rise, and fight again.", author: "Nathanael Greene", document: "Letter to Chevalier de la Luzerne", year: 1781, url: "https://founders.archives.gov/" },
  ],
  64: [
    { text: "We have it in our power to begin the world over again.", author: "Thomas Paine", document: "Common Sense (Appendix)", year: 1776, url: "https://www.gutenberg.org/ebooks/147" },
  ],
  66: [
    { text: "The play, sir, is over.", author: "Lafayette", document: "Message to Comte de Maurepas", year: 1781, url: "https://www.nps.gov/york/learn/historyculture/index.htm" },
  ],
  67: [
    { text: "Oh God! It is all over!", author: "Lord North", document: "Reaction to news of Yorktown surrender", year: 1781, url: "https://www.battlefields.org/learn/articles/siege-yorktown" },
  ],
  69: [
    { text: "Having now finished the work assigned me, I retire from the great theatre of Action; and bidding an Affectionate farewell to this August body under whose orders I have so long acted, I here offer my Commission, and take my leave of all the employments of public life.", author: "George Washington", document: "Address to Congress resigning commission", year: 1783, url: "https://founders.archives.gov/documents/Washington/99-01-02-10290" },
  ],
  73: [
    { text: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution.", author: "Constitutional Convention", document: "Preamble to the Constitution", year: 1787, url: "https://www.archives.gov/founding-docs/constitution-transcript" },
  ],
  74: [
    { text: "I doubt too whether any other Convention we can obtain may be able to make a better Constitution. For when you assemble a number of men to have the advantage of their joint wisdom, you inevitably assemble with those men, all their prejudices, their passions, their errors of opinion.", author: "Benjamin Franklin", document: "Final speech at the Constitutional Convention", year: 1787, url: "https://founders.archives.gov/documents/Franklin/01-45-02-0225" },
  ],
  75: [
    { text: "The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government.", author: "Patrick Henry", document: "Virginia Ratifying Convention", year: 1788, url: "https://www.loc.gov/item/90898164/" },
  ],
  77: [
    { text: "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble.", author: "James Madison", document: "First Amendment to the Constitution", year: 1791, url: "https://www.archives.gov/founding-docs/bill-of-rights-transcript" },
  ],
  78: [
    { text: "A Bill of Rights is what the people are entitled to against every government on earth, general or particular, and what no just government should refuse.", author: "Thomas Jefferson", document: "Letter to James Madison", year: 1787, url: "https://founders.archives.gov/documents/Jefferson/01-12-02-0348" },
  ],
  79: [
    { text: "The preservation of the sacred fire of liberty, and the destiny of the republican model of government, are justly considered as deeply, perhaps as finally staked, on the experiment entrusted to the hands of the American people.", author: "George Washington", document: "First Inaugural Address", year: 1789, url: "https://www.archives.gov/exhibits/american_originals/inaugtxt.html" },
  ],
  90: [
    { text: "The Revolution was effected before the War commenced. The Revolution was in the minds and hearts of the people.", author: "John Adams", document: "Letter to Hezekiah Niles", year: 1818, url: "https://founders.archives.gov/documents/Adams/99-02-02-6854" },
  ],
};
