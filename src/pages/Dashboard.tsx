import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCircle2, DownloadCloud, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [tier, setTier] = useState('free');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('profiles')
          .select('subscription_tier, expires_at')
          .eq('id', user.id)
          .single();

        if (data) {
          const expired = data.expires_at ? new Date(data.expires_at) < new Date() : false;
          if (!expired && data.subscription_tier) {
            setTier(data.subscription_tier);
          }
        }
      } catch {
        // profiles table may not exist yet — default to free tier
      } finally {
        setChecking(false);
      }
    };
    loadProfile();
  }, [user]);

  if (loading) return <div className="min-h-screen" />;
  if (!user) return <Navigate to="/login" replace />;

  const username = (user.user_metadata?.username as string) || user.email?.split('@')[0];

  return (
    <div className="bg-glow min-h-screen px-6 pt-40 pb-28">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--yellow-soft)] mb-4">dashboard</p>
          <h1 className="font-display text-4xl text-[var(--text-main)] mb-2">
            welcome back, <span className="italic text-gradient">{username}</span>
          </h1>
          <p className="text-[var(--text-dim)] text-sm mb-12">{user.email}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <UserCircle2 className="text-[var(--yellow)] mb-4" size={22} strokeWidth={1.6} />
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">account</p>
            <p className="text-[var(--text-main)] font-medium">{user.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <ShieldCheck className="text-[var(--yellow)] mb-4" size={22} strokeWidth={1.6} />
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">status</p>
            <p className="text-[rgba(130,220,130,0.9)] font-medium">active</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <DownloadCloud className="text-[var(--yellow)] mb-4" size={22} strokeWidth={1.6} />
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">subscription</p>
            <p className="text-[var(--text-main)] font-medium capitalize">{checking ? '...' : tier}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card p-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-xl text-[var(--text-main)] mb-1">grab the latest build</h3>
            <p className="text-sm text-[var(--text-dim)]">head over to downloads for the newest .jar release.</p>
          </div>
          <Link to="/download" className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
            go to downloads
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
