const plugin = require('tailwindcss/plugin')

const flip_card_utils = plugin(function({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg'
    },
    ".preserve-3d": {
      transformStyle: 'preserve-3d'
    },
    '.perspective': {
      perspective: "1000px"
    },
    '.backface-hidden': {
      backfaceVisibility: "hidden"
    }
  });
});

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))'
      }
    },
  },
  plugins: [flip_card_utils],
}
