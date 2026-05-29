import CafeteriaCard from "@/components/CafeteriaCard";
import { getCafeterias } from "@/lib/sheets";
import Link from "next/link";

export default async function Home() {
  // Fetch real data from Google Sheets
  const cafeterias = await getCafeterias();

  return (
    <main className="flex-1 flex flex-col">
      {/* Editorial Title Section */}
      <section className="px-4 sm:px-6 py-12 md:py-20 border-b-4 border-border flex flex-col">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-serif font-black leading-none uppercase tracking-tighter text-foreground mb-6 break-words">
          CAFETERÍAS <br/> DE ESPECIALIDAD.
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-7xl">
          <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-muted max-w-2xl border-l-4 border-accent pl-4">
            DIRECTORIO INDEPENDIENTE. SÓLO CAFÉ DE ESPECIALIDAD EN CATALUNYA. CON CRITERIO RIGUROSO.
          </p>
          <div className="flex gap-4">
            <button className="bg-foreground text-background border-4 border-foreground hover:bg-background hover:text-foreground px-8 py-3 font-black uppercase tracking-wider text-lg retro-shadow hover:retro-shadow-hover hover:-translate-y-1 transition-all">
              LEER MÁS
            </button>
            <Link href="/explorar" className="bg-accent text-white border-4 border-border hover:bg-accent-hover px-8 py-3 font-black uppercase tracking-wider text-lg retro-shadow hover:retro-shadow-hover hover:-translate-y-1 transition-all text-center">
              EXPLORAR EL MAPA
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-4 sm:px-6 py-12 flex-1">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8 border-b-4 border-border pb-4">
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter">
              Destacadas
            </h2>
            <span className="text-lg font-bold uppercase border-2 border-border px-3 py-1 retro-shadow bg-card">
              EDICIÓN SEMANAL
            </span>
          </div>
          
          {/* Brutalist Grid with Real Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cafeterias.map((cafeteria) => (
              <CafeteriaCard key={cafeteria.slug} cafeteria={cafeteria} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
