/** Silva-style palette: shades of raw concrete and alpine stone, nothing else. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        concrete: {
          white: "#FFFFFF",
          light: "#E4E4E4",
          mid: "#949494",
          stone: "#2F2F2F",
          black: "#000000",
        },
      },
      fontFamily: {
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
