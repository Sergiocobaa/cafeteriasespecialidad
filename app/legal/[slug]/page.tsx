import { Metadata } from "next";

export async function generateStaticParams() {
  return [
    { slug: "aviso-legal" },
    { slug: "privacidad" },
    { slug: "cookies" },
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const titles: Record<string, string> = {
    "aviso-legal": "Aviso Legal",
    "privacidad": "Política de Privacidad",
    "cookies": "Política de Cookies",
  };
  return {
    title: titles[resolvedParams.slug] || "Legal",
  };
}

export default async function LegalPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const titles: Record<string, string> = {
    "aviso-legal": "AVISO LEGAL.",
    "privacidad": "PRIVACIDAD.",
    "cookies": "COOKIES.",
  };

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <section className="mb-12 border-b-4 border-border pb-8">
          <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter text-foreground mb-4 leading-none break-words">
            {titles[slug] || "PÁGINA LEGAL"}
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-muted">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>
        </section>

        <section className="space-y-6 text-base font-medium text-muted">
          <div className="bg-card border-2 border-dashed border-border p-8 text-center">
            <p className="uppercase tracking-widest font-bold">
              [Página en construcción]
            </p>
            <p className="mt-2 text-sm">
              Aquí deberás redactar tu {titles[slug]?.toLowerCase() || "texto legal"}. Reemplaza este componente cuando tengas el texto definitivo de tu abogado.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
