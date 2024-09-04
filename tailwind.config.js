/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',  // Scanning .tsx files in the src/app directory
    './src/pages/**/*.{js,ts,jsx,tsx}',  // Scanning .tsx files in the src/pages directory
    './src/components/**/*.{js,ts,jsx,tsx}',  // Scanning .tsx files in the src/components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
