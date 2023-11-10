'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GridTileImage } from './grid/tile';
// import './IndexCarousel.css'; // Asegúrate de tener un archivo CSS para los estilos del carrusel.

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const totalItems = 10; // Cambia el número total de elementos

  const items = Array.from({ length: totalItems }, (_, i) => `SLIDE ${i + 1}`);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        moveRight();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const moveLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + totalItems) % totalItems); // Cambia 3 para mostrar 3 items
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % totalItems); // Cambia 3 para mostrar 3 items
  };

  const sliderContainerStyle = {
    overflow: 'hidden',
  };

  const sliderListStyle = {
    display: 'flex',
    transition: 'transform 0.3s ease',
    transform: `translateX(-${currentIndex * (100 / 3)}%)`, // Divide por 3 para mostrar 3 items
  };

  const sliderItemStyle = {
    flex: `0 0 ${(100 / 3)}%`, // Divide por 3 para mostrar 3 items
    height: '15rem',
  };

  return (
    <div>
      <div id="slider" className='mt-12' style={sliderContainerStyle}>
        <a className="control_prev" onClick={moveLeft}>
          {'<'}
        </a>
        <a className="control_next" onClick={moveRight}>
          {'>>'}
        </a>
        <ul className="slider-list" style={sliderListStyle}>
          {items.map((item, index) => (
            <li key={index} className="flex justify-center" style={sliderItemStyle}>
              <div style={
                {backgroundColor: '',}
              }>
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
'use client'
<Link href={`/product/${product.handle}`} className="relative w-full">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
            // src={product.featuredImage?.url}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
    </Link>