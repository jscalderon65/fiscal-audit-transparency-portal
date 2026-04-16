import React from 'react';
import { Lock } from 'lucide-react';
import { Card } from '../ui/Card';

export const MetricCard = ({ metric, index, showSensitiveData }) => {
  const { title, value, subtitle, icon: Icon, color, bg, border } = metric;
  
  return (
    <Card delay={index * 0.1}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bg} to-transparent opacity-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform`}></div>
      
      <div className="flex justify-between items-start mb-5">
        <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {!showSensitiveData && (
          <span className="bg-slate-100 text-slate-400 p-1.5 rounded-lg" title="Dato protegido">
            <Lock className="w-4 h-4" />
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</h3>
      
      <p className={`text-3xl font-black mb-2 tracking-tight transition-all duration-300 ${showSensitiveData ? 'text-slate-900' : 'text-slate-400 filter blur-[4px] select-none'}`}>
        {showSensitiveData ? value : '$ •••••••••'}
      </p>
      
      <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
        {subtitle}
      </p>
    </Card>
  );
};
