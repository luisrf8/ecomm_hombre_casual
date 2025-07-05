import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';

export default async function OpengraphImage(props) {
  const { title } = {
    ...(props || {
      title: process.env.SITE_NAME,
    }),
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #444',
            height: 160,
            width: 160,
            borderRadius: 24,
          }}
        >
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p
          style={{
            marginTop: 48,
            fontSize: 96,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // No especificamos fonts, usará la fuente por defecto
    }
  );
}
