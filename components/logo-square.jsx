import Image from 'next/image';

export default function LogoSquare({ size }) {
  return (
    <div
    >
      <Image
        className="h-10 w-50 object-cover"
        width={100}
        height={100}
        alt='hc'
        src="/inf.png"
      />
    </div>
  );
}
