import Link from "next/link";
import { Cafeteria } from "../types/cafeteria";

interface Props {
  cafeteria: Cafeteria;
}

export default function CafeteriaCard({ cafeteria }: Props) {
  return (
    <Link 
      href={`/cafeterias/${cafeteria.slug}`}
      className="block group h-full"
    >
      <div className="bg-card border-4 border-border retro-shadow p-6 transition-all duration-200 group-hover:-translate-y-2 group-hover:retro-shadow-hover flex flex-col h-full">
        
        <div className="flex justify-between items-start mb-4 border-b-2 border-border pb-4">
          <div>
            <h3 className="text-2xl font-serif font-black text-foreground mb-1 uppercase tracking-tight group-hover:text-accent">
              {cafeteria.nombre}
            </h3>
            <p className="text-sm font-bold text-muted uppercase tracking-wider">
              {cafeteria.barrio ? `${cafeteria.barrio}, ` : ""}{cafeteria.ciudad}
            </p>
          </div>
          {cafeteria.miNota && (
            <div className="border-2 border-border bg-accent text-white px-2 py-1 font-bold text-sm transform rotate-3">
              ★ {cafeteria.miNota}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {cafeteria.tostadorPropio === "si" && (
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-1 border border-accent text-accent">
              Tostador
            </span>
          )}
          {cafeteria.metodos.slice(0, 3).map(metodo => (
            <span key={metodo} className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-1 border border-border text-muted">
              {metodo}
            </span>
          ))}
          {cafeteria.aptoPortatil === "si" && (
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-1 border border-border text-muted">
              Apto Portátil
            </span>
          )}
          {cafeteria.terraza === "si" && (
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-1 border border-border text-muted">
              Terraza
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
