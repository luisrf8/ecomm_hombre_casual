import OpengraphImage from 'components/opengraph-image';

export default async function Image({ params }) {
  // Simula la obtención de datos de una página con un título
  const pageTitle = "Título de la Página";

  // Llama a la función OpengraphImage con el título simulado
  const ogImage = await OpengraphImage({ title: pageTitle });

  return ogImage;
}
