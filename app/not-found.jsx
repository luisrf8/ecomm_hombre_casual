'use client';

import { Suspense } from 'react';

function NotFoundContent() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="mt-4 text-gray-600">Lo sentimos, no pudimos encontrar lo que buscas.</p>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Cargando error...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
