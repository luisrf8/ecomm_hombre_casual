'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const IndexCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const items = products;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        moveRight();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const moveLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const sliderContainerStyle = {
    overflow: 'hidden',
  };

  const sliderListStyle = {
    display: 'flex',
    transition: 'transform 0.3s ease',
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  const sliderItemStyle = {
    flex: '0 0 100%',
    height: 'fit-content',
  };

  return (
    <>
      <div className='relative hidden md:block'>
        <div id="slider" className='w-full ' style={sliderContainerStyle}>
          <ul className="slider-list " style={sliderListStyle}>
            {items.map((item, index) => (
              <li key={index} className="slider-item" style={sliderItemStyle}>
                <Image
                  src={item.image}
                  alt={item.handle}
                  width={2500}
                  height={2500}
                  style={{height: '35rem'}}
                  className='w-full'
                  loading="eager"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-[3rem] h-1  ${
                index === currentIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              aria-current={index === currentIndex}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => handleSlideChange(index)}
            ></button>
          ))}
        </div>
        <div className="flex absolute bottom-[40%] left-8 z-30 space-x-3 -translate-y-1/2">
          <button
            className='left-arrow flex justify-center items-center'
            style={{backgroundColor: "#ffffff3b", borderRadius: '50%', width: '4rem', height: '4rem'}}
            onClick={moveLeft}

          >
            <ChevronLeftIcon
              className={clsx('h-12 transition-all ease-in-out hover:scale-110 text-white')}
            />
          </button>
        </div>
        <div className="flex absolute bottom-[40%] right-8 z-30 space-x-3 -translate-y-1/2">
          <button
            className='right-arrow flex justify-center items-center'
            style={{backgroundColor: "#ffffff3b", borderRadius: '50%', width: '4rem', height: '4rem'}}
            onClick={moveRight}
          >
            <ChevronRightIcon
              className={clsx('h-12 transition-all ease-in-out hover:scale-110 text-white')}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default IndexCarousel;
