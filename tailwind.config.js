/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          blue: '#1e3a8a'
        },
        emerald: {
          green: '#10b981'
        }
      }
    },
  },
  plugins: [],
}