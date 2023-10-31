'use client';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  // const previousSearchParams = new URLSearchParams(searchParams.toString());
  // const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  // previousSearchParams.set('image', previousImageIndex.toString());
  // const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black  flex items-center justify-center';

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        <Image
          className="h-full w-full object-contain"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          src={images.url}
          alt='hola'
          priority={true}
        />
{/* 
        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur ">
              <Link
                aria-label="Previous product image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowLeftIcon className="h-5" />
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link
                aria-label="Next product image"
                className={buttonClassName}
                scroll={false}
              >
                <ArrowRightIcon className="h-5" />
              </Link>
            </div>
          </div>
        ) : null} */}
      </div>

      {/* {images.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null} */}
    </>
  );
}
