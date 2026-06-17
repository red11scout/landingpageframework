// Canon, manuscript, timeline, variant, lens, and quiz datasets.

/* ------------------------------------------------------------------ */
/* CANON                                                               */
/* ------------------------------------------------------------------ */

export interface CanonTradition {
  id: string;
  name: string;
  totalBooks: string;
  otBooks: string;
  ntBooks: number;
  defined: string;
  summary: string;
  color: string;
}

export const canonTraditions: CanonTradition[] = [
  {
    id: "jewish",
    name: "Jewish (Tanakh)",
    totalBooks: "24",
    otBooks: "24 (Torah, Nevi'im, Ketuvim)",
    ntBooks: 0,
    defined: "c. 200 BC – 100 AD",
    summary:
      "The Hebrew Bible, counted as 24 books. The same content as the Protestant Old Testament, but ordered and combined differently and read entirely in Hebrew (with some Aramaic).",
    color: "var(--chart-3)",
  },
  {
    id: "protestant",
    name: "Protestant",
    totalBooks: "66",
    otBooks: "39",
    ntBooks: 27,
    defined: "16th–17th c. (e.g., 1563, 1647)",
    summary:
      "Reformers returned the Old Testament to the Hebrew canon, relegating the deuterocanonical books to a separate 'Apocrypha' section or omitting them entirely.",
    color: "var(--chart-1)",
  },
  {
    id: "catholic",
    name: "Roman Catholic",
    totalBooks: "73",
    otBooks: "46",
    ntBooks: 27,
    defined: "Trent, 1546 (dogmatic)",
    summary:
      "Includes seven deuterocanonical books (Tobit, Judith, Wisdom, Sirach, Baruch, 1–2 Maccabees) plus Greek additions to Esther and Daniel, following the Septuagint and the Vulgate.",
    color: "var(--chart-4)",
  },
  {
    id: "orthodox",
    name: "Eastern Orthodox",
    totalBooks: "76–79",
    otBooks: "49–51",
    ntBooks: 27,
    defined: "Synod of Jerusalem, 1672",
    summary:
      "Accepts the Catholic deuterocanon and adds 1 Esdras, the Prayer of Manasseh, 3 Maccabees, and Psalm 151, with 4 Maccabees often included as an appendix. The Septuagint is authoritative.",
    color: "var(--chart-5)",
  },
  {
    id: "ethiopian",
    name: "Ethiopian Orthodox",
    totalBooks: "81",
    otBooks: "54",
    ntBooks: 27,
    defined: "Ancient / traditional",
    summary:
      "The broadest canon in Christianity. Its 'broader' canon uniquely includes 1 Enoch and Jubilees — preserved completely only in Ge'ez — along with the Meqabyan books.",
    color: "var(--chart-2)",
  },
];

export interface BookRow {
  name: string;
  group: "Torah/Pentateuch" | "Historical" | "Wisdom" | "Prophets" | "Deuterocanon" | "Broader";
  jewish: boolean;
  protestant: boolean;
  catholic: boolean;
  orthodox: boolean;
  ethiopian: boolean;
}

// Representative set focused on the books that actually differ between traditions.
export const disputedBooks: BookRow[] = [
  { name: "Tobit", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "Judith", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "Wisdom of Solomon", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "Sirach (Ecclesiasticus)", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "Baruch + Letter of Jeremiah", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "1 Maccabees", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "2 Maccabees", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "Greek additions to Esther", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "Greek additions to Daniel", group: "Deuterocanon", jewish: false, protestant: false, catholic: true, orthodox: true, ethiopian: true },
  { name: "1 Esdras", group: "Deuterocanon", jewish: false, protestant: false, catholic: false, orthodox: true, ethiopian: true },
  { name: "Prayer of Manasseh", group: "Deuterocanon", jewish: false, protestant: false, catholic: false, orthodox: true, ethiopian: true },
  { name: "3 Maccabees", group: "Deuterocanon", jewish: false, protestant: false, catholic: false, orthodox: true, ethiopian: true },
  { name: "Psalm 151", group: "Deuterocanon", jewish: false, protestant: false, catholic: false, orthodox: true, ethiopian: true },
  { name: "4 Maccabees (appendix)", group: "Deuterocanon", jewish: false, protestant: false, catholic: false, orthodox: true, ethiopian: true },
  { name: "1 Enoch", group: "Broader", jewish: false, protestant: false, catholic: false, orthodox: false, ethiopian: true },
  { name: "Jubilees", group: "Broader", jewish: false, protestant: false, catholic: false, orthodox: false, ethiopian: true },
  { name: "1–3 Meqabyan", group: "Broader", jewish: false, protestant: false, catholic: false, orthodox: false, ethiopian: true },
];

