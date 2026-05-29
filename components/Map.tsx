"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Cafeteria } from "@/types/cafeteria";
import Link from "next/link";
import { useState } from "react";

// Arreglo para los iconos de leaflet en Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Icono especial azul para el usuario
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Props {
  cafeterias: Cafeteria[];
}

export default function Map({ cafeterias }: Props) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  // Centro por defecto: Catalunya (Barcelona aprox)
  const defaultCenter: [number, number] = [41.3851, 2.1734];

  // Filtrar cafeterías que sí tengan coordenadas
  const markers = cafeterias.filter((c) => c.lat && c.lng);

  const handleLocate = () => {
    if (!map) return;
    map.locate({ setView: true, maxZoom: 14 })
       .on("locationfound", (e) => {
         setUserPos([e.latlng.lat, e.latlng.lng]);
       })
       .on("locationerror", () => {
         alert("No hemos podido acceder a tu ubicación. Por favor, revisa los permisos de tu navegador.");
       });
  };

  return (
    <div className="w-full h-[600px] md:h-[800px] border-4 border-border retro-shadow bg-card relative z-0">
      
      {/* Botón Flotante para Ubicar */}
      <button 
        onClick={handleLocate}
        className="absolute top-4 right-4 z-[400] bg-accent text-white px-4 py-3 font-black uppercase tracking-widest text-sm retro-shadow border-4 border-border hover:-translate-y-1 hover:bg-accent-hover transition-all flex items-center gap-2"
      >
        📍 Cerca de mí
      </button>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Marcador del Usuario */}
        {userPos && (
          <Marker position={userPos} icon={userIcon}>
            <Popup className="neo-popup">
              <div className="p-1 text-center">
                <h3 className="font-serif font-black text-lg uppercase tracking-tighter text-foreground">¡Estás aquí!</h3>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores de Cafeterías */}
        {markers.map((cafe) => (
          <Marker key={cafe.slug} position={[cafe.lat!, cafe.lng!]} icon={customIcon}>
            <Popup className="neo-popup">
              <div className="p-1">
                <h3 className="font-serif font-black text-lg uppercase tracking-tighter mb-1 text-foreground">{cafe.nombre}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">{cafe.ciudad}</p>
                <Link href={`/cafeterias/${cafe.slug}`} className="inline-block bg-accent text-white px-3 py-1 text-[10px] font-bold uppercase border-2 border-border retro-shadow hover:-translate-y-0.5 transition-transform">
                  Ver Ficha Completa
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
