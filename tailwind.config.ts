import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily:{
        'outfit':['Outfit']
      }
    }
  },

  plugins: []
} as Config;