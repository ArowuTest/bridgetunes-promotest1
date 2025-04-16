module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mtn-yellow': '#ffcc00',
        'mtn-black': '#000000',
        'mtn-gray': '#333333',
        'mtn-light': '#f5f5f5',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
