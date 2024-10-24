"use client";

import { decodeJwt } from 'jose';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../core/services/authService";
import Link from 'next/link';

export default function SignUpPage() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = decodeJwt(token);
      const userRoles = decodedToken?.roles || [];

      if (userRoles.includes("USER")) {
        router.push("/todo");
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!loading) {
    }
  }, [loading]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await registerUser(username, password, email);
      setSuccessMessage("Registro exitoso. Redirigiendo...");

      setTimeout(() => {
        router.push("/todo");
      }, 2000);
    } catch (error) {
      setError("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Regístrate
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
          {successMessage && <p className="text-green-500 text-center font-semibold">{successMessage}</p>}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Registrarse
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
