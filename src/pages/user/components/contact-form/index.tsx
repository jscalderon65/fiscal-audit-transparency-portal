import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Home, Mail, ShieldCheck, FileCheck } from "lucide-react";
import type { IContactFormData } from "./interfaces/contact-form.interface";

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

  const handleContactSubmit = (_formData: IContactFormData) => {
    alert(
      "Mensaje radicado con éxito en el despacho de la Revisoría Fiscal. Su número de radicado es el #4092. Gracias por su participación."
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
      className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800"
    >
      <div className="grid md:grid-cols-5 h-full">
        {/* Info Section */}
        <div className="p-8 md:p-12 md:col-span-2 flex flex-col justify-center relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-full h-full -z-10 bg-primary-dark/60" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
            {contactInfo.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed font-light text-slate-300">
            {contactInfo.description}
          </p>
          <div className="space-y-5 text-slate-300">
            {contactInfo.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <feature.icon className="w-6 h-6 shrink-0 text-primary" />
                <p className="text-sm font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-12 md:col-span-3 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4 text-slate-400" />{" "}
                  Residente o Propietario
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3.5 rounded-xl outline-none transition-all font-medium bg-slate-50 border border-slate-200 text-slate-900"
                  placeholder="Ej. Carlos Mendoza"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
                  <Home className="w-4 h-4 text-slate-400" />{" "}
                  Interior / Apto
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3.5 rounded-xl outline-none transition-all font-medium bg-slate-50 border border-slate-200 text-slate-900"
                  placeholder="Ej. Torre 3, Apto 502"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400" />{" "}
                Solicitud o Denuncia
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl resize-none font-medium bg-slate-50 border border-slate-200 text-slate-900"
                placeholder="Describa su solicitud sobre los estados financieros de forma clara..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg bg-primary shadow-[0_10px_20px_-10px_#a7f3d099] hover:bg-primary-dark"
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
