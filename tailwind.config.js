module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF9A00',
        'primary-background': '#F5F5F5',
        'navbar-background': '#0E172A',
        'project-green': '#59C64F',
        'taskbar':'#888B8D',
      },
      fontFamily:{
          'Lato':['"Lato"']
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
