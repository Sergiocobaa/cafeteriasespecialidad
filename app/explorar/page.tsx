import { getCafeterias } from "@/lib/sheets";
import MapWrapper from "@/components/MapWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar Mapa",
  description: "Mapa interactivo con todas las cafeterías de especialidad de Catalunya.",
};

export default async function ExplorarPage() {
  const cafeterias = await getCafeterias();

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-foreground mb-4 leading-none break-words">
          EXPLORAR.
        </h1>
        <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-muted mb-8 border-l-4 border-accent pl-4">
          MAPA INTERACTIVO DE CAFÉ DE ESPECIALIDAD
        </p>

        <MapWrapper cafeterias={cafeterias} />
      </div>
    </main>
  );
}