/* ------------------------------------------------------------------ */
/* MANUSCRIPTS                                                         */
/* ------------------------------------------------------------------ */

export interface Manuscript {
  id: string;
  name: string;
  date: string;
  language: string;
  family: string;
  testament: "Old" | "New" | "Both";
  significance: string;
  housedAt: string;
}

export const manuscripts: Manuscript[] = [
  {
    id: "dss",
    name: "Dead Sea Scrolls",
    date: "c. 250 BC – 70 AD",
    language: "Hebrew / Aramaic / Greek",
    family: "Pre-Masoretic",
    testament: "Old",
    significance:
      "Discovered at Qumran in 1947, they pushed our oldest Hebrew witnesses back a full millennium and revealed that the text of the Hebrew Bible was remarkably stable — while also preserving variant readings.",
    housedAt: "Israel Museum, Jerusalem",
  },
  {
    id: "lxx",
    name: "Septuagint (LXX)",
    date: "c. 250–100 BC",
    language: "Koine Greek",
    family: "Septuagint",
    testament: "Old",
    significance:
      "The Greek translation of the Hebrew Bible used by Greek-speaking Jews and the early Church. Most Old Testament quotations in the New Testament follow it, and it contains the deuterocanonical books.",
    housedAt: "Various codices",
  },
  {
    id: "p52",
    name: "Papyrus 52 (Rylands)",
    date: "c. 125 AD",
    language: "Koine Greek",
    family: "—",
    testament: "New",
    significance:
      "A credit-card-sized fragment of John 18, it is the earliest known surviving piece of the New Testament, placing the Gospel's circulation within decades of its composition.",
    housedAt: "John Rylands Library, Manchester",
  },
  {
    id: "p75",
    name: "Papyrus 75",
    date: "c. 175–225 AD",
    language: "Koine Greek",
    family: "Alexandrian",
    testament: "New",
    significance:
      "An early codex of Luke and John whose text is strikingly close to Codex Vaticanus, demonstrating that the Alexandrian text-type was carefully preserved across centuries.",
    housedAt: "Vatican Library",
  },
  {
    id: "sinaiticus",
    name: "Codex Sinaiticus",
    date: "c. 330–360 AD",
    language: "Koine Greek",
    family: "Alexandrian",
    testament: "Both",
    significance:
      "The oldest surviving complete New Testament and one of the two great fourth-century Bibles. Its discovery at St. Catherine's Monastery reshaped modern textual criticism.",
    housedAt: "British Library, London",
  },
  {
    id: "vaticanus",
    name: "Codex Vaticanus",
    date: "c. 300–325 AD",
    language: "Koine Greek",
    family: "Alexandrian",
    testament: "Both",
    significance:
      "Perhaps the single most important manuscript for reconstructing the original text. Together with Sinaiticus, it forms the backbone of modern critical editions.",
    housedAt: "Vatican Library",
  },
  {
    id: "alexandrinus",
    name: "Codex Alexandrinus",
    date: "c. 400–440 AD",
    language: "Koine Greek",
    family: "Mixed / Byzantine (Gospels)",
    testament: "Both",
    significance:
      "A fifth-century complete Bible whose Gospels show an early Byzantine character, helping scholars trace how the majority text developed.",
    housedAt: "British Library, London",
  },
  {
    id: "bezae",
    name: "Codex Bezae",
    date: "c. 400 AD",
    language: "Greek / Latin",
    family: "Western",
    testament: "New",
    significance:
      "The principal witness to the Western text-type, famous for its striking expansions and paraphrases, especially in the Book of Acts.",
    housedAt: "Cambridge University Library",
  },
  {
    id: "leningrad",
    name: "Leningrad Codex",
    date: "1008–1009 AD",
    language: "Hebrew",
    family: "Masoretic",
    testament: "Old",
    significance:
      "The oldest complete manuscript of the Hebrew Bible and the base text for nearly every modern scholarly edition (Biblia Hebraica) and Old Testament translation.",
    housedAt: "National Library of Russia",
  },
  {
    id: "tr",
    name: "Textus Receptus (Erasmus)",
    date: "1516 AD",
    language: "Koine Greek",
    family: "Byzantine",
    testament: "New",
    significance:
      "Erasmus's printed Greek New Testament, assembled from a handful of late Byzantine manuscripts. It became the basis for the Reformation Bibles and the King James Version.",
    housedAt: "Printed edition",
  },
];

