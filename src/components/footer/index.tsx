import React from "react";
import { Building2 } from "lucide-react";
import { IFooterProps } from "./interfaces/footer.interface";

export const Footer: React.FC<IFooterProps> = ({
  year,
  portalName,
  residentialName,
  managerName,
}) => {
  return (
    <footer className="bg-slate-950 py-10 text-center border-t border-slate-900 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <Building2 className="w-8 h-8 text-slate-700" />
        <p className="text-slate-400 text-sm md:text-base font-medium">
          &copy; {year} {portalName} - {residentialName}.<br />
          <span className="text-slate-500 mt-2 block font-normal">
            Diseñado bajo los principios de Arquitectura Limpia para la gestión
            de <strong>{managerName}</strong>.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
