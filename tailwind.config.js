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
        'E64646':'#E64646',
        'e64646':'#e64646',
        '81809F':'#81809F',
        'bec1be':'#bec1be',
        '636366':'#636366',
        'aaaaaa':'#aaaaaa',
        'e9e6e6':'#e9e6e6',
        'FFCD29':'#FFCD29'
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
