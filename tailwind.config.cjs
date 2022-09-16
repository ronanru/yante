module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '640px',
      md: '	768px',
      lg: '	1024px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#fafafa',
        100: '#ececec',
        200: '#e6e6e6',
        300: '#666666',
        400: '#444444',
        500: '#383838',
        600: '#303030',
        700: '#242424',
        800: '#1e1e1e'
      }
    }
  },

  plugins: []
};
