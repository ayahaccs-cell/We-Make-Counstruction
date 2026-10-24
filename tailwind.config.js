/** Palette: bone surface, obsidian type, navy/royal blue from the We Make logo. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F5F5F3",
        obsidian: "#111111",
        navy: "#003366",
        royal: "#0066CC",
      },
      fontFamily: {
        sans: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
