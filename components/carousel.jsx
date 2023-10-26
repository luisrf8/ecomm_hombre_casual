'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react'; // Import useState
import { GridTileImage } from './grid/tile';

const Carousel = ({ carouselProducts, title }) => {
  const [current, setCurrent] = useState(0);
  const numImages = carouselProducts.length;
  const [itemsPerPage, setItemsPerPage] = useState(1); // Inicialmente, muestra 1 elemento

  useEffect(() => {
    // Añade un listener de ventana para ajustar el número de elementos mostrados según el ancho de la pantalla
    function handleResize() {
      if (window.innerWidth >= 1458) {
        // Pantalla mediana (md) o más grande
        setItemsPerPage(4);
      }
      else if (window.innerWidth >= 568) {
        // Pantalla mediana (md) o más grande
        setItemsPerPage(2);
      } else {
        // Pantalla extra pequeña (xs)
        setItemsPerPage(1);
      }
    }

    // Llama a la función de manejo de redimensionamiento cuando se carga la página
    handleResize();

    // Agrega el oyente de redimensionamiento
    window.addEventListener('resize', handleResize);

    // Limpia el oyente cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleLeftArrowClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(numImages - itemsPerPage);
    }
  };

  const handleRightArrowClick = () => {
    if (numImages > current + itemsPerPage) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  const sliderListStyle = {
    display: 'flex',
    transition: 'transform 0.3s ease',
    // transform: `translateX(-${current * (100 / itemsPerPage)}%)`,
  };

  const startIndex = current;
  const endIndex = current + itemsPerPage;

  return (
    <div className='carousel-container mt-[5rem] mb-[10rem] md:pl-[13rem] md:pr-[13rem] pl-[4rem] pr-[4rem]'>
      <div className='flex justify-between mb-3 pl-[1rem] pr-[1rem]'>
        <div className='flex gap-5'>
        <p className="text-lg font-semibold flex items-center">{title}</p>
        <button className='text-[#FFB406]'>Ver más</button>
        </div>
        <div className='carousel-arrows'>
          <button
            className='left-arrow'
            onClick={handleLeftArrowClick}
          >
            <ChevronLeftIcon
              className={clsx('h-12 transition-all ease-in-out hover:scale-110 text-black-900')}
            />
          </button>
          <button
            className='right-arrow'
            onClick={handleRightArrowClick}
          >
            <ChevronRightIcon
              className={clsx('h-12 transition-all ease-in-out hover:scale-110 text-black-900')}
            />
          </button>
        </div>
      </div>
      <div className='carousel flex justify-center'>
        <ul className='slider-list h-[25rem] w-[100rem] gap-10' style={sliderListStyle}>
          {carouselProducts.slice(startIndex, endIndex).map((product, i) => (
            <li
              key={`${product.handle}${i}`}
              className='w-full'
              
            >
             <Link href={`/product/${product.handle}`} className="relative w-full">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  // src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
