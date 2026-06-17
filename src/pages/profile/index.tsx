import { H1, H2, Text, Small } from "../../ui/Typography";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Award,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const Profile: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <header className="w-full bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <H1>Bertha Zaray Bravo Ruiz</H1>
                <H2 className="mt-4">
                  Contadora Pública y Especialista en Alta Gerencia.
                </H2>
                <div className="mt-6">
                  <Text>
                    Profesional enfocada en la transparencia, confidencialidad y
                    el liderazgo financiero y administrativo.
                  </Text>
                </div>
              </div>

              <div>
                <div className="relative">
                  <Card>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-primary-light to-primary-dark">
                        BZ
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-4 h-4" />
                          <div>
                            <div className="font-bold">
                              Bertha Zaray Bravo Ruiz
                            </div>
                            <Small>Revisora Fiscal · Contadora Pública</Small>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-3 flex-wrap">
                          <Badge variant="success">Transparencia</Badge>
                          <Badge variant="pending">Confidencialidad</Badge>
                          <Badge variant="default">Liderazgo</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cuerpo */}
      <main className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
          {/* Credenciales */}
          <section>
            <H2>Credenciales</H2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Contadora Pública</div>
                    <Small>Área Andina</Small>
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Especialista en Gerencia Financiera</div>
                    <Small>Profesionalización</Small>
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Especialista en Alta Gerencia</div>
                    <Small>Gestión Estratégica</Small>
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Diplomado NIIF</div>
                    <Small>Normas Internacionales</Small>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Experiencia */}
          <section>
            <H2>Experiencia Destacada</H2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="flex flex-col items-start gap-3">
                  <ShieldCheck className="w-8 h-8" />
                  <div className="font-bold">29 años de trayectoria</div>
                  <Small>Gestión administrativa, tesorería, sector inmobiliario</Small>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col items-start gap-3">
                  <Briefcase className="w-8 h-8" />
                  <div className="font-bold">6 años como Revisora Fiscal</div>
                  <Small>Auditoría para copropiedades y control financiero</Small>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col items-start gap-3">
                  <Calendar className="w-8 h-8" />
                  <div className="font-bold">Vanguardia Tributaria</div>
                  <Small>Actualización anual en normatividad</Small>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col items-start gap-3">
                  <GraduationCap className="w-8 h-8" />
                  <div className="font-bold">Dominio Técnico</div>
                  <Small>SIMI ERP, CRM, Facturación</Small>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
