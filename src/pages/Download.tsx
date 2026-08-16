import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, DownloadCloud, Lock, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ReleaseInfo {
  version: string;
  date: string;
  url: string;
}

const AD_LINK = 'https://www.effectivecpmnetwork.com/de7z032ic?key=a9ff642b4cb7274cb8ec955b9de3c3fb';
const FALLBACK_URL = 'https://github.com/primevxie/publicfiles/releases/latest';

export default function Download() {
  const { user, loading } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [supporting, setSupporting] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [releaseError, setReleaseError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repos/primevxie/publicfiles/releases/latest')
      .then((r) => r.json())
      .then((data) => {
        const jar = data.assets?.find((a: { name: string }) => a.name.endsWith('.jar'));
        const date = data.published_at
          ? new Date(data.published_at).toLocaleDateString('en-us', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : '';
        setRelease({
          version: data.tag_name || 'latest',
          date,
          url: jar?.browser_download_url || FALLBACK_URL,
        });
      })
      .catch(() => setReleaseError(true));
  }, []);

  useEffect(() => {
    if (!supporting || step === 2) return;
    if (seconds <= 0) {
      const t = setTimeout(() => setStep(2), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [supporting, seconds, step]);

  if (loading) {
    return <div className="min-h-screen" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const startSupport = () => {
    window.open(AD_LINK, '_blank', 'noopener');
    setSupporting(true);
  };

  const progress = ((10 - seconds) / 10) * 100;

  return (
    <div className="bg-glow min-h-screen px-6 pt-40 pb-28">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--yellow-soft)] mb-4">download</p>
        <h1 className="font-display text-4xl md:text-5xl text-[var(--text-main)] mb-4">
          Ready to <span className="italic text-gradient">download?</span>
        </h1>
        <p className="text-[var(--text-dim)] text-sm md:text-base mb-12">
          kryonix is completely free and non-profit. clicking the link below helps us maintain the
          project and keep it alive. thank you for your support.
        </p>

        {/* step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <StepDot active={step === 1} done={step > 1} label="support us" number={1} />
          <div className="h-px w-10 bg-[var(--border)]" />
          <StepDot active={step === 2} done={false} label="download" number={2} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="card p-8"
            >
              <Heart size={28} className="mx-auto mb-4 text-[var(--yellow)]" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-[var(--text-main)] mb-3">support kryonix</h3>
              <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-6">
                we don't charge for kryonix. to keep the project running, please click the link below.
                it only takes a moment and helps us cover hosting and development costs.
              </p>

              {!supporting ? (
                <button onClick={startSupport} className="btn-primary w-full py-3.5 text-sm">
                  click here to support us
                </button>
              ) : (
                <div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full bg-[var(--yellow)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-dim)]">
                    {seconds > 0 ? `unlocking download in ${seconds}s...` : 'download unlocked!'}
                  </p>
                </div>
              )}
              <p className="mt-4 text-[11px] text-[var(--text-muted)]">
                thank you for helping keep kryonix free.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card p-8"
            >
              <DownloadCloud size={28} className="mx-auto mb-4 text-[var(--yellow)]" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-[var(--text-main)] mb-1">grab the latest build</h3>
              <p className="font-display text-3xl italic text-gradient my-3">
                {releaseError ? 'error' : release?.version ?? 'loading...'}
              </p>
              <p className="text-xs text-[var(--text-dim)] mb-6">
                {releaseError
                  ? 'could not reach github. try the link below.'
                  : release?.date
                  ? `released ${release.date}`
                  : 'fetching latest release...'}
              </p>
              <a
                href={release?.url || FALLBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-3.5 text-sm inline-flex items-center justify-center gap-2"
              >
                <DownloadCloud size={16} /> download .jar
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <Link to="/" className="mt-10 inline-block text-sm text-[var(--text-dim)] hover:text-[var(--yellow)] transition-colors">
          ← back to home
        </Link>
      </div>
    </div>
  );
}

function StepDot({ active, done, label, number }: { active: boolean; done: boolean; label: string; number: number }) {
  return (
    <div className={`flex items-center gap-2 transition-opacity ${active || done ? 'opacity-100' : 'opacity-40'}`}>
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
          done
            ? 'bg-[var(--yellow)]/20 text-[var(--yellow)] border border-[var(--yellow)]/30'
            : active
            ? 'bg-[var(--yellow)] text-[#14120a]'
            : 'bg-white/5 text-[var(--text-dim)] border border-[var(--border)]'
        }`}
      >
        {done ? <Check size={13} /> : number}
      </div>
      <span className={`text-xs font-medium ${active ? 'text-[var(--text-main)]' : 'text-[var(--text-dim)]'}`}>
        {label}
      </span>
    </div>
  );
}

export function LockedNote() {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <Lock size={12} /> login required to download
    </div>
  );
}
