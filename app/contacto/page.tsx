import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto y Sugerencias",
  description: "Contacta con nosotros para sugerir nuevas cafeterías, proponer mejoras o reportar errores.",
};

export default function ContactoPage() {
  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        <section className="mb-12 border-b-4 border-border pb-8">
          <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-foreground mb-6 leading-none break-words">
            CONTACTO.
          </h1>
          <p className="text-xl font-bold uppercase tracking-widest text-accent mb-8 border-l-4 border-border pl-4">
            ¿Falta tu cafetería favorita? ¿Tienes una idea para mejorar el directorio?
          </p>
        </section>

        <section className="space-y-8 text-lg font-medium">
          <p>
            Este directorio está vivo y lo construimos entre todos. Si conoces un local de especialidad que cumple con nuestro criterio y no está en la lista, queremos saberlo.
          </p>
          
          <div className="bg-card border-4 border-border retro-shadow p-8 mt-8">
            <h2 className="font-serif font-black text-2xl uppercase tracking-tighter mb-4">Escríbenos directamente</h2>
            <p className="mb-6 text-sm uppercase tracking-wider font-bold text-muted">
              Puedes enviarnos un correo electrónico con tus sugerencias, críticas (constructivas) o propuestas de colaboración a:
            </p>
            <a 
              href="mailto:hola@cafeteriasespecialidad.com" 
              className="inline-block bg-accent text-white px-6 py-3 font-black uppercase tracking-widest retro-shadow border-2 border-border hover:-translate-y-1 hover:bg-accent-hover transition-all"
            >
              hola@cafeteriasespecialidad.com
            </a>
          </div>

          <div className="mt-12 text-sm uppercase tracking-wider font-bold text-muted">
            <p>Intentamos responder a todos los correos en menos de 48 horas. ¡Gracias por ayudar a que el buen café llegue a más gente!</p>
          </div>
        </section>

      </div>
    </main>
  );
}
