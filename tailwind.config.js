module.exports = {
  mode: 'jit',
  purge: {
    content: ['./index.html', './style/*', './src/**/*.{vue,js,ts,jsx,tsx}'],
    layers: ['base', 'components', 'utilities'],
    mode: 'layers'
  },
  theme: {
    // Extend the default Tailwind config here
    extend: {}
    // Replace the default Tailwind config here
  },
  corePlugins: {},
  plugins: []
}
