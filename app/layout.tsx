import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cafeterías de Especialidad en Catalunya",
    template: "%s | cafeteriasespecialidad",
  },
  description:
    "Directorio de cafeterías de especialidad en Catalunya: dónde tomar buen café en Barcelona, Girona, Granollers y más. Tostadores propios, métodos de extracción, brunch y terrazas.",
  applicationName: "cafeteriasespecialidad",
  keywords: [
    "café de especialidad",
    "specialty coffee",
    "cafeterías Barcelona",
    "cafeterías Catalunya",
    "tostadores café",
  ],
  authors: [{ name: "cafeteriasespecialidad" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "cafeteriasespecialidad",
    title: "Cafeterías de Especialidad en Catalunya",
    description:
      "Directorio de cafeterías de especialidad en Catalunya. Reseñas honestas, métodos, tostadores propios.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafeterías de Especialidad en Catalunya",
    description:
      "Directorio de cafeterías de especialidad en Catalunya. Reseñas honestas, métodos, tostadores propios.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