export interface TextType {
  id: string;
  name: string;
  era: string;
  traits: string;
  usedBy: string;
  color: string;
}

export const textTypes: TextType[] = [
  {
    id: "alexandrian",
    name: "Alexandrian",
    era: "2nd–4th c.",
    traits: "Earliest, shortest, most austere readings.",
    usedBy: "Modern critical text (NA/UBS) → ESV, NIV, NASB, NRSV, CSB, NLT",
    color: "var(--chart-1)",
  },
  {
    id: "byzantine",
    name: "Byzantine",
    era: "5th c. onward",
    traits: "The vast majority of manuscripts; fuller, smoothed, harmonized.",
    usedBy: "Textus Receptus → KJV, NKJV",
    color: "var(--chart-2)",
  },
  {
    id: "western",
    name: "Western",
    era: "2nd–5th c.",
    traits: "Free, expansive paraphrase, especially in Acts.",
    usedBy: "Consulted in critical apparatus",
    color: "var(--chart-4)",
  },
  {
    id: "masoretic",
    name: "Masoretic Text",
    era: "7th–10th c.",
    traits: "The authoritative Hebrew Old Testament with vowel pointing.",
    usedBy: "Old Testament of nearly all translations",
    color: "var(--chart-3)",
  },
];

/* ------------------------------------------------------------------ */
/* TIMELINE                                                            */
/* ------------------------------------------------------------------ */

export interface TimelineEvent {
  year: number;
  display: string;
  title: string;
  description: string;
  era: "Ancient" | "Manuscript" | "Reformation" | "Modern";
}

export const timeline: TimelineEvent[] = [
  { year: -1400, display: "c. 1400–400 BC", title: "The Hebrew Scriptures are composed", description: "Over a millennium, the books of the Hebrew Bible are written, collected, and copied by scribes.", era: "Ancient" },
  { year: -250, display: "c. 250–100 BC", title: "The Septuagint is translated", description: "Jewish scholars in Alexandria translate the Hebrew Scriptures into Greek — the Bible of the early Church.", era: "Ancient" },
  { year: -150, display: "c. 150 BC – 70 AD", title: "The Dead Sea Scrolls are copied", description: "The Qumran community preserves biblical manuscripts a thousand years older than any previously known.", era: "Ancient" },
  { year: 50, display: "c. 50–100 AD", title: "The New Testament is written", description: "The letters, Gospels, and Revelation are composed in Koine Greek and begin circulating among churches.", era: "Ancient" },
  { year: 367, display: "367 AD", title: "Athanasius lists the 27 books", description: "His Festal Letter is the first surviving document to name exactly the 27 books of the New Testament.", era: "Manuscript" },
  { year: 405, display: "382–405 AD", title: "Jerome completes the Vulgate", description: "Commissioned by Pope Damasus, Jerome's Latin Bible becomes the standard text of Western Christianity for a thousand years.", era: "Manuscript" },
  { year: 397, display: "393–419 AD", title: "Councils of Hippo & Carthage", description: "Regional councils affirm the canon, including the deuterocanonical books, under Augustine's influence.", era: "Manuscript" },
  { year: 1009, display: "1008–1009 AD", title: "The Leningrad Codex", description: "The oldest complete Hebrew Bible is copied — still the base text for modern Old Testament scholarship.", era: "Manuscript" },
  { year: 1382, display: "1382 AD", title: "Wycliffe's English Bible", description: "John Wycliffe's circle produces the first complete English Bible, hand-translated from the Latin Vulgate.", era: "Reformation" },
  { year: 1455, display: "1455 AD", title: "The Gutenberg Bible", description: "The printing press makes the Bible reproducible at scale, igniting a revolution in literacy and distribution.", era: "Reformation" },
  { year: 1516, display: "1516 AD", title: "Erasmus's Greek New Testament", description: "The first published Greek New Testament becomes the 'Textus Receptus' underlying the Reformation Bibles.", era: "Reformation" },
  { year: 1525, display: "1525 AD", title: "Tyndale's New Testament", description: "William Tyndale translates directly from Greek into English; much of his wording survives in the KJV.", era: "Reformation" },
  { year: 1546, display: "1546 AD", title: "The Council of Trent", description: "In response to the Reformation, Rome dogmatically defines the 73-book Catholic canon.", era: "Reformation" },
  { year: 1611, display: "1611 AD", title: "The King James Version", description: "The Authorized Version is published, becoming the most influential English book for three centuries.", era: "Reformation" },
  { year: 1844, display: "1844–1859 AD", title: "Codex Sinaiticus rediscovered", description: "Constantin von Tischendorf recovers the fourth-century codex, transforming textual criticism.", era: "Modern" },
  { year: 1881, display: "1881 AD", title: "Westcott & Hort's critical text", description: "Their Greek New Testament establishes the Alexandrian text as the basis of modern translations.", era: "Modern" },
  { year: 1947, display: "1947 AD", title: "The Dead Sea Scrolls are discovered", description: "A Bedouin shepherd's find at Qumran becomes the greatest manuscript discovery of the century.", era: "Modern" },
  { year: 1978, display: "1978 AD", title: "The New International Version", description: "A fresh, mediating translation that becomes the best-selling modern English Bible.", era: "Modern" },
  { year: 1989, display: "1989 AD", title: "The New Revised Standard Version", description: "Becomes the academic standard, used across Protestant, Catholic, and Orthodox scholarship.", era: "Modern" },
  { year: 2021, display: "2021 AD", title: "The NRSV Updated Edition", description: "Incorporates decades of new scholarship and manuscript evidence — the cutting edge of the tradition.", era: "Modern" },
];

