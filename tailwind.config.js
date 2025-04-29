const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 👈 importante
  theme: {
    extend: {
      colors: {
        // Colores base
        black: '#000000',
        white: '#FFFFFF',
        'gray-dark': '#1A1A1A',
        'gray-medium': '#2C2C2C',
        'gray-metal': '#B3B3B3',

        // Acento (elige uno o cambia según estilo deseado)
        'accent-purple': '#6E44FF',
        'accent-gold': '#D4AF37',
        'accent-blue': '#00AEEF'
      },
      transitionDelay: {
        0: '0ms',
        150: '150ms',
        300: '300ms',
        500: '500ms'
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100%': { opacity: 0.2 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    })
  ]
};
