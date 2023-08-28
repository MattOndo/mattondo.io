/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./wp-templates/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    screens: {
        'xs': '480px',
        'sm': '600px',
        'md': '782px',
        'lg': '960px',
        'xl': '1280px',
    },
    container: {
      center: true,
      padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '1rem',
      },
    },
    colors: {
      'teal': '#63f1db',
      'blue': '#0b1930',
      'slate':'#182946',
      'light-gray': '#96a8c6',
      'lighter-gray': '#c7d6f6',
      'black': '#0c1423',
      'white': '#ffffff'
    },
    fontFamily: {
      sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
      body: ['Fira Sans', ...defaultTheme.fontFamily.sans],
      mono: ['Fira Code', 'monospace'],
      display: ['Monoton', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: 'var(--fontsize-xs)',
      sm: 'var(--fontsize-sm)',
      base: 'var(--fontsize-base)',
      lg: 'var(--fontsize-lg)',
      xl: 'var(--fontsize-xl)',
      '2xl': 'var(--fontsize-2xl)',
      '3xl': 'var(--fontsize-3xl)',
      '4xl': 'var(--fontsize-4xl)',
    },
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { 
          fontSize: theme('fontSize.2xl'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700
        },
        'h2': { 
          fontSize: theme('fontSize.xl'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700
        },
        'h3': { 
          fontSize: theme('fontSize.lg'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700
        },
        'h4': { 
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700
        },
        'h5': { 
          fontSize: theme('fontSize.sm'),
          fontFamily: theme('fontFamily.body')
        },
        'h6': { 
          fontSize: theme('fontSize.xs'),
          fontFamily: theme('fontFamily.body')
        },
        'p': { 
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.body'),
          margin: '1rem auto'
        },
        'a': { fontFamily: theme('fontFamily.mono') },
      })
    })
  ]
}

