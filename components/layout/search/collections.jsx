import clsx from 'clsx';
import { Suspense } from 'react';
// import FilterList from './filter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 ';
const items = 'bg-neutral-400 ';

export default function Collections({id, description}) {
  const pathname = usePathname();

  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      {description ? <h3 className="hidden text-blue-900 font-semibold md:block">{description}</h3> : null}
      <li className="mt-2 flex text-black ">
        <Link
          href={`/${pathname}/${id}`}
          className={clsx(
            'w-full text-sm underline-offset-4 hover:underline ',
            // {
            //   'underline underline-offset-4': active
            // }
          )}
        >
          {description}
        </Link>
      </li>
      {/* <FilterList list={itemsCollections} title={title}/> */}
    </Suspense>
  );
}
