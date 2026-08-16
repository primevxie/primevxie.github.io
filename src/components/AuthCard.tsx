import { type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AuthCardProps {
  mode: 'login' | 'register';
  children: ReactNode;
}

export default function AuthCard({ mode, children }: AuthCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-glow min-h-screen flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[#111009] p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
      >
        {/* pill tab switch */}
        <div className="mb-8 flex rounded-full border border-[var(--border)] bg-white/[0.03] p-1 text-sm">
          <button
            onClick={() => navigate('/register')}
            className={`flex-1 rounded-full py-2 transition-colors ${
              mode === 'register'
                ? 'bg-[var(--yellow)] text-[#14120a] font-semibold'
                : 'text-[var(--text-dim)]'
            }`}
          >
            Sign up
          </button>
          <button
            onClick={() => navigate('/login')}
            className={`flex-1 rounded-full py-2 transition-colors ${
              mode === 'login'
                ? 'bg-[var(--yellow)] text-[#14120a] font-semibold'
                : 'text-[var(--text-dim)]'
            }`}
          >
            Sign in
          </button>
        </div>

        <h2 className="font-display text-2xl text-[var(--text-main)] mb-6">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>

        {children}

        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          By continuing, you agree to Kryonix's{' '}
          <span className="text-[var(--text-dim)]">Terms &amp; Service</span>.
        </p>

        <p className="mt-4 text-center text-sm text-[var(--text-dim)]">
          {mode === 'login' ? (
            <>
              don't have an account?{' '}
              <Link to="/register" className="text-[var(--text-main)] font-medium hover:text-[var(--yellow)]">
                sign up
              </Link>
            </>
          ) : (
            <>
              already have an account?{' '}
              <Link to="/login" className="text-[var(--text-main)] font-medium hover:text-[var(--yellow)]">
                sign in
              </Link>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
