/** Warm architectural system from the reference; navy and azure sampled from the We Make logo. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          canvas: "#EBE7DF",
          line: "#D6D0C5",
        },
        espresso: "#1C1917",
        navy: "#002C6C",
        royal: "#0094E8",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
