module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256,256,256,0.4)",
        lighttextGray: "#9ca0ab",
        card: "rgba(255,255,255,0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
      height: {
        650: "650px",
        255: "255px",
        420: "420px",
        340: "340px",
      },
      width: {
        190: "190px",
        350: "350px",
        340: "340px",
        375: "375px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
