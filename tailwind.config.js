module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "20%, 40%": { transform: "translate3d(-10px, 0, 0)" },
          "60%, 80%": { transform: "translate3d(10px, 0, 0)" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "zoom-out": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        wiggle: "wiggle .5s ease-in-out",
        "zoom-in": "zoom-in .5s ease-in-out",
        "zoom-out": "zoom-out .5s ease-in-out",
      },
      backgroundColor: {
        skin: {
          primary: "var(--primary-color)",
          secondary: "var(--secondary-color)",
          muted: "var(--muted-color)",
          hover: "var(--hover-color)",
        }
      },
      colors: {
        skin: {
          primary: "var(--primary-color)",
          secondary: "var(--secondary-color)",
          muted: "var(--muted-color)",
          hover: "var(--hover-color)", 
        }
      }
    },
  },
  plugins: [],
};
