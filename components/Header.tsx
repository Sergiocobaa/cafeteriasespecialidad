import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background border-b-4 border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif font-black text-2xl tracking-tighter uppercase text-foreground">
            Cafeterías <span className="text-accent border-2 border-border px-1 rotate-1 inline-block group-hover:-rotate-2 transition-transform">Especialidad</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-base font-bold uppercase tracking-wider">
          <Link href="/sobre" className="border-b-2 border-transparent hover:border-foreground transition-colors">
            Info
          </Link>
          <Link href="/barcelona" className="border-2 border-border px-4 py-1 retro-shadow hover:retro-shadow-hover hover:-translate-y-1 transition-all bg-card">
            Barcelona
          </Link>
        </nav>
      </div>
    </header>
  );
}
