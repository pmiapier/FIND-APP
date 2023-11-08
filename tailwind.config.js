/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        green: colors.emerald,
        blue: colors.blue,
        pink: colors.pink,
        purple: colors.violet,
        primaryBackground: '#F9F9FB',
        primaryGrayBorder: '#F4F4F4',
        readyToRent: '#1AD598',
        itemStock: '#808080',
        itemReserve: '#337AFF',
        itemRenting: '#FF33D6',
        itemPrice: '#FD2149',
        itemCategory: '#FD8B21',
        itemLocation: '#217EFD',
        viewProduct: '#474DE1',
        primaryButton: '#217EFD',
        hoverPrimaryButton: '#5FA0F9',
        messageButton: '#808080',
        hoverMessageButton: '#010101'
      }
    }
  },
  // plugins: [],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']
  }
};

// This is the default colors object
