module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#295F62",
      },
      keyframes: {
        pulseGradient: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pulse-gradient": "pulseGradient 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#295F62",
        },
      },
    ],
  },
};
