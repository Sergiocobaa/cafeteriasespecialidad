import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background border-b-4 border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-auto min-h-[5rem] py-4 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif font-black text-xl md:text-2xl tracking-tighter uppercase text-foreground">
            Cafeterías <span className="text-accent border-2 border-border px-1 rotate-1 inline-block group-hover:-rotate-2 transition-transform">Especialidad</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