/* ------------------------------------------------------------------ */
/* TEXTUAL VARIANTS                                                    */
/* ------------------------------------------------------------------ */

export interface Variant {
  id: string;
  reference: string;
  name: string;
  // 0–100: scholarly confidence that the passage is a LATER ADDITION (not original)
  additionConfidence: number;
  consensus: string;
  whatItSays: string;
  evidence: string;
  modernTreatment: string;
}

export const variants: Variant[] = [
  {
    id: "comma",
    reference: "1 John 5:7–8",
    name: "The Comma Johanneum",
    additionConfidence: 99,
    consensus: "Near-universal: a later addition",
    whatItSays:
      "An explicit Trinitarian statement — 'the Father, the Word, and the Holy Ghost: and these three are one' — found in the KJV.",
    evidence:
      "Absent from every Greek manuscript before the 14th century and from the early Church Fathers, even in Trinitarian debates where it would have been decisive. It entered the printed Greek text via Latin tradition.",
    modernTreatment:
      "Omitted by virtually all modern translations or relegated to a footnote.",
  },
  {
    id: "mark-ending",
    reference: "Mark 16:9–20",
    name: "The Longer Ending of Mark",
    additionConfidence: 85,
    consensus: "Majority: not original to Mark",
    whatItSays:
      "Twelve verses describing resurrection appearances, the Great Commission, snake-handling, and drinking poison unharmed.",
    evidence:
      "Absent from the two oldest complete manuscripts (Sinaiticus and Vaticanus). The vocabulary and style differ from the rest of Mark, and several early witnesses preserve a shorter alternate ending.",
    modernTreatment:
      "Usually printed but set off in brackets with a note that the earliest manuscripts end at verse 8.",
  },
  {
    id: "pericope",
    reference: "John 7:53–8:11",
    name: "The Woman Caught in Adultery",
    additionConfidence: 80,
    consensus: "Majority: not original to John",
    whatItSays:
      "The beloved story in which Jesus says, 'Let him who is without sin among you cast the first stone.'",
    evidence:
      "Absent from the earliest and best manuscripts; where present, it 'floats' to different locations (even into Luke). Yet many scholars regard it as a genuine, very early oral tradition about Jesus.",
    modernTreatment:
      "Retained but bracketed, with a note explaining its uncertain manuscript history.",
  },
  {
    id: "isa714",
    reference: "Isaiah 7:14",
    name: "Almah — 'Virgin' or 'Young Woman'?",
    additionConfidence: 35,
    consensus: "A translation choice, not a variant",
    whatItSays:
      "Whether the Hebrew 'almah' should be rendered 'virgin' (following the Greek Septuagint and Matthew) or 'young woman' (following the plain Hebrew).",
    evidence:
      "Not a manuscript difference but a lexical and theological decision. 'Almah' denotes a young woman of marriageable age; the specifically virginal term is 'betulah.' The Septuagint chose 'parthenos.'",
    modernTreatment:
      "Formal evangelical versions keep 'virgin'; academic and Jewish versions use 'young woman.'",
  },
  {
    id: "john1-18",
    reference: "John 1:18",
    name: "'Only Son' or 'Only God'?",
    additionConfidence: 40,
    consensus: "Strong support for 'God'",
    whatItSays:
      "Whether the verse reads 'the only begotten Son' (later manuscripts) or 'the only begotten God' / 'the one and only Son, himself God' (earliest manuscripts).",
    evidence:
      "The earliest Alexandrian witnesses (including P66 and P75) read 'God,' while the Byzantine tradition reads 'Son.' Modern translations increasingly adopt the stronger reading.",
    modernTreatment:
      "Newer versions render 'the only God' or 'God the only Son,' with a footnote for the alternative.",
  },
];

