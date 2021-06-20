module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '4/7': '50%',
        '9/12': '70%',
        '4/12': '28%',
        '1/7': '19%',
      },
      inset: {
       '64': '16rem',
       '1/5': '63%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
