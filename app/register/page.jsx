"use client";
import api from 'lib/axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../../lib/slices/auth.js"; // Importar la acción de login

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const response = await api.post('api/registerEcomm', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      const userData = response.data;
      dispatch(login(userData)); // Guarda en Redux
      router.push('/'); // Redirige a home

    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar el usuario.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tu Nombre"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          ¿Ya tienes una cuenta? 
          <Link href="/login">
            <span className="text-blue-600 hover:underline"> Inicia sesión aquí</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
