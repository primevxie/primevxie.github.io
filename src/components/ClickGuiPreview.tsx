import { motion } from 'framer-motion';

const categories = ['Combat', 'Movement', 'Visual', 'Audio'];

const rows: { name: string; on: boolean }[] = [
  { name: 'Reach', on: true },
  { name: 'Velocity', on: true },
  { name: 'AutoClicker', on: true },
  { name: 'AimAssist', on: false },
  { name: 'TriggerBot', on: false },
];

export default function ClickGuiPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      className="animate-float mx-auto w-full max-w-md"
    >
      <div className="card overflow-hidden shadow-[0_40px_120px_-40px_rgba(232,194,90,0.25)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">kryonix.gui</span>
        </div>

        <div className="flex">
          {/* category rail */}
          <div className="flex flex-col gap-1 border-r border-[var(--border)] p-3">
            {categories.map((c, i) => (
              <div
                key={c}
                className={`rounded-lg px-3 py-2 text-xs font-medium ${
                  i === 0
                    ? 'bg-[var(--yellow)] text-[#14120a]'
                    : 'text-[var(--text-dim)]'
                }`}
              >
                {c}
              </div>
            ))}
          </div>

          {/* module rows */}
          <div className="flex-1 p-4 space-y-2.5">
            {rows.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2.5 border border-white/5"
              >
                <span className="text-sm text-[var(--text-main)]">{r.name}</span>
                <span
                  className={`relative h-4 w-8 rounded-full transition-colors ${
                    r.on ? 'bg-[var(--yellow)]' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-[#0a0906] transition-all ${
                      r.on ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
