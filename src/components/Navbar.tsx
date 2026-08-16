import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
    navigate('/');
  };

  const links = (
    <>
      <Link to="/" onClick={() => setOpen(false)} className="hover:text-[var(--yellow)] transition-colors">
        home
      </Link>
      <a href="/#features" onClick={() => setOpen(false)} className="hover:text-[var(--yellow)] transition-colors">
        features
      </a>
      <Link to="/download" onClick={() => setOpen(false)} className="hover:text-[var(--yellow)] transition-colors">
        download
      </Link>
      {user && (
        <Link to="/dashboard" onClick={() => setOpen(false)} className="hover:text-[var(--yellow)] transition-colors">
          dashboard
        </Link>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0906]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl tracking-tight text-[var(--text-main)]">
          Kryo<span className="text-gradient italic">nix</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-dim)]">
          {links}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button onClick={handleLogout} className="btn-primary px-5 py-2 text-sm">
              logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">
                login
              </Link>
              <Link to="/register" className="btn-primary px-5 py-2 text-sm">
                register
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-[var(--text-main)]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-sm text-[var(--text-dim)]">
          {links}
          {user ? (
            <button onClick={handleLogout} className="btn-primary px-5 py-2 text-sm w-fit">
              logout
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" onClick={() => setOpen(false)} className="text-[var(--text-dim)]">
                login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary px-5 py-2 text-sm">
                register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
