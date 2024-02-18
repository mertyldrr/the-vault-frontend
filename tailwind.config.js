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
      colors: {
        seasalt: '#f8f9faff',
        'antiflash-white': '#e9ecefff',
        platinum: '#dee2e6ff',
        'french-gray': '#ced4daff',
        'french-gray-2': '#adb5bdff',
        'slate-gray': '#6c757dff',
        'outer-space': '#495057ff',
        onyx: '#343a40ff',
        'eerie-black': '#212529ff',
      },
    },
  },
  plugins: [require('daisyui')],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
