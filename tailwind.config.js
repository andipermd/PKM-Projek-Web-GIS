/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "pop": ["Poppins"]
      }

    },
  },
  plugins: [require("daisyui")],
}

