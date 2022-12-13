module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF9A00',
        'primary-background': '#F5F5F5',
        'navbar-background': '#0E172A',
        'project-green': '#59C64F',
        'greenBtn': '#5BBE62',
        'taskbar': '#888B8D',
        'E64646': '#E64646',
        'e64646': '#e64646',
        '81809F': '#81809F',
        'bec1be': '#bec1be',
        '636366': '#636366',
        'aaaaaa': '#aaaaaa',
        'e9e6e6': '#e9e6e6',
        'FFCD29': '#FFCD29',
        '9B9BA4': '#9B9BA4',
        'd9d9d95c': '#d9d9d95c',
        'E64646': '#E64646',
        'e64646': '#e64646',
        '81809F': '#81809F',
        'bec1be': '#bec1be',
        '636366': '#636366',
        'aaaaaa': '#aaaaaa',
        'e9e6e6': '#e9e6e6',
        'FFCD29': '#FFCD29',
        'd9d9d95c': '#d9d9d95c',
        '46464E': '#46464E',
        '5bbe62': '#5bbe62',
        'f2f3f5':'#f2f3f5',
        '0165c31a':'#0165c31a',
        '3D8AA4':'#3D8AA4'
      },
      fontFamily: {
        'Lato': ['"Lato"']
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
