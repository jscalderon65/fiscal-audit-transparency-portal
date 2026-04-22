import React from "react";

const Profile: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-indigo-600 text-white p-8 flex flex-col items-center justify-center">
            <svg
              className="w-32 h-32 rounded-full bg-white p-2 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <h1 className="text-2xl font-bold">Bertha Zaray Bravo</h1>
            <p className="mt-2 text-sm opacity-90">Profesional Contable</p>
            <p className="mt-4 text-xs text-white/90 text-center">
              Contadora pública con experiencia en auditoría, conciliación y
              gestión financiera.
            </p>
          </div>

          <section className="md:w-2/3 p-8">
            <header className="mb-6">
              <h2 className="text-xl font-semibold">Resumen profesional</h2>
              <p className="mt-2 text-gray-600">
                Profesional contable con más de 10 años de experiencia en
                asesoría financiera, auditoría externa e interna, y cumplimiento
                tributario. Líder orientada a resultados, con habilidades en
                análisis de estados financieros, control interno y mejora de
                procesos.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="font-medium">Experiencia destacada</h3>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  <li>
                    <strong>Auditora Senior</strong> — Firma de auditoría
                    (2018-2023). Planificación y ejecución de auditorías
                    externas, informes de hallazgos y recomendaciones.
                  </li>
                  <li className="mt-1">
                    <strong>Contadora Corporativa</strong> — Empresa del sector
                    industrial (2014-2018). Responsable de cierre contable,
                    conciliaciones bancarias y preparación de estados
                    financieros.
                  </li>
                  <li className="mt-1">
                    <strong>Asesora Tributaria</strong> — Consultoría
                    (2012-2014). Gestión de impuestos, declaraciones y
                    cumplimiento normativo.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Educación y certificaciones</h3>
                <ul className="mt-2 text-gray-700">
                  <li>
                    <strong>Contaduría Pública</strong> — Universidad Nacional
                    (2011)
                  </li>
                  <li className="mt-1">
                    Certificación en Normas Internacionales de Información
                    Financiera (NIIF)
                  </li>
                  <li className="mt-1">Diplomado en Auditoría Forense</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Habilidades</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "Auditoría",
                    "NIIF",
                    "Gestión Tributaria",
                    "Análisis Financiero",
                    "Control Interno",
                    "Conciliaciones",
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Logros relevantes</h3>
                <ol className="mt-2 list-decimal list-inside text-gray-700">
                  <li>
                    Implementación de controles que redujeron riesgos operativos
                    en un 30%.
                  </li>
                  <li className="mt-1">
                    Lideró procesos de mejora para acelerar cierres contables
                    mensuales de 12 a 5 días.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium">Contacto</h3>
                <p className="mt-2 text-gray-700">
                  Correo: bertha.bravo@example.com
                </p>
                <p className="text-gray-700">Teléfono: +57 300 000 0000</p>
                <div className="mt-4 flex gap-3">
                  <a
                    href="mailto:bertha.bravo@example.com"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded shadow"
                  >
                    Enviar correo
                  </a>
                  <button
                    onClick={() => alert("Descarga de CV (ejemplo)")}
                    className="inline-block px-4 py-2 border border-gray-300 rounded"
                  >
                    Descargar CV
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
