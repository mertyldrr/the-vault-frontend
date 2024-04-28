/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
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
      colors: {
        error: '#e3342f', // Your custom error color
        warning: '#f6993f', // Your custom warning color
        success: '#38c172', // Your custom success color
      },
        textColor: {
          'error': '#e3342f',
          'warning': '#f6993f',
          'success': '#38c172',
        },
    },
  },
};
