'use client'
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
      <div className='relative'>
        <div id="slider" className='w-full' style={sliderContainerStyle}>
          <ul className="slider-list" style={sliderListStyle}>
            {items.map((item, index) => (
              <li key={index} className="slider-item" style={sliderItemStyle}>
                <Image
                  src={item.image}
                  alt={item.handle}
                  width={800}
                  height={400}
                  className='w-full'
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
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-current={index === currentIndex}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => handleSlideChange(index)}
            ></button>
          ))}
        </div>
        <div className="flex absolute bottom-[40%] left-8 z-30 space-x-3 -translate-y-1/2">
          <button className="control_prev" onClick={moveLeft}>
            {'<'}
          </button>
        </div>
        <div className="flex absolute bottom-[40%] right-8 z-30 space-x-3 -translate-y-1/2">
          <button className="control_next" onClick={moveRight}>
            {'>'}
          </button>
        </div>
      </div>
    </>
  );
};

export default IndexCarousel;
