import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";

const offersUrl = buildWhatsAppUrl(
  "Hola, quiero recibir ofertas y novedades de MILEXUS por WhatsApp."
);
const salesUrl = buildWhatsAppUrl(
  "Hola, quiero hablar con el equipo de ventas de MILEXUS."
);
const supportUrl = buildWhatsAppUrl(
  "Hola, necesito soporte técnico con un producto MILEXUS."
);

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.6 4.9L2 18.3 5.7 22l7.1-7.1a4 4 0 0 0 4.9-5.6l-2.8 2.8-2.1-2.1Z" />
    </svg>
  );
}

const columns = [
  {
    icon: <EditIcon />,
    title: "Recibe nuestras ofertas",
    description:
      "Escríbenos por WhatsApp y te avisamos primero sobre precios al mayor y nuevos productos.",
    cta: "Recibir ofertas",
    href: offersUrl,
  },
  {
    icon: <MailIcon />,
    title: "Consultas de ventas",
    description:
      "Ponte en contacto con nuestro equipo de ventas para conocer las mejores opciones para tu negocio.",
    cta: "Contáctanos",
    href: salesUrl,
  },
  {
    icon: <WrenchIcon />,
    title: "Soporte técnico",
    description:
      "¿Necesitas ayuda? Ponte en contacto con nuestro equipo para soporte técnico de tus productos.",
    cta: "Solicitar asistencia",
    href: supportUrl,
  },
];

export default function ContactCTA() {
  return (
    <section className="bg-ml-surface">
      <div className="mx-auto grid max-w-6xl gap-10 divide-y divide-ml-grey/15 px-4 py-14 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-y-0">
        {columns.map((col, i) => (
          <Reveal key={col.title} delay={i * 120} className={i > 0 ? "pt-10 sm:pt-0 sm:pl-8" : ""}>
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-ml-ink">{col.title}</h3>
                <span className="text-ml-ink">{col.icon}</span>
              </div>
              <p className="text-sm text-ml-grey">{col.description}</p>
              <a
                href={col.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-fit rounded-full bg-ml-ink px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-black"
              >
                {col.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
