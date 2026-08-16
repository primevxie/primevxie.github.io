import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import ClickGuiPreview from '../components/ClickGuiPreview';
import { modules } from '../data/modules';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-glow relative overflow-hidden pt-40 pb-28 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-xs text-[var(--text-dim)] mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]" />
            built for legit-bypass play
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-[var(--text-main)]"
          >
            The quiet edge of a
            <br />
            <span className="italic text-gradient">ghost client.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-[var(--text-dim)] text-base md:text-lg"
          >
            Kryonix is a lightweight Minecraft ghost client — reach, velocity,
            killeffects, hitsounds and a full combat suite, tuned to stay
            undetected and out of the way.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/download" className="btn-primary px-7 py-3 text-sm flex items-center gap-2">
              download kryonix <ArrowRight size={16} />
            </Link>
            <a href="#features" className="btn-ghost px-7 py-3 text-sm">
              explore modules
            </a>
          </motion.div>
        </div>

        <div className="mt-20">
          <ClickGuiPreview />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-28 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--yellow-soft)] mb-4">modules</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text-main)]">
              Everything you need, <span className="italic text-gradient">nothing you don't.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="card p-6 hover:border-[var(--border-strong)] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon size={22} className="text-[var(--yellow)]" strokeWidth={1.6} />
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {m.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-[var(--text-main)] mb-2">{m.name}</h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed">{m.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hypixel loadout callout */}
      <section className="px-6 py-24 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl card p-8 md:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 shrink-0 rounded-full bg-[var(--yellow)]/10 p-2.5">
              <Info size={18} className="text-[var(--yellow)]" />
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--yellow-soft)] mb-3">
                recommended hypixel loadout
              </p>
              <h3 className="font-display text-2xl text-[var(--text-main)] mb-3">
                Stay under the radar.
              </h3>
              <p className="text-sm md:text-base text-[var(--text-dim)] leading-relaxed">
                For the cleanest run on Hypixel's anti-cheat, keep it minimal — 
                <span className="text-[var(--text-main)] font-medium"> AutoClicker</span> and
                <span className="text-[var(--text-main)] font-medium"> AimAssist</span> alone stay well within
                legit-bypass thresholds, and pairing them with
                <span className="text-[var(--text-main)] font-medium"> Eagle</span> (auto crouch-on-edge)
                is more than enough to speedbridge cleanly without tripping flags. Stack more modules on top
                and you're trading safety for convenience — your call.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text-main)] mb-6">
            Ready to play <span className="italic text-gradient">different?</span>
          </h2>
          <p className="text-[var(--text-dim)] mb-10 max-w-lg mx-auto">
            Create an account, grab the latest build, and drop in the jar.
            Free, non-profit, and updated regularly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-primary px-7 py-3 text-sm">
              create an account
            </Link>
            <Link to="/download" className="btn-ghost px-7 py-3 text-sm">
              go to downloads
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
