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
    <div className="m-8 p-6 bg-white rounded-lg shadow-md mt-50">
      <h2 className="text-2xl font-bold mb-4">Compras Realizadas {user?.name}</h2>
      {!hasFetchedData ? (
        <p>Cargando compras...</p>
      ) : purchases.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left  hidden md:table">
            <thead>
              <tr className="text-gray-600 border-b border-gray-200">
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Dirección</th>
                <th className="p-3 font-semibold">Fecha</th>
                <th className="p-3 font-semibold">Estado</th>
                <th className="p-3 font-semibold">Ítems</th>
                <th className="p-3 font-semibold">Productos</th>
                <th className="p-3 font-semibold">Pago</th>
                <th className="p-3 font-semibold">Método de Pago</th>
                <th className="p-3 font-semibold">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{purchase.id}</td>
                  <td className="p-3">{purchase.address}</td>
                  <td className="p-3">{purchase.date}</td>
                  <td className="p-3">
                    {purchase.deliver_status === 0 ? "Pendiente" : "Entregado"}
                  </td>
                  <td className="p-3">{purchase.total_items}</td>
                  <td className="p-3 space-y-1">
                    {purchase.details.map((detail) => (
                      <div key={detail.id}>
                        Talla: {detail.variant.size} - ${detail.price} × {detail.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 space-y-1">
                    {purchase.payments.map((payment) => (
                      <div key={payment.id}>
                        {payment.converted_amount ?? payment.amount} USD
                      </div>
                    ))}
                  </td>
                  <td className="p-3 space-y-1">
                    {purchase.payments.map((payment) => (
                      <div key={payment.id}>
                        {payment.payment?.name} {payment.payment?.bank}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 space-y-1">
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
              <div key={purchase.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow">
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
