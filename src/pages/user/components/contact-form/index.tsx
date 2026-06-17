import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Home, Mail, ShieldCheck, FileCheck, AlertCircle } from "lucide-react";
import { saveContactMessage } from "../../../../db/repositories/contact.repository";

export interface ContactFormProps {
  buildingCode?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ buildingCode = "" }) => {
  const [formData, setFormData] = useState({ name: "", unit: "", message: "" });
  const [errors, setErrors] = useState<{ unit?: string }>({});
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrors({});

    if (!formData.unit.trim() || formData.unit.trim().length < 3) {
      setErrors({ unit: "Debes ingresar tu torre y apto (mín. 3 caracteres)" });
      return;
    }

    setSending(true);
    try {
      await saveContactMessage({
        name: formData.name.trim(),
        unit: formData.unit.trim(),
        message: formData.message.trim(),
        buildingCode,
      });
      setFeedback({ type: "ok", message: "Mensaje enviado correctamente. La Revisoría lo responderá a la brevedad." });
      setFormData({ name: "", unit: "", message: "" });
    } catch {
      setFeedback({ type: "error", message: "Error al enviar el mensaje. Intente de nuevo más tarde." });
    }
    setSending(false);
  };

  const contactInfo = {
    title: "Línea Directa con Revisoría",
    description: "¿Encontró alguna inconsistencia? ¿Tiene dudas sobre la ejecución de la obra de los ascensores? Escríbame directamente.",
    features: [
      { icon: ShieldCheck, text: "Su información se maneja con estricta confidencialidad." },
      { icon: FileCheck, text: "Las respuestas se incluyen en el dictamen del mes siguiente." },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800"
    >
      <div className="grid md:grid-cols-5 h-full">
        <div className="p-8 md:p-12 md:col-span-2 flex flex-col justify-center relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-full h-full -z-10 bg-emerald-900/40" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">{contactInfo.title}</h2>
          <p className="mb-8 text-lg leading-relaxed font-light text-slate-300">{contactInfo.description}</p>
          <div className="space-y-5 text-slate-300">
            {contactInfo.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <feature.icon className="w-6 h-6 shrink-0 text-primary" />
                <p className="text-sm font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 md:col-span-3 bg-white flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            {feedback && (
              <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${feedback.type === "ok" ? "bg-primary/10 text-primary-dark" : "bg-danger/10 text-danger"}`}>
                {feedback.type === "ok" ? <FileCheck className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                {feedback.message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><User className="w-4 h-4 text-slate-400" /> Residente o Propietario</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ej. Carlos Mendoza" className="w-full px-4 py-3.5 rounded-xl outline-none transition-all font-medium bg-slate-50 border border-slate-200 text-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><Home className="w-4 h-4 text-slate-400" /> Interior / Apto</label>
                <input type="text" required value={formData.unit} onChange={(e) => { setFormData({ ...formData, unit: e.target.value }); if (errors.unit) setErrors({}); }} placeholder="Ej. Torre 3, Apto 502" className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all font-medium bg-slate-50 border text-slate-900 ${errors.unit ? "border-danger" : "border-slate-200"}`} />
                {errors.unit && <p className="text-xs text-danger mt-1">{errors.unit}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><Mail className="w-4 h-4 text-slate-400" /> Solicitud o Denuncia</label>
              <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describa su solicitud sobre los estados financieros de forma clara..." className="w-full px-4 py-3.5 rounded-xl resize-none font-medium bg-slate-50 border border-slate-200 text-slate-900" />
            </div>

            <button type="submit" disabled={sending} className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg bg-primary hover:bg-primary-dark disabled:opacity-65">
              {sending ? (
                <span className="flex items-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" /><path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg> Enviando...</span>
              ) : (
                <><Send className="w-5 h-5" /> Radicar Mensaje a Revisoría</>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
