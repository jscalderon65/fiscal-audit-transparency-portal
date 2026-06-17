import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-900">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-6xl font-extrabold text-slate-300 mb-4">404</h1>
        <p className="text-lg text-slate-500 mb-2">Página no encontrada</p>
        <p className="text-sm text-slate-400 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" leftIcon={ArrowLeft} onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
