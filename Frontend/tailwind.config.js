import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        tangerine: ['Tangerine'],
        cinzel: ['Cinzel'],
        Lavish: ['sans-serif'],
      },
    },
  },
  plugins: [
    flowbitePlugin,
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          '-ms-overflow-style': 'none', /* For IE and Edge */
          'scrollbar-width': 'none', /* For Firefox */
        },
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none', /* Hide the scrollbar in WebKit-based browsers */
        },
      }, ['responsive', 'hover']);
    },
  ],
};
