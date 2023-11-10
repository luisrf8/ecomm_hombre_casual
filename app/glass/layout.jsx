import Footer from 'components/layout/footer';
// import Collections from 'components/layout/search/collections';
import { Suspense } from 'react';

// const glassCollection = [
//   { id: 'collection1', title: 'Vidrio Laminado' },
//   { id: 'collection2', title: 'Vidrio Templado' },
//   { id: 'collection3', title: 'Vidrio Insulado' },
//   { id: 'collection4', title: 'Vidrio Antirreflectante' },
//   { id: 'collection5', title: 'Extras' },
//   { id: 'collection6', title: 'Electrodomesticos' },
//   // Agrega más colecciones simuladas si es necesario
// ];
// const titleCollection = "Colecciones"

export default function SearchLayout({ children }) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 mt-6 pb-4 text-black  md:flex-row">
        {/* <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections itemsCollections={glassCollection} title={titleCollection}/>
        </div> */}
        <div className="order-last min-h-screen w-full md:order-none ">{children}</div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div> */}
      </div>
      <Footer />
    </Suspense>
  );
}
