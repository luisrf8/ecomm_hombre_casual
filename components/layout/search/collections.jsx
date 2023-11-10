import clsx from 'clsx';
import { Suspense } from 'react';
import FilterList from './filter';

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 ';
const items = 'bg-neutral-400 ';

export default function Collections({itemsCollections, title}) {
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
      <FilterList list={itemsCollections} title={title}/>
    </Suspense>
  );
}
