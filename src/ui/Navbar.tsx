import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export interface NavbarProps {
  /** Slot para contenido extra a la derecha del navbar */
  rightContent?: React.ReactNode;
  className?: string;
}

export default function Navbar({ rightContent, className = "" }: NavbarProps) {
  return (
    <header className={`bg-slate-900 border-b border-slate-800 h-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-primary shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="font-bold text-white text-sm sm:text-base hidden sm:inline">Portal de Transparencia</span>
        </Link>

        {rightContent && (
          <div className="flex items-center gap-2">{rightContent}</div>
        )}
      </div>
    </header>
  );
}
