'use client';
import { useEffect, useState } from 'react';

export default function InstallPromptIOS() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isIos = () =>
      /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator.standalone;

    if (isIos() && !isInStandaloneMode()) {
      setShowPrompt(true);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-yellow-100 text-black p-4 rounded shadow-lg z-50">
      <p className="text-sm">
        Para instalar esta app en tu iPhone, toca el botón de compartir
        <span className="mx-1">🔗</span> y selecciona <strong>“Agregar a pantalla de inicio”</strong>.
      </p>
    </div>
  );
}
