import Prose from 'components/prose';
import { notFound } from 'next/navigation';


export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({ params }) {
  // Simulamos una página con datos de ejemplo
  const simulatedPage = {
    title: 'Sample Page Title',
    seo: {
      title: 'Sample SEO Title',
      description: 'Sample SEO Description',
    },
    body: '<p>This is a sample page content.</p>',
    bodySummary: 'This is a sample page summary.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Comprobamos si la página simulada existe
  if (!simulatedPage) return notFound();

  return {
    title: simulatedPage.seo?.title || simulatedPage.title,
    description: simulatedPage.seo?.description || simulatedPage.bodySummary,
    openGraph: {
      publishedTime: simulatedPage.createdAt,
      modifiedTime: simulatedPage.updatedAt,
      type: 'article',
    },
  };
}

export default function Page({ params }) {
  // Simulamos una página con datos de ejemplo
  const simulatedPage = {
    title: 'Sample Page Title',
    body: '<p>This is a sample page content.</p>',
    updatedAt: new Date().toISOString(),
  };

  // Comprobamos si la página simulada existe
  if (!simulatedPage) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{simulatedPage.title}</h1>
      <Prose className="mb-8" html={simulatedPage.body} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(simulatedPage.updatedAt))}.`}
      </p>
    </>
  );
};
