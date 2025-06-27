import { useState } from "react";
import authService from "../../services/authService";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    const field = e.target.name;

    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form["password"].trim() || !form["email"].trim()) return;

    setLoading(true);

    setError(false);

    const response = await authService.login(form);

    setLoading(false);

    if (!response.ok) {
      setError(true);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <form
      onSubmit={onSubmit}
      id="login-form"
      className="flex gap-1 flex-col w-full"
    >
      <label htmlFor="email" className="text-white">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={onInputChange}
        placeholder="admin@delsurglobal.com"
        className="border-black border-1 rounded px-2 py-1 bg-slate-100"
      />

      <label htmlFor="password" className="text-white">
        Contraseña:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="******"
        required
        onChange={onInputChange}
        className="border-black border-1 rounded px-2 py-1 bg-slate-100"
      />

      {error && <i className="text-red-500 text-sm">Credenciales invalidas</i>}

      <button
        disabled={loading}
        type="submit"
        className="mt-6 bg-[var(--gold-color)] px-4 py-2 text-white rounded cursor-pointer"
      >
        {!loading ? "Iniciar sesión" : "Comprobando..."}
      </button>
    </form>
  );
}
