import { getCafeterias } from "@/lib/sheets";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

// 1. Generate URLs for all cafeterias at build time
export async function generateStaticParams() {
  const cafeterias = await getCafeterias();
  return cafeterias.map((c) => ({
    slug: c.slug,
  }));
}

// 2. Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cafeterias = await getCafeterias();
  const cafe = cafeterias.find((c) => c.slug === slug);

  if (!cafe) return { title: "No encontrada" };

  return {
    title: cafe.nombre,
    description: `Descubre ${cafe.nombre} en ${cafe.ciudad}. ${cafe.miComentario || "Directorio de cafeterías de especialidad."}`,
  };
}

// 3. The page component itself
export default async function CafeteriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cafeterias = await getCafeterias();
  const cafe = cafeterias.find((c) => c.slug === slug);

  if (!cafe) notFound();

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Left Column: Title & Review */}
        <div className="flex-1">
          <Link href="/" className="inline-block mb-8 text-sm font-bold uppercase tracking-widest text-muted hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors">
            ← Volver al mapa
          </Link>
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-black uppercase tracking-tighter text-foreground mb-4 leading-none">
            {cafe.nombre}
          </h1>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-muted mb-8 border-l-4 border-accent pl-4">
            {cafe.barrio ? `${cafe.barrio}, ` : ""}{cafe.ciudad}
            {cafe.direccion && <span className="block text-sm mt-2 text-muted/70">{cafe.direccion}</span>}
          </p>

          {cafe.miNota && (
            <div className="bg-card border-4 border-border retro-shadow p-8 mt-12 relative">
              <span className="absolute -top-5 left-8 bg-accent text-white px-4 py-1 font-bold text-lg uppercase border-2 border-border transform -rotate-2">
                Nuestra Nota: {cafe.miNota}/10
              </span>
              {cafe.miComentario ? (
                <p className="text-xl md:text-2xl font-serif font-medium text-foreground mt-4 leading-relaxed">
                  "{cafe.miComentario}"
                </p>
              ) : (
                <p className="text-xl md:text-2xl font-serif font-medium text-muted mt-4 italic">
                  Sin comentario detallado por el momento.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Links */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          
          <div className="border-4 border-border bg-card p-6 retro-shadow">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-border pb-2 text-foreground">
              Ficha Técnica
            </h2>
            
            <dl className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-border/20 pb-2">
                <dt className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Tostador Propio</dt>
                <dd className="font-serif text-lg font-black uppercase text-accent">{cafe.tostadorPropio}</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-2">
                <dt className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Veggie / Vegano</dt>
                <dd className="font-serif text-lg font-black uppercase text-foreground">{cafe.veggie}</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-2">
                <dt className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Apto Portátil</dt>
                <dd className="font-serif text-lg font-black uppercase text-foreground">{cafe.aptoPortatil}</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-2">
                <dt className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Terraza</dt>
                <dd className="font-serif text-lg font-black uppercase text-foreground">{cafe.terraza}</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/20 pb-2">
                <dt className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Brunch</dt>
                <dd className="font-serif text-lg font-black uppercase text-foreground">{cafe.brunch}</dd>
              </div>
            </dl>

            {cafe.metodos.length > 0 && (
              <div className="mt-6">
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted mb-3">Métodos</h3>
                <div className="flex flex-wrap gap-2">
                  {cafe.metodos.map((m) => (
                    <span key={m} className="text-xs font-bold uppercase tracking-wider px-2 py-1 border border-border text-foreground">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {cafe.googleMapsUrl && (
              <a href={cafe.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="bg-foreground text-background border-4 border-foreground hover:bg-background hover:text-foreground text-center py-4 font-black uppercase tracking-wider text-lg retro-shadow hover:retro-shadow-hover hover:-translate-y-1 transition-all">
                Abrir Maps
              </a>
            )}
            {cafe.instagramUrl && (
              <a href={cafe.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-card text-foreground border-4 border-border text-center py-4 font-black uppercase tracking-wider text-lg retro-shadow hover:retro-shadow-hover hover:-translate-y-1 transition-all">
                Instagram
              </a>
            )}
            {cafe.web && (
              <a href={cafe.web} target="_blank" rel="noopener noreferrer" className="text-accent text-center font-bold uppercase tracking-widest hover:underline mt-2">
                Visitar Web Oficial
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
