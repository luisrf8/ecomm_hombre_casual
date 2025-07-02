'use client';
import Image from 'next/image';
import { useState } from 'react';

export function Gallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      {/* Imagen principal */}
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        <Image
          className="h-full w-full object-contain p-4"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          src={`${process.env.BASE_URL}/storage/${images[currentIndex].path}`}
          alt={`Imagen ${currentIndex + 1}`}
          priority={true}
        />
      </div>
      {/* Miniaturas */}
      <div className="flex justify-center gap-4 overflow-x-auto px-4 mb-10">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 border-2 rounded-md cursor-pointer ${
              currentIndex === index ? 'border-gray-200' : 'border-transparent'
            }`}
            onClick={() => handleSelect(index)}
          >
            <Image
              src={`${process.env.BASE_URL}/storage/${img.path}`}
              alt={`Miniatura ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
