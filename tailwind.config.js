/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  presets: [require('./tailwind.preset.js')],
  purge: {
    content: ['./index.html', './style/*', './src/**/*.{vue,js,ts,jsx,tsx}'],
    layers: ['base', 'components', 'utilities'],
    mode: 'layers'
  },
  theme: {
    typography: (theme) => ({}),
    extend: {}
    // Replace the default Tailwind config here
  },
  corePlugins: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')]
}
