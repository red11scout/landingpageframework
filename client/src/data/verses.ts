// Verse rendering datasets for the Comparison Engine.
// Renderings transcribed from the published translations and standard reference works.

export interface VerseRendering {
  translationId: string;
  text: string;
  note?: string;
}

export interface Verse {
  id: string;
  reference: string;
  theme: string;
  original: string;
  originalLang: "Hebrew" | "Greek";
  transliteration?: string;
  context: string;
  renderings: VerseRendering[];
}

export const verses: Verse[] = [
  {
    id: "john1-1",
    reference: "John 1:1",
    theme: "The divinity of the Word",
    original:
      "Ἐν ἀρχῇ ἦν ὁ Λόγος, καὶ ὁ Λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ Λόγος.",
    originalLang: "Greek",
    transliteration:
      "En archē ēn ho Logos, kai ho Logos ēn pros ton Theon, kai Theos ēn ho Logos.",
    context:
      "The opening of John's Gospel deliberately echoes Genesis 1:1. The final clause — 'and the Word was God' — has anchored Trinitarian theology for centuries. Because the Greek 'theos' lacks a definite article (an 'anarthrous predicate'), a tiny grammatical detail carries enormous theological weight.",
    renderings: [
      { translationId: "kjv", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { translationId: "esv", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { translationId: "niv", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { translationId: "nasb95", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { translationId: "nrsvue", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { translationId: "csb", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { translationId: "nlt", text: "In the beginning the Word already existed. The Word was with God, and the Word was God." },
      { translationId: "message", text: "The Word was first, the Word present to God, God present to the Word. The Word was God, in readiness for God from day one." },
      { translationId: "osb", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
    ],
  },
  {
    id: "john3-16",
    reference: "John 3:16",
    theme: "The love of God",
    original:
      "Οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν...",
    originalLang: "Greek",
    transliteration:
      "Houtōs gar ēgapēsen ho theos ton kosmon, hōste ton huion ton monogenē edōken...",
    context:
      "Often called 'the gospel in a nutshell,' John 3:16 is the most quoted verse in the Bible. Compare how 'only begotten' (μονογενῆ, monogenē) becomes 'one and only' in modern versions as scholars reassess the Greek word's meaning.",
    renderings: [
      { translationId: "kjv", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { translationId: "nkjv", text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life." },
      { translationId: "esv", text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." },
      { translationId: "niv", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
      { translationId: "nasb95", text: "For God so loved the world, that He gave His only Son, so that everyone who believes in Him will not perish, but have eternal life." },
      { translationId: "csb", text: "For God loved the world in this way: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life." },
      { translationId: "nlt", text: "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life." },
      { translationId: "nrsvue", text: "For God so loved the world that he gave his only Son, so that everyone who believes in him may not perish but may have eternal life." },
      { translationId: "message", text: "This is how much God loved the world: He gave his Son, his one and only Son. And this is why: so that no one need be destroyed; by believing in him, anyone can have a whole and lasting life." },
    ],
  },
  {
    id: "gen1-1",
    reference: "Genesis 1:1",
    theme: "Creation",
    original: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃",
    originalLang: "Hebrew",
    transliteration: "Bereshit bara Elohim et hashamayim ve'et ha'aretz.",
    context:
      "The Bible's first sentence. A subtle grammatical question — whether bereshit is an absolute ('In the beginning, God created') or a construct ('When God began to create') — divides traditional Christian and modern Jewish renderings.",
    renderings: [
      { translationId: "kjv", text: "In the beginning God created the heaven and the earth." },
      { translationId: "esv", text: "In the beginning, God created the heavens and the earth." },
      { translationId: "niv", text: "In the beginning God created the heavens and the earth." },
      { translationId: "nasb95", text: "In the beginning God created the heavens and the earth." },
      { translationId: "nrsvue", text: "In the beginning when God created the heavens and the earth,", note: "Treats verse 1 as a dependent clause." },
      { translationId: "nlt", text: "In the beginning God created the heavens and the earth." },
      { translationId: "jps", text: "When God began to create heaven and earth—", note: "Construct reading favored in Jewish scholarship." },
      { translationId: "alter", text: "When God began to create heaven and earth,", note: "Robert Alter's literary rendering." },
      { translationId: "message", text: "First this: God created the Heavens and Earth—all you see, all you don't see." },
    ],
  },
  {
    id: "ps23-1",
    reference: "Psalm 23:1",
    theme: "God as shepherd",
    original: "יְהוָה רֹעִי לֹא אֶחְסָר׃",
    originalLang: "Hebrew",
    transliteration: "YHWH ro'i lo echsar.",
    context:
      "Perhaps the most beloved verse of poetry in Scripture. Notice how translations handle the divine name (LORD vs. Yahweh vs. GOD) and the archaic phrase 'I shall not want.'",
    renderings: [
      { translationId: "kjv", text: "The LORD is my shepherd; I shall not want." },
      { translationId: "esv", text: "The LORD is my shepherd; I shall not want." },
      { translationId: "nasb95", text: "The LORD is my shepherd, I shall not want." },
      { translationId: "niv", text: "The LORD is my shepherd, I lack nothing." },
      { translationId: "csb", text: "The LORD is my shepherd; I have what I need." },
      { translationId: "nlt", text: "The LORD is my shepherd; I have all that I need." },
      { translationId: "nrsvue", text: "The LORD is my shepherd; I shall not want." },
      { translationId: "lsb", text: "Yahweh is my shepherd; I will not be in need.", note: "Renders the divine name as 'Yahweh.'" },
      { translationId: "jps", text: "The LORD is my shepherd; I lack nothing." },
      { translationId: "message", text: "GOD, my shepherd! I don't need a thing." },
    ],
  },
  {
    id: "isa7-14",
    reference: "Isaiah 7:14",
    theme: "Virgin or young woman?",
    original: "הִנֵּה הָעַלְמָה הָרָה וְיֹלֶדֶת בֵּן",
    originalLang: "Hebrew",
    transliteration: "Hinneh ha'almah harah veyoledet ben.",
    context:
      "The Hebrew 'almah' means 'young woman'; the strictly virginal term is 'betulah.' The Greek Septuagint rendered it 'parthenos' (virgin), and Matthew 1:23 quotes that Greek reading. Translations thus split along whether they follow the Hebrew or the Christological tradition.",
    renderings: [
      { translationId: "kjv", text: "Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel." },
      { translationId: "esv", text: "Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel." },
      { translationId: "niv", text: "The virgin will conceive and give birth to a son, and will call him Immanuel." },
      { translationId: "nasb95", text: "Behold, a virgin will be with child and bear a son, and she will call His name Immanuel." },
      { translationId: "nrsvue", text: "Look, the young woman is with child and shall bear a son, and shall name him Immanuel.", note: "Follows the Hebrew 'almah.'" },
      { translationId: "rsv", text: "Behold, a young woman shall conceive and bear a son, and shall call his name Immanuel.", note: "Sparked controversy on release in 1952." },
      { translationId: "jps", text: "Look, the young woman is with child and about to give birth to a son.", note: "Jewish reading: a sign in Isaiah's own day." },
      { translationId: "nabre", text: "the young woman, pregnant and about to bear a son, shall name him Emmanuel." },
    ],
  },
  {
    id: "1john5-7",
    reference: "1 John 5:7–8",
    theme: "The Comma Johanneum",
    original:
      "ὅτι τρεῖς εἰσιν οἱ μαρτυροῦντες, τὸ πνεῦμα καὶ τὸ ὕδωρ καὶ τὸ αἷμα...",
    originalLang: "Greek",
    transliteration: "hoti treis eisin hoi martyrountes...",
    context:
      "The most famous textual variant in the Bible. The Textus Receptus (and thus the KJV) contains an explicit Trinitarian formula absent from virtually all early Greek manuscripts. Modern critical editions omit it as a later Latin interpolation.",
    renderings: [
      { translationId: "kjv", text: "For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one. And there are three that bear witness in earth, the Spirit, and the water, and the blood: and these three agree in one.", note: "Includes the Comma." },
      { translationId: "nkjv", text: "For there are three that bear witness in heaven: the Father, the Word, and the Holy Spirit; and these three are one. And there are three that bear witness on earth: the Spirit, the water, and the blood; and these three agree as one.", note: "Includes the Comma; footnote notes it is absent from most Greek manuscripts." },
      { translationId: "esv", text: "For there are three that testify: the Spirit and the water and the blood; and these three agree.", note: "Comma omitted." },
      { translationId: "niv", text: "For there are three that testify: the Spirit, the water and the blood; and the three are in agreement.", note: "Comma omitted." },
      { translationId: "nasb95", text: "For there are three that testify: the Spirit and the water and the blood; and the three are in agreement.", note: "Comma omitted." },
      { translationId: "nrsvue", text: "There are three that testify: the Spirit and the water and the blood, and these three agree.", note: "Comma omitted." },
    ],
  },
];
