import React, { useState } from 'react';

import { 
  Building2, Wallet, PiggyBank, HardHat, FileCheck, 
  Download, Send, ShieldCheck, User, Mail, Home,
  CalendarDays, ArrowRight, Eye, EyeOff
} from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';

export const TransparencyDashboard = () => {
  const [formData, setFormData] = useState({ name: '', unit: '', message: '' });
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const metrics = [
    { title: 'Excedente Acumulado', value: '$ 35.450.000', subtitle: 'Cierre Fiscal 2025', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { title: 'Recaudo Cuota Extra.', value: '$ 487.575.200', subtitle: 'Fondo Obra Ascensores', icon: HardHat, color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200' },
    { title: 'Estado de Cartera', value: '$ 28.350.000', subtitle: 'Cartera vencida > 60 días', icon: Building2, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    { title: 'Fondo de Imprevistos', value: '$ 42.150.000', subtitle: 'Cuenta de ahorros (Ley 675)', icon: PiggyBank, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  ];

  const reports = [
    { id: 1, month: 'Marzo 2026', title: 'Dictamen Revisoría Fiscal - Marzo 2026', status: 'Publicado', topics: 'Revisión extractos, Cartera y Anticipos de Obra' },
    { id: 2, month: 'Febrero 2026', title: 'Dictamen Revisoría Fiscal - Febrero 2026', status: 'Auditado', topics: 'Preparación Asamblea Ordinaria, Cierre 2025' },
    { id: 3, month: 'Enero 2026', title: 'Dictamen Revisoría Fiscal - Enero 2026', status: 'Auditado', topics: 'Ejecución Presupuestal Final, Conciliaciones' },
    { id: 4, month: 'Diciembre 2025', title: 'Dictamen Revisoría Fiscal - Diciembre 2025', status: 'Auditado', topics: 'Pago de Primas, Mantenimiento Preventivo' },
    { id: 5, month: 'Noviembre 2025', title: 'Dictamen Revisoría Fiscal - Noviembre 2025', status: 'Auditado', topics: 'Recaudo Cuota Extraordinaria, Seguros' },
    { id: 6, month: 'Octubre 2025', title: 'Dictamen Revisoría Fiscal - Octubre 2025', status: 'Auditado', topics: 'Renovación Póliza Zonas Comunes, Cartera' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje radicado con éxito en el despacho de la Revisoría Fiscal. Su número de radicado es el #4092. Gracias por su participación.');
    setFormData({ name: '', unit: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-16 px-4 md:px-8 border-b-4 border-emerald-500 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-emerald-400 tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4" /> Portal Oficial Validado
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Quintas de Santa Rita
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light flex items-center gap-3">
                Transparencia, Orden y Confianza.
              </p>
            </div>
            
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-md max-w-sm w-full md:w-auto shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                  BB
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Bertha Zaray Bravo</h3>
                  <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Revisora Fiscal Senior</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Supervisando rigurosamente la gestión financiera de la copropiedad.
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-24">
        
        {/* Transparency Dashboard */}
        <section>
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                <Wallet className="w-8 h-8 text-emerald-600" />
                Métricas Financieras
              </h2>
              <p className="text-slate-500 mt-2 text-lg">Saldos reales de las cuentas del conjunto (Expresados en COP).</p>
            </div>
            
            <button 
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border ${showSensitiveData ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800 shadow-md'}`}
            >
              {showSensitiveData ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Ocultar Valores Sensibles
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Mostrar Valores Reales
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} showSensitiveData={showSensitiveData} />
            ))}
          </div>
        </section>

        {/* Monthly Reports Grid */}
        <section>
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                <FileCheck className="w-8 h-8 text-emerald-600" />
                Archivo de Dictámenes (2025 - 2026)
              </h2>
              <p className="text-slate-500 mt-2 text-lg">Acceso directo a las auditorías mensuales presentadas al Consejo.</p>
            </div>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2 transition-colors">
              Ver histórico completo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {reports.map((report, index) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-lg">
                      <CalendarDays className="w-4 h-4" />
                      {report.month}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors">{report.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    <strong className="text-slate-900">Enfoque de auditoría:</strong> {report.topics}.
                  </p>
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors mt-4">
                  <Download className="w-5 h-5" />
                  Descargar PDF Oficial
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Buzón de Transparencia */}
        <section className="pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="grid md:grid-cols-5 h-full">
              <div className="p-8 md:p-12 md:col-span-2 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/40 to-slate-900/40 -z-10"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Línea Directa con Revisoría</h2>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed font-light">
                  ¿Encontró alguna inconsistencia? ¿Tiene dudas sobre la ejecución de la obra de los ascensores? Escríbame directamente.
                </p>
                <div className="space-y-5 text-slate-300">
                  <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <p className="text-sm font-medium">Su información se maneja con estricta confidencialidad.</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <FileCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <p className="text-sm font-medium">Las respuestas se incluyen en el dictamen del mes siguiente.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 md:col-span-3 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" /> Residente o Propietario
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium text-slate-900"
                        placeholder="Ej. Carlos Mendoza"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Home className="w-4 h-4 text-slate-400" /> Interior / Apto
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium text-slate-900"
                        placeholder="Ej. Torre 3, Apto 502"
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" /> Solicitud o Denuncia
                    </label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none font-medium text-slate-900"
                      placeholder="Describa su solicitud sobre los estados financieros de forma clara..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    <Send className="w-5 h-5" />
                    Radicar Mensaje a Revisoría
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-10 text-center border-t border-slate-900 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <Building2 className="w-8 h-8 text-slate-700" />
          <p className="text-slate-400 text-sm md:text-base font-medium">
            &copy; 2026 Portal de Transparencia - Conjunto Residencial Quintas de Santa Rita.<br/>
            <span className="text-slate-500 mt-2 block font-normal">
              Diseñado bajo los principios de Arquitectura Limpia para la gestión de <strong>Bertha Zaray Bravo</strong>.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TransparencyDashboard;
