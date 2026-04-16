import React from 'react';
import { motion } from 'framer-motion';
import { IBannerProps } from './interfaces/banner.interface';

export const Banner: React.FC<IBannerProps> = ({ info, profile }) => {
  return (
    <header className="bg-slate-900 text-white py-16 px-4 md:px-8 border-b-4 border-emerald-500 shadow-lg relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-emerald-400 tracking-wide uppercase">
              {info.badgeIcon && React.createElement(info.badgeIcon, { className: 'w-4 h-4' })} {info.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {info.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light flex items-center gap-3">
              {info.subtitle}
            </p>
          </div>
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-md max-w-sm w-full md:w-auto shadow-2xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                {profile.initials}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{profile.name}</h3>
                <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">{profile.role}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {profile.description}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Banner;
