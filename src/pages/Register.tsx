import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      navigate('/dashboard');
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <AuthCard mode="register">
        <div className="py-6 text-center">
          <p className="text-sm text-[var(--text-main)] mb-2">check your inbox</p>
          <p className="text-xs text-[var(--text-dim)]">
            we've sent a confirmation link to <span className="text-[var(--yellow-soft)]">{email}</span>. verify
            your email to activate your account.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard mode="register">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5">username</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="kryonix_user"
              className="input-field w-full py-3 pl-10 pr-4 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5">email address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-field w-full py-3 pl-10 pr-4 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5">password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field w-full py-3 pl-10 pr-4 text-sm"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2">
          {loading && <Loader2 size={16} className="animate-spin" />}
          create an account
        </button>
      </form>
    </AuthCard>
  );
}
