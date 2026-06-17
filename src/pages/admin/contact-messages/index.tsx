import { useEffect, useState } from "react";
import { Mail, Building2 } from "lucide-react";
import { Text } from "../../../ui/Typography";
import { getContactMessages, type ContactMessage } from "../../../db/repositories/contact.repository";
import { getBuildingByCode } from "../../../db/repositories/building.repository";

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [buildingNames, setBuildingNames] = useState<Record<string, string>>({});

  useEffect(() => {
    getContactMessages().then(async (data) => {
      setMessages(data);
      const names: Record<string, string> = {};
      for (const msg of data) {
        if (msg.buildingCode && !names[msg.buildingCode]) {
          const building = await getBuildingByCode(msg.buildingCode);
          names[msg.buildingCode] = building?.name || msg.buildingCode;
        }
      }
      setBuildingNames(names);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Mail className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-extrabold text-slate-900">Mensajes de contacto</h1>
      </div>
      <Text className="text-slate-500 mb-8">Solicitudes y denuncias enviadas por los residentes desde el portal.</Text>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Mail className="w-12 h-12 mx-auto text-slate-300" />
          <Text className="text-slate-500 mt-4">No hay mensajes de contacto todavía.</Text>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-bold text-slate-900">{msg.name}</p>
                  <p className="text-sm text-slate-500">{msg.unit}</p>
                  {msg.phone && <p className="text-sm text-primary font-medium mt-0.5">📞 {msg.phone}</p>}
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Building2 className="w-3.5 h-3.5" />
                    {buildingNames[msg.buildingCode] || msg.buildingCode}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
