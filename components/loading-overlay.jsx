import { motion } from "motion/react";
import Image from 'next/image';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} // Animación de "pulse" con opacidad
        transition={{ duration: 1, repeat: Infinity }} // Repetir infinitamente
      >
        <Image
            className="h-10 w-50 object-cover"
            width={100}
            height={100}
            alt='hc'
            src="/inf.png"
        />
        {/* <div className="rounded-full h-16 w-16 bg-white"></div> */}
      </motion.div>
    </div>
  );
}