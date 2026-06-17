import { Building2 } from "lucide-react";

export interface FooterProps {
  year?: number;
  portalName?: string;
  residentialName?: string;
}

export const Footer = ({
  year = new Date().getFullYear(),
  portalName = "Portal de Transparencia",
  residentialName = "Revisoría Fiscal",
}: FooterProps) => {
  return (
    <footer className="bg-slate-950 py-10 text-center border-t border-slate-900 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <Building2 className="w-8 h-8 text-slate-700" />
        <p className="text-sm md:text-base font-medium text-slate-400">
          &copy; {year} {portalName} - {residentialName}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
