/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // VERY IMPORTANT for libraries
  },
}
