import OpengraphImage from 'components/opengraph-image';


export default function Image({ params }) {
  const { collection } = params;
  const title = `Simulated Collection: ${collection}`;

  // Simula la generación de la imagen OpenGraph con el título proporcionado
  return OpengraphImage({ title });
}