/* ------------------------------------------------------------------ */
/* THEOLOGICAL LENSES                                                  */
/* ------------------------------------------------------------------ */

export interface Lens {
  id: string;
  name: string;
  short: string;
  authority: string;
  canon: string;
  textPreference: string;
  voices: string;
  color: string;
}

export const lenses: Lens[] = [
  {
    id: "evangelical",
    name: "Conservative Evangelical",
    short: "Scripture alone, divinely inspired and authoritative.",
    authority: "Sola scriptura; a high view of inspiration and inerrancy.",
    canon: "66 books; the Apocrypha is valued historically but not canonical.",
    textPreference: "Generally embraces the critical text while defending traditional readings; favors formal-equivalence translations.",
    voices: "D. A. Carson, Daniel B. Wallace, Bruce Metzger (broadly)",
    color: "var(--chart-1)",
  },
  {
    id: "catholic",
    name: "Roman Catholic",
    short: "Scripture and Tradition, interpreted by the Magisterium.",
    authority: "Scripture, Sacred Tradition, and the teaching office of the Church together.",
    canon: "73 books, including the deuterocanon defined at Trent.",
    textPreference: "Honors the Vulgate heritage and the Septuagint; uses the NABRE, NJB, and RSV-CE.",
    voices: "Raymond E. Brown, Joseph Fitzmyer, John Meier",
    color: "var(--chart-4)",
  },
  {
    id: "orthodox",
    name: "Eastern Orthodox",
    short: "Scripture read within the living Tradition and liturgy of the Church.",
    authority: "Scripture as the heart of Holy Tradition, interpreted through the Fathers and worship.",
    canon: "A broader canon; the Septuagint is the authoritative Old Testament.",
    textPreference: "Prefers the Septuagint and the received Byzantine text; uses the Orthodox Study Bible.",
    voices: "John Behr, Andrew Louth, the Church Fathers",
    color: "var(--chart-5)",
  },
  {
    id: "academic",
    name: "Secular Academic",
    short: "The Bible as a historical and literary document.",
    authority: "Methodological naturalism; evidence, philology, and historical reconstruction.",
    canon: "Studies all canons descriptively, including non-canonical texts, without privileging any.",
    textPreference: "Follows the eclectic critical text; analyzes authorship, redaction, and transmission.",
    voices: "Bart D. Ehrman, Robert Alter, Elaine Pagels",
    color: "var(--muted-foreground)",
  },
  {
    id: "jewish",
    name: "Jewish Scholarship",
    short: "The Tanakh in Hebrew, within rabbinic tradition.",
    authority: "The Masoretic Text and centuries of rabbinic interpretation.",
    canon: "24 books of the Tanakh; the New Testament is not Scripture.",
    textPreference: "Reads the Hebrew on its own terms; resists Christological readings of the Hebrew Bible.",
    voices: "Adele Berlin, Marc Zvi Brettler, Robert Alter",
    color: "var(--chart-3)",
  },
];

