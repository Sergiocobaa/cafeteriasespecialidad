import { getCafeterias } from "@/lib/sheets";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Criterio y Directorio",
  description: "Criterios de selección y listado completo de cafeterías de especialidad clasificadas por ciudad y barrio.",
};

export default async function DirectorioPage() {
  const cafeterias = await getCafeterias();
  
  // Agrupar por ciudad y luego por barrio
  const grouped: Record<string, Record<string, typeof cafeterias>> = {};
  
  for (const c of cafeterias) {
    const ciudad = c.ciudad;
    const barrio = c.barrio || "Otros / Sin Barrio";
    
    if (!grouped[ciudad]) grouped[ciudad] = {};
    if (!grouped[ciudad][barrio]) grouped[ciudad][barrio] = [];
    
    grouped[ciudad][barrio].push(c);
  }

  // Ordenar ciudades alfabéticamente
  const ciudades = Object.keys(grouped).sort();

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Encabezado: El Criterio */}
        <section className="mb-20 border-b-4 border-border pb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-foreground mb-10 leading-none">
            EL CRITERIO.
          </h1>
          <div className="space-y-8 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
            <div className="border-l-4 border-foreground pl-5">
              <strong className="text-accent uppercase tracking-widest font-black text-sm block mb-1">El Origen</strong>
              <p className="text-muted">Solo cafeterías con trazabilidad del grano. Si no saben de dónde viene su café, no están aquí.</p>
            </div>
            <div className="border-l-4 border-foreground pl-5">
              <strong className="text-accent uppercase tracking-widest font-black text-sm block mb-1">El Tueste</strong>
              <p className="text-muted">Tostador propio o de terceros reconocidos en la tercera ola. Tuestes claros a medios, nunca quemados.</p>
            </div>
            <div className="border-l-4 border-foreground pl-5">
              <strong className="text-accent uppercase tracking-widest font-black text-sm block mb-1">La Taza</strong>
              <p className="text-muted">Baristas formados y métodos manuales (V60, Aeropress). Leche bien texturizada, sin quemar.</p>
            </div>
          </div>
        </section>

        {/* El Listado (Directorio Maestro) */}
        <section>
          <div className="mb-12 flex flex-col">
            <h2 className="text-5xl md:text-6xl font-serif font-black uppercase tracking-tighter text-foreground mb-2 leading-none">
              DIRECTORIO.
            </h2>
            <p className="text-sm font-bold uppercase tracking-widest text-accent mb-8">
              LISTADO COMPLETO POR ZONAS
            </p>
          </div>

          <div className="space-y-16">
            {ciudades.map(ciudad => (
              <article key={ciudad} className="relative">
                {/* Ciudad (h2) */}
                <h2 className="text-4xl font-serif font-black uppercase tracking-tighter text-foreground mb-6 border-b-4 border-border pb-2 inline-block">
                  {ciudad}
                </h2>
                
                <div className="space-y-10 mt-4 md:pl-4">
                  {Object.keys(grouped[ciudad]).sort().map(barrio => (
                    <div key={barrio}>
                      {/* Barrio (h3) */}
                      <h3 className="text-lg font-bold uppercase tracking-widest text-foreground mb-4 border-l-4 border-accent pl-3 bg-card py-1">
                        {barrio}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 md:pl-8">
                        {grouped[ciudad][barrio].sort((a,b) => a.nombre.localeCompare(b.nombre)).map(cafe => (
                          <li key={cafe.slug} className="flex items-center before:content-[''] before:w-2 before:h-2 before:bg-border before:mr-3 before:inline-block">
                            <Link href={`/cafeterias/${cafe.slug}`} className="text-lg font-bold font-serif hover:text-accent hover:underline decoration-accent decoration-2 underline-offset-4 transition-colors">
                              {cafe.nombre}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
