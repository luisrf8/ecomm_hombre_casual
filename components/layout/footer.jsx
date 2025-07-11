import FooterMenu from 'components/layout/footer-menu';
import { Suspense } from 'react';

export default function Footer() {
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';

  return (
    <footer className="text-sm text-neutral-500 bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-4 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu />
        </Suspense>
      </div>
      <div className="px-6 py-6">
        <div className="mx-auto md:flex w-full max-w-7xl xs:text-[0.75rem] dark:border-neutral-700 min-[1320px]:px-0">
          <p className="text-white">2024 Infinity Center C.A. | Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
