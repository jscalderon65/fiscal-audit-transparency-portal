import { useState, useRef } from "react";
import { Trash2, Upload, Plus, FileText } from "lucide-react";
import Button from "../../../../ui/Button";
import { Small } from "../../../../ui/Typography";
import { parseUserDocuments } from "../../../../helpers/parseDocuments";

export interface UsersTableProps {
  users: { userDocumentNumber: string }[];
  buildingCode: string;
  onAdd: (userDocumentNumber: string) => Promise<void>;
  onDelete: (userDocumentNumber: string) => Promise<void>;
  onImport: (documents: string[]) => Promise<void>;
}

export default function UsersTable({
  users,
  onAdd,
  onDelete,
  onImport,
}: UsersTableProps) {
  const [newUserDocumentNumber, setNewUserDocumentNumber] = useState("");
  const [adding, setAdding] = useState(false);
  const [csvStatus, setCsvStatus] = useState<{
    type: "ok" | "warn";
    message: string;
  } | null>(null);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleAdd() {
    const val = newUserDocumentNumber.trim();
    if (!/^\d+$/.test(val)) return;
    setAdding(true);
    try {
      await onAdd(val);
      setNewUserDocumentNumber("");
    } finally {
      setAdding(false);
    }
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvStatus(null);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target?.result as string;
      const { valids, invalids } = parseUserDocuments(text);

      if (valids.length === 0) {
        setCsvStatus({
          type: "warn",
          message: "No se encontraron cédulas válidas en el archivo.",
        });
        return;
      }

      setImporting(true);
      try {
        await onImport(valids);
        setCsvStatus({
          type: "ok",
          message: `${valids.length} cédulas importadas${invalids > 0 ? `, ${invalids} líneas ignoradas (no eran números)` : ""}.`,
        });
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);

    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Usuarios registrados
          </h3>
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
            {users.length} cédula{users.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Add single user */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newUserDocumentNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setNewUserDocumentNumber(val);
            }}
            placeholder="Número de cédula"
            inputMode="numeric"
            maxLength={15}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary transition-colors bg-slate-50 text-slate-900"
          />
          <Button
            variant="primary"
            leftIcon={Plus}
            onClick={handleAdd}
            loading={adding}
            disabled={!/^\d+$/.test(newUserDocumentNumber)}
          >
            Agregar
          </Button>
        </div>

        {/* CSV import */}
        <div className="mt-3 flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.txt"
            onChange={handleFileSelected}
            className="hidden"
          />
          <Button
            variant="outline"
            leftIcon={Upload}
            onClick={() => fileRef.current?.click()}
            loading={importing}
          >
            Importar CSV
          </Button>
          {csvStatus && (
            <span
              className={`text-sm flex items-center gap-1.5 ${
                csvStatus.type === "ok" ? "text-primary" : "text-danger"
              }`}
            >
              <FileText className="w-4 h-4" />
              {csvStatus.message}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <div className="p-10 text-center">
          <Small className="text-slate-400">
            No hay usuarios registrados para este edificio.
          </Small>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">
                  Cédula
                </th>
                <th className="text-right px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs w-24">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userDocumentNumber}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4 font-mono text-slate-900 font-medium">
                    {user.userDocumentNumber}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onDelete(user.userDocumentNumber)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger hover:text-danger-dark transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
