/** Palette: bone surface, obsidian type, navy and azure sampled from the We Make logo. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F5F5F3",
        obsidian: "#111111",
        navy: "#002C6C",
        royal: "#0094E8",
      },
      fontFamily: {
        sans: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
