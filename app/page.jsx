'use client';
import Carousel from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import LoadingOverlay from 'components/loading-overlay';
import api from 'lib/axios';
import { motion } from "motion/react";
import { useEffect, useState } from 'react';


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getArticles();
  }, []);

  function getArticles() {
    setIsLoading(true); // Activa el estado de carga
    api.get(`api/get-products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      })
      .finally(() => {
        setIsLoading(false); // Desactiva el estado de carga
      });
  }

  return (
    <>
      {isLoading ? (
        // Indicador de carga mientras se obtienen los datos
        <LoadingOverlay />
      ) : (
        // Contenido principal una vez que los datos están disponibles
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ThreeItemGrid itemProducts={products} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Carousel carouselProducts={products} title="Ofertas" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Carousel carouselProducts={products} title="Trending" />
          </motion.div>
          <Footer />
        </div>
      )}
    </>
  );
}
