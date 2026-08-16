import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg text-[var(--text-main)]">
          Kryo<span className="text-gradient italic">nix</span>
        </p>
        <p className="text-xs text-[var(--text-muted)] text-center">
          kryonix is a free, non-profit ghost client for minecraft. not affiliated with mojang or hypixel.
        </p>
        <div className="flex gap-6 text-xs text-[var(--text-dim)]">
          <Link to="/download" className="hover:text-[var(--yellow)] transition-colors">download</Link>
          <a href="/#features" className="hover:text-[var(--yellow)] transition-colors">features</a>
          <Link to="/login" className="hover:text-[var(--yellow)] transition-colors">login</Link>
        </div>
      </div>
    </footer>
  );
}
