** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ng: {
          bg: '#0b0e14',
          card: '#121826',
          text: '#eaeaea',
          accent: '#64d2ff',
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
