import { motion } from "framer-motion";
import { ArrowDown, ScrollText } from "lucide-react";
import { StatBadge } from "./primitives";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.12 },
  }),
};

export function Hero() {
  return (
    <section className="parchment-texture relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* layered ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vw] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* faint scripture watermark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -right-10 top-24 hidden select-none font-serif text-[16rem] leading-none text-primary md:block"
      >
        ℵ
      </motion.div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent backdrop-blur"
          >
            <ScrollText className="h-3.5 w-3.5" />
            An Interactive Scholarly Atlas
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl md:text-7xl"
          >
            How We Got
            <br />
            <span className="bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">
              the Bible
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            From clay-dust scribes and Greek scrolls to the dozens of English
            translations on shelves today — explore three thousand years of
            manuscripts, councils, and competing canons in one living map.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() =>
                document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.03] hover:shadow-xl"
            >
              Begin the Journey
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() =>
                document.getElementById("compare")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-accent"
            >
              Compare a Verse
            </button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4"
          >
            <StatBadge value="3,000+" label="Years of History" />
            <StatBadge value="24" label="English Versions" />
            <StatBadge value="5" label="Canon Traditions" />
            <StatBadge value="∞" label="Faithful Scribes" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
