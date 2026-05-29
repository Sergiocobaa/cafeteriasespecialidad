import { google } from "googleapis";
import type { Cafeteria, RangoPrecio, TriEstado } from "@/types/cafeteria";
import { slugify } from "./slug";

// Column order in the Google Sheet — see README.md and types/cafeteria.ts.
// A=0 Nombre · B=1 Barrio · C=2 Dirección · D=3 Ciudad · E=4 Web
// F=5 Instagram · G=6 Google Maps URL · H=7 Tostador propio · I=8 Métodos
// J=9 Veggie · K=10 Apto portátil · L=11 Wifi · M=12 Terraza · N=13 Brunch
// O=14 Para llevar · P=15 Rango precio · Q=16 Visitada · R=17 Mi nota
// S=18 Mi comentario · T=19 Fecha visita · U=20 Estado ficha
const RANGE = "'Cafeterías'!A2:U";

let cachedPromise: Promise<Cafeteria[]> | null = null;

export function getCafeterias(): Promise<Cafeteria[]> {
  if (!cachedPromise) {
    cachedPromise = fetchAndParse().catch((err) => {
      // Invalidate cache on error so a retry will re-fetch.
      cachedPromise = null;
      throw err;
    });
  }
  return cachedPromise;
}

async function fetchAndParse(): Promise<Cafeteria[]> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !rawKey || !sheetId) {
    throw new Error(
      "Sheets credentials missing. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID in .env.local (see README.md)."
    );
  }

  // The private key in .env arrives with literal \n sequences — replace with real newlines.
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const jwt = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth: jwt });

  let res;
  try {
    res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: RANGE,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to read Google Sheet (id=${sheetId}). Verify the sheet is shared with ${email} as Viewer. Original: ${msg}`
    );
  }

  const rows = res.data.values ?? [];
  const parsed: Cafeteria[] = [];

  for (let i = 0; i < rows.length; i++) {
    const cafe = parseRow(rows[i]);
    if (cafe) parsed.push(cafe);
  }

  // Geocodificar las cafeterías automáticamente (Opción B)
  for (const c of parsed) {
    if (!c.lat && !c.lng && c.direccion && c.ciudad) {
      try {
        const query = `${c.direccion}, ${c.ciudad}, Catalunya, Spain`;
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
        
        // Retardo para respetar la limitación de Nominatim (1 req/sec)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const res = await fetch(url, {
          headers: { 'User-Agent': 'CafeteriasEspecialidad/1.0 (Directorio Local de prueba)' }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            c.lat = parseFloat(data[0].lat);
            c.lng = parseFloat(data[0].lon);
          }
        }
      } catch (err) {
        console.warn(`No se pudo geocodificar ${c.nombre}:`, err);
      }
    }
  }

  // Auto-resolver colisiones de slugs añadiendo el barrio o un número
  const seenSlugs = new Set<string>();
  for (const c of parsed) {
    let finalSlug = c.slug;
    let counter = 2;
    
    // Si el slug ya existe, intentamos añadir el barrio primero para mejor SEO
    if (seenSlugs.has(finalSlug) && c.barrio) {
      finalSlug = `${c.slug}-${c.barrioSlug}`;
    }
    
    // Si aún así existe (mismo nombre en el mismo barrio, o sin barrio), añadimos números
    while (seenSlugs.has(finalSlug)) {
      finalSlug = `${c.slug}-${counter}`;
      counter++;
    }
    
    c.slug = finalSlug;
    seenSlugs.add(finalSlug);
  }

  return parsed;
}

function parseRow(row: string[]): Cafeteria | null {
  const get = (i: number) => (row[i] ?? "").trim();

  const estado = get(20).toLowerCase();
  if (estado !== "publicable") return null;

  const nombre = get(0);
  const ciudad = get(3);
  if (!nombre || !ciudad) return null;

  const barrio = get(1) || null;
  const instagramHandle = stripAt(get(5)) || null;

  return {
    nombre,
    slug: slugify(nombre),
    barrio,
    direccion: get(2) || null,
    ciudad,
    ciudadSlug: slugify(ciudad),
    barrioSlug: barrio ? slugify(barrio) : null,
    web: nullable(get(4)),
    instagram: instagramHandle,
    instagramUrl: instagramHandle ? `https://instagram.com/${instagramHandle}` : null,
    googleMapsUrl: nullable(get(6)),
    tostadorPropio: parseTriestado(get(7)),
    metodos: parseMetodos(get(8)),
    veggie: parseTriestado(get(9)),
    aptoPortatil: parseTriestado(get(10)),
    wifi: parseTriestado(get(11)),
    terraza: parseTriestado(get(12)),
    brunch: parseTriestado(get(13)),
    paraLlevar: parseTriestado(get(14)),
    rangoPrecio: parsePrecio(get(15)),
    visitada: parseBoolean(get(16)),
    miNota: parseNota(get(17)),
    miComentario: get(18) || null,
  };
}

function nullable(v: string): string | null {
  return v ? v : null;
}

function stripAt(v: string): string {
  return v.replace(/^@/, "").trim();
}

function parseTriestado(v: string): TriEstado {
  const n = v.toLowerCase().replace(/í/g, "i");
  if (n === "si" || n === "sí") return "si";
  if (n === "no") return "no";
  return "desconocido";
}

function parseBoolean(v: string): boolean {
  const n = v.toLowerCase().replace(/í/g, "i");
  return n === "si" || n === "sí";
}

function parsePrecio(v: string): RangoPrecio | null {
  const trimmed = v.trim();
  if (trimmed === "€" || trimmed === "€€" || trimmed === "€€€") return trimmed;
  return null;
}

function parseMetodos(v: string): string[] {
  if (!v) return [];
  return v
    .split(/[,;]/)
    .map((m) => m.trim())
    .filter(Boolean);
}

function parseNota(v: string): number | null {
  if (!v) return null;
  const n = Number(v.replace(",", "."));
  if (!Number.isFinite(n)) return null;
  if (n < 0 || n > 10) return null;
  return n;
}
