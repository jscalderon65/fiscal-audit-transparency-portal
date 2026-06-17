import { H1, H2, Text, Small } from "../../ui/Typography";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Award,
  Calendar,
  FileText,
  TrendingUp,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppButton from "../../ui/WhatsAppButton";

type Item = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const credenciales: Item[] = [
  { icon: Award, title: "Contadora Pública", desc: "Área Andina" },
  {
    icon: TrendingUp,
    title: "Especialista en Gerencia Financiera",
    desc: "Profesionalización",
  },
  {
    icon: Briefcase,
    title: "Especialista en Alta Gerencia",
    desc: "Gestión estratégica",
  },
  {
    icon: FileText,
    title: "Diplomado en NIIF",
    desc: "Normas Internacionales de Información Financiera",
  },
];

const experiencia: Item[] = [
  {
    icon: Calendar,
    title: "29 años de trayectoria",
    desc: "Gestión administrativa, tesorería y sector inmobiliario",
  },
  {
    icon: ShieldCheck,
    title: "6 años como Revisora Fiscal",
    desc: "Auditoría y control financiero para copropiedades",
  },
  {
    icon: GraduationCap,
    title: "Actualización permanente",
    desc: "Vanguardia tributaria y normativa cada año",
  },
  {
    icon: Laptop,
    title: "Dominio técnico",
    desc: "SIMI ERP, CRM y facturación",
  },
];

const InfoCard = ({ icon: Icon, title, desc }: Item) => (
  <Card className="h-full transition-shadow hover:shadow-md">
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-6 w-6 text-primary-dark" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="font-bold leading-snug">{title}</div>
        <Small>{desc}</Small>
      </div>
    </div>
  </Card>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
);

const Profile: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <header className="w-full bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-10 md:grid-cols-2 md:gap-12"
          >
            {/* Texto */}
            <div className="order-2 text-center text-white md:order-1 md:text-left">
              <H1>Bertha Zaray Bravo Ruiz</H1>
              <H2 className="mt-3 md:mt-4">
                Contadora Pública · Especialista en Alta Gerencia
              </H2>
              <div className="mt-4 md:mt-6">
                <Text>
                  Revisora fiscal enfocada en la transparencia, la
                  confidencialidad y el liderazgo financiero de las
                  copropiedades.
                </Text>
              </div>
            </div>

            {/* Tarjeta de identidad */}
            <div className="order-1 flex justify-center md:order-2 md:block">
              <div className="w-full max-w-sm">
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary-dark text-xl font-bold text-white">
                      BZ
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold">Revisora Fiscal</div>
                      <Small>Contadora Pública titulada</Small>
                    </div>
                  </div>

                  <div className="my-4 border-t border-slate-200" />

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary-dark">
                      29
                    </span>
                    <span className="text-sm font-medium text-slate-600">
                      años de trayectoria profesional
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="success">Transparencia</Badge>
                    <Badge variant="default">Confidencialidad</Badge>
                    <Badge variant="default">Liderazgo</Badge>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cuerpo */}
      <main className="bg-slate-50">
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
          {/* Credenciales */}
          <Section>
            <H2>Credenciales</H2>
            <div className="mt-2 max-w-2xl">
              <Small>
                Formación académica y certificaciones profesionales.
              </Small>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {credenciales.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </div>
          </Section>

          {/* Experiencia */}
          <Section>
            <H2>Experiencia destacada</H2>
            <div className="mt-2 max-w-2xl">
              <Small>
                Casi tres décadas al servicio del control financiero en
                copropiedades.
              </Small>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {experiencia.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </div>
          </Section>
        </div>
      </main>

      <WhatsAppButton />
    </div>
  );
};

export default Profile;
