/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./wp-templates/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./wp-blocks/**/*.{js,ts,jsx,tsx,mdx,css}",
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
  },
  safelist: [
    'md:flex-row-reverse',

    // Medium+ screen sizes
    'md:w-1/2',
    'md:w-1/3',
    'md:w-2/3',
    'md:w-1/4',
    'md:w-2/4',
    'md:w-3/4',
    'md:w-1/5',
    'md:w-2/5',
    'md:w-3/5',
    'md:w-4/5',
    'md:w-1/6',
    'md:w-2/6',
    'md:w-3/6',
    'md:w-4/6',
    'md:w-5/6',
    'md:w-1/12',
    'md:w-2/12',
    'md:w-3/12',
    'md:w-4/12',
    'md:w-5/12',
    'md:w-6/12',
    'md:w-7/12',
    'md:w-8/12',
    'md:w-9/12',
    'md:w-10/12',
    'md:w-11/12',
    'md:w-full',
    {
      pattern: /grid-cols-/
    },
    {
      pattern: /align-/
    },
    {
      pattern: /self-/
    }
  ],
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { 
          fontSize: theme('fontSize.2xl'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700,
          margin: '1rem 0',
          lineHeight: 1.1
        },
        'h2': { 
          fontSize: theme('fontSize.xl'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700,
          margin: '1rem 0',
          lineHeight: 1.1
        },
        'h3': { 
          fontSize: theme('fontSize.lg'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700,
          margin: '1rem 0',
          lineHeight: 1.1
        },
        'h4': { 
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.body'),
          fontWeight: 700,
          margin: '1rem 0',
          lineHeight: 1.1
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
          margin: '1rem auto',
          lineHeight: 1.3
        },
        'a': { 
          fontFamily: theme('fontFamily.mono'),
          color: theme('colors.teal')
        },
        'ul': { 
          listStyleType: 'disc',
          listStylePosition: 'outside',
          marginLeft: '1.25rem'
        },
        'ol': { 
          listStyleType: 'decimal',
          listStylePosition: 'outside',
          marginLeft: '1.25rem'
        },
        'li': {
          paddingLeft: '.5rem'
        }
      })
    }),
  ],
}

