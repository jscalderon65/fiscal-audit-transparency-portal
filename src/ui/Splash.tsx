import { ShieldCheck } from "lucide-react";

export default function Splash() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-900 shadow-lg">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>
      <div className="animate-spin w-6 h-6 rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
