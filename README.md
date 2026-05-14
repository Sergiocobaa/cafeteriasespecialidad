# cafeteriasespecialidad

Directorio web SEO de cafeterías de especialidad en Catalunya. Modelo de negocio: tráfico orgánico + AdSense (estilo pitchputt.es).

## Stack

- Next.js 16 (App Router) + TypeScript estricto
- Tailwind v4 + Geist Sans/Mono
- Google Sheets como fuente de datos (vía Service Account)
- SSG (Static Site Generation) — todas las páginas pre-generadas en build time
- Deploy en Vercel

No hay base de datos, ni login, ni backend. El Google Sheet es la única fuente de verdad; el sitio lo lee al hacer `npm run build`.

## Setup local

```bash
npm install
cp .env.local.example .env.local
# Rellena las variables siguiendo la sección "Configurar Google Sheets" más abajo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Configurar Google Sheets (Service Account)

El sitio lee el Sheet con una cuenta de servicio de Google Cloud (sin OAuth, sin tu cuenta personal).

### 1. Crear proyecto en Google Cloud Console

1. Entrar en [console.cloud.google.com](https://console.cloud.google.com).
2. Arriba a la izquierda, selector de proyectos → **Nuevo proyecto**.
3. Nombre sugerido: `cafeteriasespecialidad`. Crear.

### 2. Habilitar la Google Sheets API

1. Con el proyecto seleccionado, ir a **APIs y servicios → Biblioteca**.
2. Buscar **Google Sheets API** → **Habilitar**.

### 3. Crear el Service Account

1. **APIs y servicios → Credenciales → Crear credenciales → Cuenta de servicio**.
2. Nombre: `sheets-reader`. ID que se genera está bien.
3. **Rol:** dejar vacío (no necesita roles a nivel de proyecto, solo acceso al Sheet concreto).
4. **Listo** sin añadir usuarios.

Apuntar el **email** de la cuenta (tipo `sheets-reader@cafeteriasespecialidad.iam.gserviceaccount.com`). Esto va en `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

### 4. Generar la JSON key

1. En la lista de cuentas de servicio, click en la que acabas de crear.
2. Pestaña **Claves → Agregar clave → Crear clave nueva → JSON → Crear**.
3. Se descarga un archivo `.json`. **No lo subas a git.**

Del JSON, abre y copia:
- El campo `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- El campo `private_key` (empieza por `-----BEGIN PRIVATE KEY-----`) → `GOOGLE_PRIVATE_KEY` **entre comillas dobles**, manteniendo los `\n` literales que vienen en el JSON.

### 5. Compartir el Sheet con el Service Account

**Este paso es el que más se olvida.** El Service Account es un usuario distinto al tuyo; necesita permiso en el Sheet.

1. Abre tu Sheet "Cafeterías" en Google Sheets.
2. Botón **Compartir** (arriba a la derecha).
3. Pegar el email de la cuenta de servicio.
4. Permiso: **Lector** (Viewer).
5. **Desmarcar** "Notificar a las personas" (es una cuenta, no recibe email).
6. Enviar / Listo.

### 6. Conseguir el Sheet ID

De la URL del Sheet:

```
https://docs.google.com/spreadsheets/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890/edit
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                       este es GOOGLE_SHEET_ID
```

### 7. Variables finales en `.env.local`

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-reader@cafeteriasespecialidad.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADAN...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890
NEXT_PUBLIC_SITE_URL=
```

`NEXT_PUBLIC_SITE_URL` se deja vacío en local y se define en Vercel para producción.

## Estructura del Sheet

La pestaña **principal (la primera/izquierda)** debe tener fila 1 como cabecera y los datos a partir de la fila 2. Orden exacto de columnas:

| Col | Campo | Valores aceptados |
| --- | --- | --- |
| A | Nombre | texto, obligatorio |
| B | Barrio | texto |
| C | Dirección | texto |
| D | Ciudad | texto, obligatorio |
| E | Web | URL completa con `https://` |
| F | Instagram | handle sin `@` (ej. `nomadcoffee`) |
| G | Google Maps URL | URL |
| H | Tostador propio | `Sí` / `No` / `Desconocido` |
| I | Métodos café | lista separada por comas (ej. `Espresso, V60, Aeropress`) |
| J | Veggie/Vegano | `Sí` / `No` / `Desconocido` |
| K | Apto portátil | `Sí` / `No` / `Desconocido` |
| L | Wifi | `Sí` / `No` / `Desconocido` |
| M | Terraza | `Sí` / `No` / `Desconocido` |
| N | Brunch | `Sí` / `No` / `Desconocido` |
| O | Para llevar | `Sí` / `No` / `Desconocido` |
| P | Rango precio | `€` / `€€` / `€€€` |
| Q | Visitada | `Sí` / `No` |
| R | Mi nota | número 0-10 |
| S | Mi comentario | texto libre |
| T | Fecha visita | (no se publica) |
| U | Estado ficha | `Pendiente` / `Investigada` / `Visitada` / `Publicable` |

**Regla crítica:** solo se publican las filas con `Estado ficha = Publicable`. Las demás son work-in-progress y se ignoran al build.

## Comandos

```bash
npm run dev      # desarrollo en :3000
npm run build    # build de producción (lee el Sheet, genera estáticos)
npm run start    # sirve el build
npm run lint     # ESLint
```

## Deploy

1. Repo en GitHub → conectar a Vercel.
2. En Vercel → **Settings → Environment Variables** añadir las 4 variables del `.env.local` (Production + Preview).
3. `GOOGLE_PRIVATE_KEY` en Vercel: pegar el valor **sin** las comillas dobles externas pero **manteniendo** los `\n` literales tal cual.
4. Push a `main` → deploy automático.

## Estructura del proyecto

```
app/
  layout.tsx                     # raíz: fuentes, metadata, OG
  page.tsx                       # home
  sobre/page.tsx                 # qué es café de especialidad
  [ciudad]/page.tsx              # listado por ciudad
  [ciudad]/[barrio]/page.tsx     # listado por barrio
  cafeterias/[slug]/page.tsx     # ficha individual
  sitemap.ts / robots.ts         # SEO técnico
components/                      # componentes propios (sin librerías de UI)
lib/
  sheets.ts                      # cliente Google Sheets + getCafeterias()
  slug.ts                        # slugify
types/
  cafeteria.ts                   # tipo Cafeteria
```
