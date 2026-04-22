import React, { useState } from "react";

const AdministrationLoginPage: React.FC = () => {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = cedula.trim();
    if (!value) {
      setError("Ingrese la cédula");
      return;
    }
    if (!/^\d+$/.test(value)) {
      setError("La cédula debe contener solo números");
      return;
    }
    setError("");
    try {
      localStorage.setItem("cedula", value);
    } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido</h2>
          <p className="mb-4">
            Cédula ingresada: <strong>{cedula}</strong>
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setSubmitted(false)}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md w-full"
        aria-label="form-login"
      >
        <h1 className="text-2xl font-semibold mb-4">Ingresar</h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cédula
        </label>
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          placeholder="Ingrese su cédula"
          inputMode="numeric"
        />
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AdministrationLoginPage;
