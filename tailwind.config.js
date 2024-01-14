/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      textColor: {
        "wuul-main": "#333333",
        "wuul-bg": "#F9F6EE",
        "wuul-accent": "#552583",
        "wuul-gold": "#FDB927"
      },
      colors: {
        "wuul-green": "#63996A",
        "wuul-accent": "#552583"
      },
      width: {
        "wuul-1/2": "50%"
      },
      fontFamily: {
        // swap these out for different chat gpt combo font-families
        "main": ["Montserrat"],
        "sub": ["Merriweather"]
      }
    },
  },
  plugins: [
    require("tailwindcss-animated")
  ],
}

