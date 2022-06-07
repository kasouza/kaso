module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif']

    },
    extend: {
      lineHeight: {
        // normal: 2
      },
      colors: {
        'red-error': '#cc4444',
      }
    },
  },
  plugins: [],
}
