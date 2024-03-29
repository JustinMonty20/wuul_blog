/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      textColor: {
        "wuul-main": "#333333",
        "wuul-bg": "#F9F6EE",
        "wuul-black": "#000000",
        "wuul-accent": "#485F40",
        "wuul-purp": "#552583",
        "wuul-nav": "#6DB17C"
      },
      colors: {
        "wuul-green": "#63996A",
        "wuul-accent": "#485F40",
      },
      width: {
        "wuul-1/2": "50%"
      },
      fontFamily: {
        "main": ["Poppins", "sans-serif"],
        "sub": ["Nunito Variable", "sans-serif"]
      }
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("@tailwindcss/typography")
  ],
}

