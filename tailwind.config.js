module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
      },
      screens: {
        xs: { min: "360px", max: "700px" },
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      colors: {
        primary: "#f2647f",
        secondary: "#feadb9",
        thirdly: "#4c426e",
      },
    },
  },
  plugins: [],
};
