/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#182230',
        mist: '#f4efe6',
        berry: '#ab4459',
        gold: '#e2b35d',
        pine: '#31525b',
      },
      boxShadow: {
        card: '0 18px 40px rgba(24, 34, 48, 0.12)',
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        body: ['"Noto Sans SC"', '"PingFang SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
