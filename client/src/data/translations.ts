// The Bible Translation Atlas — Translation Catalog
// Data compiled from Christianbook reading-level tables, American Bible Society
// translation descriptions, publisher statements, and standard reference works.

export type Philosophy =
  | "Formal"
  | "Mediating"
  | "Dynamic"
  | "Paraphrase";

export type Tradition =
  | "Protestant"
  | "Catholic"
  | "Orthodox"
  | "Jewish"
  | "Ecumenical";

export interface Translation {
  id: string;
  abbr: string;
  name: string;
  year: number;
  philosophy: Philosophy;
  /** 0 (most dynamic) … 100 (most formal/literal) */
  literalness: number;
  readingLevel: number; // US grade level
  tradition: Tradition;
  otBasis: string;
  ntBasis: string;
  includesApocrypha: boolean;
  publisher: string;
  blurb: string;
  bestFor: string;
}

export const translations: Translation[] = [
  {
    id: "kjv",
    abbr: "KJV",
    name: "King James Version",
    year: 1611,
    philosophy: "Formal",
    literalness: 88,
    readingLevel: 12,
    tradition: "Protestant",
    otBasis: "Masoretic Text (Bomberg)",
    ntBasis: "Textus Receptus",
    includesApocrypha: true,
    publisher: "Church of England (Crown)",
    blurb:
      "The Authorized Version commissioned by King James I. The single most influential book in shaping the modern English language, it predates the discovery of the earliest manuscripts.",
    bestFor: "Literary majesty, memorization, historical study",
  },
  {
    id: "nkjv",
    abbr: "NKJV",
    name: "New King James Version",
    year: 1982,
    philosophy: "Formal",
    literalness: 80,
    readingLevel: 7,
    tradition: "Protestant",
    otBasis: "Masoretic Text",
    ntBasis: "Textus Receptus",
    includesApocrypha: false,
    publisher: "Thomas Nelson",
    blurb:
      "A modernization of the KJV that updates archaic language while retaining the underlying Textus Receptus and the cadence of the 1611 tradition.",
    bestFor: "Readers who love the KJV but want modern English",
  },
  {
    id: "asv",
    abbr: "ASV",
    name: "American Standard Version",
    year: 1901,
    philosophy: "Formal",
    literalness: 90,
    readingLevel: 11,
    tradition: "Protestant",
    otBasis: "Masoretic Text",
    ntBasis: "Critical (Westcott–Hort era)",
    includesApocrypha: false,
    publisher: "Thomas Nelson",
    blurb:
      "An American revision of the English Revised Version, prized for its rigid literalness and its influence on later literal translations such as the NASB.",
    bestFor: "Word study, translation comparison",
  },
  {
    id: "rsv",
    abbr: "RSV",
    name: "Revised Standard Version",
    year: 1952,
    philosophy: "Formal",
    literalness: 72,
    readingLevel: 12,
    tradition: "Ecumenical",
    otBasis: "Masoretic + Dead Sea Scrolls",
    ntBasis: "Critical (Nestle)",
    includesApocrypha: true,
    publisher: "National Council of Churches",
    blurb:
      "A mid-century revision of the KJV tradition that became the standard mainline academic Bible and, with editions for Catholics and the Orthodox, a genuinely ecumenical text.",
    bestFor: "Mainline study, ecumenical use",
  },
  {
    id: "nrsv",
    abbr: "NRSV",
    name: "New Revised Standard Version",
    year: 1989,
    philosophy: "Formal",
    literalness: 68,
    readingLevel: 11,
    tradition: "Ecumenical",
    otBasis: "Masoretic + Dead Sea Scrolls",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: true,
    publisher: "National Council of Churches",
    blurb:
      "The dominant translation in seminaries and universities, combining careful scholarship with gender-accurate language. Widely adopted across Protestant, Catholic, and Orthodox academia.",
    bestFor: "Academic and seminary study",
  },
  {
    id: "nrsvue",
    abbr: "NRSVue",
    name: "New Revised Standard Version, Updated Edition",
    year: 2021,
    philosophy: "Formal",
    literalness: 70,
    readingLevel: 11,
    tradition: "Ecumenical",
    otBasis: "Critical (BHS / DSS)",
    ntBasis: "Critical (Nestle–Aland 28)",
    includesApocrypha: true,
    publisher: "Friendship Press / SBL",
    blurb:
      "A 2021 update incorporating decades of new manuscript discoveries and textual scholarship, refining the NRSV with thousands of changes for accuracy and clarity.",
    bestFor: "Current critical scholarship",
  },
  {
    id: "nasb95",
    abbr: "NASB",
    name: "New American Standard Bible (1995)",
    year: 1995,
    philosophy: "Formal",
    literalness: 94,
    readingLevel: 11,
    tradition: "Protestant",
    otBasis: "Masoretic Text (BHS)",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: false,
    publisher: "The Lockman Foundation",
    blurb:
      "Often called the most word-for-word English translation, valued where the exact form of the underlying Hebrew and Greek matters most.",
    bestFor: "Rigorous word-level study",
  },
  {
    id: "nasb20",
    abbr: "NASB 2020",
    name: "New American Standard Bible (2020)",
    year: 2020,
    philosophy: "Formal",
    literalness: 90,
    readingLevel: 10,
    tradition: "Protestant",
    otBasis: "Masoretic Text (BHS)",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: false,
    publisher: "The Lockman Foundation",
    blurb:
      "A 2020 refresh of the NASB that smooths readability and adopts gender-accurate renderings while preserving its hallmark literal precision.",
    bestFor: "Literal study with modern readability",
  },
  {
    id: "lsb",
    abbr: "LSB",
    name: "Legacy Standard Bible",
    year: 2021,
    philosophy: "Formal",
    literalness: 95,
    readingLevel: 11,
    tradition: "Protestant",
    otBasis: "Masoretic Text (BHS)",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: false,
    publisher: "Lockman / 3:16 Publishing",
    blurb:
      "An offshoot of the NASB that pushes literalness further, consistently rendering the divine name as 'Yahweh' and prioritizing word concordance.",
    bestFor: "Maximal literal precision",
  },
  {
    id: "esv",
    abbr: "ESV",
    name: "English Standard Version",
    year: 2001,
    philosophy: "Formal",
    literalness: 78,
    readingLevel: 10,
    tradition: "Protestant",
    otBasis: "Masoretic Text (BHS)",
    ntBasis: "Critical (UBS / Nestle–Aland)",
    includesApocrypha: true,
    publisher: "Crossway",
    blurb:
      "An 'essentially literal' revision of the RSV that has become a favorite of conservative evangelical churches for both study and public reading.",
    bestFor: "Study and preaching in evangelical churches",
  },
  {
    id: "niv",
    abbr: "NIV",
    name: "New International Version",
    year: 2011,
    philosophy: "Mediating",
    literalness: 55,
    readingLevel: 8,
    tradition: "Protestant",
    otBasis: "Masoretic + Dead Sea Scrolls",
    ntBasis: "Critical (UBS / Nestle–Aland)",
    includesApocrypha: false,
    publisher: "Biblica / Zondervan",
    blurb:
      "The best-selling modern English Bible, balancing word-for-word and thought-for-thought translation for accessible accuracy across denominations.",
    bestFor: "All-purpose reading and study",
  },
  {
    id: "csb",
    abbr: "CSB",
    name: "Christian Standard Bible",
    year: 2017,
    philosophy: "Mediating",
    literalness: 60,
    readingLevel: 7,
    tradition: "Protestant",
    otBasis: "Masoretic Text (BHS)",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: false,
    publisher: "Holman / Lifeway",
    blurb:
      "Built on a philosophy of 'optimal equivalence,' the CSB aims to be as literal as possible while remaining clear, updating the earlier HCSB.",
    bestFor: "Readable accuracy for daily use",
  },
  {
    id: "nlt",
    abbr: "NLT",
    name: "New Living Translation",
    year: 2015,
    philosophy: "Dynamic",
    literalness: 30,
    readingLevel: 6,
    tradition: "Protestant",
    otBasis: "Masoretic Text",
    ntBasis: "Critical (UBS / Nestle–Aland)",
    includesApocrypha: false,
    publisher: "Tyndale House",
    blurb:
      "A thought-for-thought translation descended from the Living Bible, rendering Scripture in warm, natural English for clarity and devotional reading.",
    bestFor: "Devotional reading, new readers, youth",
  },
  {
    id: "net",
    abbr: "NET",
    name: "New English Translation",
    year: 2005,
    philosophy: "Mediating",
    literalness: 58,
    readingLevel: 7,
    tradition: "Protestant",
    otBasis: "Masoretic Text (BHS)",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: false,
    publisher: "Biblical Studies Press",
    blurb:
      "Famous for its 60,000+ translators' notes that openly document the textual and interpretive decisions behind each rendering.",
    bestFor: "Seeing the reasoning behind translation",
  },
  {
    id: "amp",
    abbr: "AMP",
    name: "Amplified Bible",
    year: 2015,
    philosophy: "Formal",
    literalness: 75,
    readingLevel: 11,
    tradition: "Protestant",
    otBasis: "Masoretic Text",
    ntBasis: "Critical",
    includesApocrypha: false,
    publisher: "The Lockman Foundation",
    blurb:
      "Uses brackets and parentheses to 'amplify' words with alternate shades of meaning, exposing the semantic range of the original languages.",
    bestFor: "Exploring word meaning without Greek/Hebrew",
  },
  {
    id: "cev",
    abbr: "CEV",
    name: "Contemporary English Version",
    year: 2006,
    philosophy: "Dynamic",
    literalness: 22,
    readingLevel: 5,
    tradition: "Ecumenical",
    otBasis: "Masoretic Text",
    ntBasis: "Critical (UBS)",
    includesApocrypha: true,
    publisher: "American Bible Society",
    blurb:
      "A meaning-based translation designed to be understood when read aloud, especially for children, youth, and those new to the Bible.",
    bestFor: "Reading aloud, children, ESL readers",
  },
  {
    id: "gnt",
    abbr: "GNT",
    name: "Good News Translation",
    year: 1992,
    philosophy: "Dynamic",
    literalness: 25,
    readingLevel: 6,
    tradition: "Ecumenical",
    otBasis: "Masoretic Text",
    ntBasis: "Critical (UBS)",
    includesApocrypha: true,
    publisher: "American Bible Society",
    blurb:
      "One of the first functional-equivalence English Bibles, presenting the message in everyday English common across the English-speaking world.",
    bestFor: "Accessible everyday reading",
  },
  {
    id: "message",
    abbr: "MSG",
    name: "The Message",
    year: 2002,
    philosophy: "Paraphrase",
    literalness: 8,
    readingLevel: 5,
    tradition: "Protestant",
    otBasis: "Hebrew (paraphrased)",
    ntBasis: "Greek (paraphrased)",
    includesApocrypha: false,
    publisher: "NavPress",
    blurb:
      "Eugene Peterson's vivid paraphrase that recasts Scripture in contemporary idiom to recover the tone and energy of the original for fresh reading.",
    bestFor: "Fresh perspective alongside a literal Bible",
  },
  {
    id: "douay",
    abbr: "DRB",
    name: "Douay–Rheims (Challoner)",
    year: 1752,
    philosophy: "Formal",
    literalness: 85,
    readingLevel: 12,
    tradition: "Catholic",
    otBasis: "Latin Vulgate",
    ntBasis: "Latin Vulgate",
    includesApocrypha: true,
    publisher: "English College, Rheims/Douai",
    blurb:
      "The classic English Catholic Bible translated from Jerome's Latin Vulgate, the Catholic counterpart to the early Protestant English Bibles.",
    bestFor: "Traditional Catholic devotion and history",
  },
  {
    id: "njb",
    abbr: "NJB",
    name: "New Jerusalem Bible",
    year: 1985,
    philosophy: "Formal",
    literalness: 62,
    readingLevel: 9,
    tradition: "Catholic",
    otBasis: "Masoretic + LXX",
    ntBasis: "Critical",
    includesApocrypha: true,
    publisher: "Darton, Longman & Todd",
    blurb:
      "A literary Catholic translation from the original languages, admired for its readability and scholarship; J.R.R. Tolkien contributed to its predecessor.",
    bestFor: "Literary Catholic reading and study",
  },
  {
    id: "nabre",
    abbr: "NABRE",
    name: "New American Bible, Revised Edition",
    year: 2011,
    philosophy: "Mediating",
    literalness: 58,
    readingLevel: 8,
    tradition: "Catholic",
    otBasis: "Masoretic + DSS + LXX",
    ntBasis: "Critical (Nestle–Aland)",
    includesApocrypha: true,
    publisher: "Confraternity of Christian Doctrine",
    blurb:
      "The standard study Bible for English-speaking Catholics in the United States, with extensive notes; the older NAB is used in the Mass lectionary.",
    bestFor: "US Catholic study",
  },
  {
    id: "osb",
    abbr: "OSB",
    name: "Orthodox Study Bible",
    year: 2008,
    philosophy: "Formal",
    literalness: 76,
    readingLevel: 9,
    tradition: "Orthodox",
    otBasis: "Septuagint (LXX)",
    ntBasis: "Textus Receptus (NKJV NT)",
    includesApocrypha: true,
    publisher: "St. Athanasius Academy / Thomas Nelson",
    blurb:
      "The first full English Orthodox study Bible, pairing an NKJV New Testament with an Old Testament translated from the Septuagint that the Church has always used.",
    bestFor: "Eastern Orthodox study and devotion",
  },
  {
    id: "jps",
    abbr: "JPS",
    name: "JPS Tanakh (NJPS)",
    year: 1985,
    philosophy: "Formal",
    literalness: 70,
    readingLevel: 11,
    tradition: "Jewish",
    otBasis: "Masoretic Text",
    ntBasis: "—",
    includesApocrypha: false,
    publisher: "Jewish Publication Society",
    blurb:
      "The standard modern Jewish translation of the Hebrew Bible, produced by Jewish scholars directly from the Masoretic Text without Christian framing.",
    bestFor: "Jewish study of the Hebrew Bible",
  },
  {
    id: "alter",
    abbr: "Alter",
    name: "The Hebrew Bible (Robert Alter)",
    year: 2018,
    philosophy: "Formal",
    literalness: 82,
    readingLevel: 12,
    tradition: "Jewish",
    otBasis: "Masoretic Text",
    ntBasis: "—",
    includesApocrypha: false,
    publisher: "W. W. Norton",
    blurb:
      "A celebrated single-scholar literary translation that strives to preserve the rhythm, syntax, and wordplay of the original Hebrew, with rich commentary.",
    bestFor: "Literary appreciation of the Hebrew Bible",
  },
];

export const philosophyMeta: Record<
  Philosophy,
  { label: string; description: string; color: string }
> = {
  Formal: {
    label: "Word-for-Word",
    description:
      "Formal equivalence preserves the grammar and vocabulary of the source text as closely as English allows.",
    color: "var(--chart-1)",
  },
  Mediating: {
    label: "Balanced",
    description:
      "Mediating / optimal equivalence seeks a middle path — as literal as possible, as clear as necessary.",
    color: "var(--chart-3)",
  },
  Dynamic: {
    label: "Thought-for-Thought",
    description:
      "Dynamic / functional equivalence prioritizes conveying the meaning in natural, idiomatic English.",
    color: "var(--chart-2)",
  },
  Paraphrase: {
    label: "Paraphrase",
    description:
      "A paraphrase freely restates the text in contemporary idiom, prioritizing readability over formal accuracy.",
    color: "var(--chart-4)",
  },
};

export const traditionList: Tradition[] = [
  "Protestant",
  "Catholic",
  "Orthodox",
  "Jewish",
  "Ecumenical",
];
