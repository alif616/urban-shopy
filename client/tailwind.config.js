/** @type {import("tailwindcss").Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.04em' },
      scale: { '108': '1.08' },
      transitionDuration: { '700': '700ms' },
    },
  },
  plugins: [],
};
