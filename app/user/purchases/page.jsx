"use client";
import api from "lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const [purchases, setPurchases] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (user?.id) {
      api.get(`api/orders/${user.id}`, {
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log("response", response.data);
          setPurchases(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener compras:", error);
        })
        .finally(() => {
          setHasFetchedData(true);
        });
    }
  }, [user?.id]);

  return (
    <div className="m-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Compras Realizadas {user?.name}</h2>
      {!hasFetchedData ? (
        <p>Cargando compras...</p>
      ) : purchases.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 hidden md:table">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Dirección</th>
                <th className="border p-2">Fecha</th>
                <th className="border p-2">Estado de Entrega</th>
                <th className="border p-2">Total Ítems</th>
                <th className="border p-2">Productos</th>
                <th className="border p-2">Pago</th>
                <th className="border p-2">Método de Pago</th>
                <th className="border p-2">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="border">
                  <td className="border p-2">{purchase.id}</td>
                  <td className="border p-2">{purchase.address}</td>
                  <td className="border p-2">{purchase.date}</td>
                  <td className="border p-2">
                    {purchase.deliver_status === 0 ? "Pendiente" : "Entregado"}
                  </td>
                  <td className="border p-2">{purchase.total_items}</td>
                  <td className="border p-2">
                    {purchase.details.map((detail) => (
                      <div key={detail.id}>
                        {detail.variant.size} - ${detail.price} x {detail.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border p-2">
                    {purchase.payments.map((payment) => (
                      <div key={payment.id}>
                        {payment.amount} {payment.currency}
                      </div>
                    ))}
                  </td>
                  <td className="border p-2">
                    {purchase.payments.map((payment) => (
                      <div key={payment.id}>{payment.payment_method}</div>
                    ))}
                  </td>
                  <td className="border p-2">
                    {purchase.payments.map((payment) => (
                      <div key={payment.id}>{payment.reference}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Diseño responsive en formato tarjeta */}
          <div className="md:hidden">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                <p className="font-bold">ID: {purchase.id}</p>
                <p>Dirección: {purchase.address}</p>
                <p>Fecha: {purchase.date}</p>
                <p>Estado: {purchase.deliver_status === 0 ? "Pendiente" : "Entregado"}</p>
                <p>Total Ítems: {purchase.total_items}</p>
                <p className="font-bold mt-2">Productos:</p>
                {purchase.details.map((detail) => (
                  <p key={detail.id}>
                    {detail.variant.size} - ${detail.price} x {detail.quantity}
                  </p>
                ))}
                <p className="font-bold mt-2">Pago:</p>
                {purchase.payments.map((payment) => (
                  <p key={payment.id}>
                    {payment.amount} {payment.currency} - Método: {payment.payment_method} - Ref: {payment.reference}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
