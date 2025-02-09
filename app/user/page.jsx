"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../lib/slices/auth.js"; // Importar la acción de logout

export default function UserProfile() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    dispatch(logout()); // Eliminar usuario de Redux
    
    // Forzar espera de 2 segundos antes de redirigir
    await new Promise((resolve) => setTimeout(resolve, 600)); 
  
    router.push("/"); // Redirigir a la página de inicio
  }
  
  
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>

      <h3 className="text-lg font-semibold mb-2">Compras Realizadas</h3>
      <table className="w-full mb-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Producto</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {user?.purchases?.map((purchase) => (
            <tr key={purchase.id} className="border">
              <td className="border p-2">{purchase.id}</td>
              <td className="border p-2">{purchase.product}</td>
              <td className="border p-2">${purchase.price}</td>
              <td className="border p-2">{purchase.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mb-2">Editar Perfil</h3>
      <label className="block mb-2">
        <span className="text-gray-700">Nombre:</span>
        <input
          type="text"
          name="name"
          value={user?.user?.name}
          className="w-full p-2 border rounded"
          readOnly
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Correo Electrónico:</span>
        <input
          type="email"
          name="email"
          value={user?.user?.email}
          className="w-full p-2 border rounded"
          readOnly
        />
      </label>
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2">
        Guardar Cambios
      </button>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