// Per-verse perspective notes keyed by verse id → lens id.
export const lensPerspectives: Record<string, Partial<Record<string, string>>> = {
  "isa7-14": {
    evangelical:
      "Retains 'virgin,' following the Septuagint and Matthew 1:23, and reads the verse as a genuine prophecy of the virgin birth of Christ.",
    catholic:
      "Affirms the virginal and messianic reading while also recognizing a near-term fulfillment in Isaiah's day — a 'both/and' sense.",
    orthodox:
      "Reads 'parthenos' (virgin) with the Septuagint that the Church has always used, and sees Mary foreshadowed throughout.",
    academic:
      "Notes that 'almah' means 'young woman'; the sign concerns a child born in Isaiah's own political crisis, not a distant miracle.",
    jewish:
      "Understands the verse as referring to a young woman of Isaiah's time (often linked to Hezekiah), with no virgin-birth implication.",
  },
  "john1-1": {
    evangelical:
      "A cornerstone proof of Christ's full deity: the Word is qualitatively God, eternally distinct from yet equal to the Father.",
    catholic:
      "Affirms the eternal divinity of the Word (Logos), foundational to the doctrine of the Trinity defined at Nicaea.",
    orthodox:
      "The Logos is the eternal Son, of one essence with the Father — the heart of the Church's confession.",
    academic:
      "Analyzes the anarthrous predicate 'theos' as qualitative ('the Word was divine'), reflecting high Christology in the Johannine community.",
    jewish:
      "Outside the Tanakh; scholars compare the Logos concept to Hellenistic-Jewish thought such as Philo's, without confessional commitment.",
  },
  "gen1-1": {
    evangelical:
      "Reads an absolute beginning — God creates ex nihilo — affirming a deliberate origin of all things.",
    catholic:
      "Affirms creation from nothing by the Triune God, consistent with the Church's teaching.",
    orthodox:
      "Sees the Word through whom all things were made (John 1) already implied in the act of creation.",
    academic:
      "Notes the grammar may yield 'When God began to create…,' echoing ancient Near Eastern creation accounts.",
    jewish:
      "Classic rabbinic and modern Jewish renderings often read a construct: 'When God began to create…,' describing ordering of pre-existing chaos.",
  },
};

/* ------------------------------------------------------------------ */
/* QUIZ — "Which Bible Fits You?"                                      */
/* ------------------------------------------------------------------ */

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; weights: Partial<Record<string, number>> }[];
}

// weights point toward translation ids
export const quizQuestions: QuizQuestion[] = [
  {
    id: "purpose",
    question: "What will you mainly use it for?",
    options: [
      { label: "Deep, word-level study", weights: { nasb95: 3, esv: 2, lsb: 2, nrsvue: 2 } },
      { label: "Everyday reading & devotion", weights: { niv: 3, nlt: 2, csb: 2 } },
      { label: "Reading aloud or for new readers", weights: { nlt: 3, cev: 3, gnt: 2 } },
      { label: "Academic / scholarly work", weights: { nrsvue: 3, nrsv: 2, net: 2 } },
    ],
  },
  {
    id: "style",
    question: "Which language style appeals to you?",
    options: [
      { label: "Precise, even if a little formal", weights: { nasb95: 3, esv: 2, lsb: 2 } },
      { label: "Clear and balanced", weights: { niv: 3, csb: 2 } },
      { label: "Natural and conversational", weights: { nlt: 3, gnt: 2, cev: 2 } },
      { label: "Beautiful and literary", weights: { kjv: 3, njb: 2, alter: 2 } },
    ],
  },
  {
    id: "tradition",
    question: "What is your faith background?",
    options: [
      { label: "Protestant / Evangelical", weights: { esv: 2, niv: 2, csb: 2, nasb95: 1 } },
      { label: "Roman Catholic", weights: { nabre: 3, njb: 2 } },
      { label: "Eastern Orthodox", weights: { osb: 3 } },
      { label: "Jewish", weights: { jps: 3, alter: 2 } },
      { label: "Academic / none in particular", weights: { nrsvue: 3, net: 2 } },
    ],
  },
  {
    id: "text",
    question: "How do you feel about the underlying manuscripts?",
    options: [
      { label: "I want the earliest, critical text", weights: { esv: 2, nasb95: 2, nrsvue: 2, niv: 1 } },
      { label: "I value the traditional/Byzantine text", weights: { nkjv: 3, kjv: 2, osb: 1 } },
      { label: "I want to see the reasoning openly", weights: { net: 3 } },
      { label: "No strong preference", weights: { niv: 2, csb: 2, nlt: 1 } },
    ],
  },
  {
    id: "apocrypha",
    question: "Do you want the deuterocanonical books?",
    options: [
      { label: "Yes, include them", weights: { nrsvue: 2, nabre: 2, osb: 2, njb: 1 } },
      { label: "No, the 66-book canon", weights: { esv: 2, niv: 2, nasb95: 1, csb: 1 } },
      { label: "Doesn't matter to me", weights: { niv: 1, nlt: 1 } },
    ],
  },
];
