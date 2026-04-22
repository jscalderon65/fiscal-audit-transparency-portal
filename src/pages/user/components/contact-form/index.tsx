import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Home, Mail, FileCheck, ShieldCheck } from "lucide-react";
import { IContactFormData } from "./interfaces/contact-form.interface";
import { PALETTE } from "../../../../constants/theme";

export const ContactForm: React.FC = () => {
  const contactInfo = {
    title: "Línea Directa con Revisoría",
    description:
      "¿Encontró alguna inconsistencia? ¿Tiene dudas sobre la ejecución de la obra de los ascensores? Escríbame directamente.",
    features: [
      {
        icon: ShieldCheck,
        text: "Su información se maneja con estricta confidencialidad.",
      },
      {
        icon: FileCheck,
        text: "Las respuestas se incluyen en el dictamen del mes siguiente.",
      },
    ],
  };

  const [formData, setFormData] = useState<IContactFormData>({
    name: "",
    unit: "",
    message: "",
  });

  const handleContactSubmit = (formData: IContactFormData) => {
    alert(
      "Mensaje radicado con éxito en el despacho de la Revisoría Fiscal. Su número de radicado es el #4092. Gracias por su participación.",
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContactSubmit(formData);
    setFormData({ name: "", unit: "", message: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-3xl overflow-hidden shadow-2xl"
      style={{
        backgroundColor: PALETTE.neutral[900],
        border: `1px solid ${PALETTE.neutral[800]}`,
      }}
    >
      <div className="grid md:grid-cols-5 h-full">
        {/* Info Section */}
        <div
          className="p-8 md:p-12 md:col-span-2 flex flex-col justify-center relative overflow-hidden"
          style={{ color: PALETTE.text.inverted }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full -z-10"
            style={{
              backgroundColor: PALETTE.overlays.primary900_40,
            }}
          ></div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            style={{ color: PALETTE.text.inverted }}
          >
            {contactInfo.title}
          </h2>
          <p
            className="mb-8 text-lg leading-relaxed font-light"
            style={{ color: PALETTE.text.subtle }}
          >
            {contactInfo.description}
          </p>
          <div className="space-y-5" style={{ color: PALETTE.text.subtle }}>
            {contactInfo.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: PALETTE.overlays.neutral800_50,
                  border: `1px solid ${PALETTE.overlays.neutral700_50}`,
                }}
              >
                <feature.icon
                  className="w-6 h-6 shrink-0"
                  style={{ color: PALETTE.primary.DEFAULT }}
                />
                <p className="text-sm font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div
          className="p-8 md:p-12 md:col-span-3"
          style={{ backgroundColor: PALETTE.background.surface }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-bold flex items-center gap-2"
                  style={{ color: PALETTE.neutral[700] }}
                >
                  <User
                    className="w-4 h-4"
                    style={{ color: PALETTE.neutral[400] }}
                  />{" "}
                  Residente o Propietario
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3.5 rounded-xl outline-none transition-all font-medium"
                  style={{
                    backgroundColor: PALETTE.neutral[50],
                    border: `1px solid ${PALETTE.neutral[200]}`,
                    color: PALETTE.text.default,
                  }}
                  placeholder="Ej. Carlos Mendoza"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-bold flex items-center gap-2"
                  style={{ color: PALETTE.neutral[700] }}
                >
                  <Home
                    className="w-4 h-4"
                    style={{ color: PALETTE.neutral[400] }}
                  />{" "}
                  Interior / Apto
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3.5 rounded-xl outline-none transition-all font-medium"
                  style={{
                    backgroundColor: PALETTE.neutral[50],
                    border: `1px solid ${PALETTE.neutral[200]}`,
                    color: PALETTE.text.default,
                  }}
                  placeholder="Ej. Torre 3, Apto 502"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-bold flex items-center gap-2"
                style={{ color: PALETTE.neutral[700] }}
              >
                <Mail
                  className="w-4 h-4"
                  style={{ color: PALETTE.neutral[400] }}
                />{" "}
                Solicitud o Denuncia
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl resize-none font-medium"
                style={{
                  backgroundColor: PALETTE.neutral[50],
                  border: `1px solid ${PALETTE.neutral[200]}`,
                  color: PALETTE.text.default,
                }}
                placeholder="Describa su solicitud sobre los estados financieros de forma clara..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
              style={{
                backgroundColor: PALETTE.primary.DEFAULT,
                boxShadow: `0 10px 20px -10px ${PALETTE.primary.alpha60_from_200}`,
              }}
            >
              <Send className="w-5 h-5" />
              Radicar Mensaje a Revisoría
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
