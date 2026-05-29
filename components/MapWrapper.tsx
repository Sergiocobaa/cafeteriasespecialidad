"use client";

import dynamic from "next/dynamic";
import { Cafeteria } from "@/types/cafeteria";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[800px] border-4 border-border retro-shadow bg-card flex flex-col items-center justify-center">
      <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mb-4"></div>
      <p className="font-bold uppercase tracking-widest text-muted">Geolocalizando cafeterías...</p>
    </div>
  ),
});

interface Props {
  cafeterias: Cafeteria[];
}

export default function MapWrapper({ cafeterias }: Props) {
  return <Map cafeterias={cafeterias} />;
}
