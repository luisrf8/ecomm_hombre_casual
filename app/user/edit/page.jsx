"use client";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mt-50">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <h3 className="text-lg font-semibold mb-2">Editar Perfil</h3>
      <label className="block mb-2">
        <span className="text-gray-700">Nombre:</span>
        <input
          type="text"
          name="name"
          value={user?.user?.name}
          className="w-full p-2 border border-gray-400 rounded"
          readOnly
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Correo Electrónico:</span>
        <input
          type="email"
          name="email"
          value={user?.user?.email}
          className="w-full p-2 border border-gray-400 rounded"
          readOnly
        />
      </label>
      <button className="w-full bg-gray-900 text-white p-2 rounded hover:bg-blue-600 mb-2">
        Guardar Cambios
      </button>
    </div>
  );
}
