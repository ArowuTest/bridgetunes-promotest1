module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'mtn-yellow': '#ffcc00',
        'mtn-black': '#000000',
        'mtn-gray': '#333333',
        'mtn-light': '#f5f5f5',
        'bridgetunes-blue': '#0056b3',
        'bridgetunes-light-blue': '#007bff',
        'bridgetunes-dark': '#212529',
        'bridgetunes-light': '#f8f9fa',
        'bridgetunes-gray': '#6c757d',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  safelist: [
    'bg-blue-700',
    'text-white',
    'text-yellow-400',
    'bg-yellow-400',
    'text-black',
    'bg-gray-900',
    'text-gray-300',
    'text-gray-400',
    'hover:text-yellow-400',
    'hover:bg-yellow-500',
    'hover:bg-blue-600',
    'hover:bg-yellow-300',
    'bg-blue-800',
    'bg-gray-50',
    'bg-white',
    'border-gray-200',
    'border-gray-300',
    'border-gray-800',
    'text-blue-700',
    'focus:ring-blue-500'
  ],
  plugins: [],
}
