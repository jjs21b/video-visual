/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Primary sans-serif font
        pressStart: ['"Press Start 2P"', 'cursive'], // For specific headers or buttons
        orbitron: ['Orbitron', 'sans-serif'], // For futuristic looks
        bangers: ['Bangers', 'cursive'], // For bold, attention-catching text
        montserrat: ['Montserrat', 'sans-serif'], // Clean, modern look for body text
        audiowide: ['Audiowide', 'cursive'] // Techy feel, good for titles or UI elements
      }
    }
  }, // Added missing comma here
  variants: {
    extend: {},
  },
  plugins: [],
};
