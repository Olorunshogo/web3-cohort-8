/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sepolia-dark': '#0f172a', 
        'sepolia-darker': '#020617',
        'sepolia-blue': '#3b82f6',
        'sepolia-accent': '#60a5fa',
      },
    },
  },
  plugins: [],
};
