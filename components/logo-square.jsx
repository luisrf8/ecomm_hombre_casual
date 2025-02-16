import Image from 'next/image';

export default function LogoSquare({ size }) {
  return (
    <div
    >
                    <Image
                className="h-25 w-25 object-cover"
                width={100}
                height={100}
                alt='hc'
                src="/hc.png"
              />
{/* Hombre Casual */}
    </div>
  );
}
