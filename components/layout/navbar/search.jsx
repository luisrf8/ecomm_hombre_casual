"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e) {
    e.preventDefault();

    const val = e.target;
    const search = val.search;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full inline-flex">
      <button className="bg-blue-900 hover:bg-gray-400 text-gray-100 py-2 px-4 rounded-l">
        Todos
      </button>
      <input
        type="text"
        name="search"
        placeholder="Buscar un producto"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        style={{ border: '1px solid #BABABA'}}
        className="w-full border rounded-r bg-white px-4 py-4 text-sm text-black placeholder:text-neutral-800 "
        />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-7 text-neutral-400 font-bold" />
      </div>
    </form>
  );
}
