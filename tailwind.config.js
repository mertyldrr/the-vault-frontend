/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        newsletter: "url('src/assets/newsletter-bg.jpeg')",
      },
      fontFamily: {
        notoDisplay: ['Noto Sans Display Variable', 'sans-serif'],
        notoSerif: [
          'Noto Serif Variable',
          'Times New Roman',
          'Georgia',
          'serif',
        ],
        atkinson: ['Atkinson Hyperlegible', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
