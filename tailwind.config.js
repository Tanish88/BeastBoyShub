/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        bbsdark: '#0f0f0f',
        bbsred: '#ff0000',
        bbsglass: 'rgba(255, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3)',
        'neon-hover': '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)',
      }
    }
  },
  plugins: [],
}
