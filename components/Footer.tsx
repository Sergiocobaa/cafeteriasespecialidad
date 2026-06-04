import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Marca */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif font-black text-2xl md:text-3xl tracking-tighter uppercase text-foreground">
                Cafeterías <span className="text-accent border-2 border-border px-1 rotate-1 inline-block">Especialidad</span>
              </span>
            </Link>
            <p className="text-muted font-bold tracking-wider uppercase text-sm max-w-sm mb-6">
              El directorio independiente con el café más riguroso de Catalunya. Sin patrocinios ocultos, solo buen grano.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="border-2 border-border px-4 py-2 font-black uppercase text-xs retro-shadow hover:-translate-y-1 hover:retro-shadow-hover transition-all bg-background text-foreground">
                Instagram
              </a>
            </div>
          </div>

          {/* Contacto y Mejoras */}
          <div>
            <h3 className="font-serif font-black uppercase text-xl mb-4 border-b-2 border-border pb-2 inline-block">
              Proyecto
            </h3>
            <ul className="space-y-3 font-bold text-sm tracking-wider uppercase">
              <li>
                <Link href="/sobre" className="hover:text-accent transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-accent transition-colors">
                  Sugerir Cafetería
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-accent transition-colors">
                  Contacto / Mejoras
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif font-black uppercase text-xl mb-4 border-b-2 border-border pb-2 inline-block">
              Legal
            </h3>
            <ul className="space-y-3 font-bold text-sm tracking-wider uppercase text-muted">
              <li>
                <Link href="/legal/aviso-legal" className="hover:text-foreground transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t-2 border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted">
          <p>© {new Date().getFullYear()} CAFETERÍAS DE ESPECIALIDAD. Todos los derechos reservados.</p>
          <p>Hecho con ☕ en Catalunya.</p>
        </div>
      </div>
    </footer>
  );
}
