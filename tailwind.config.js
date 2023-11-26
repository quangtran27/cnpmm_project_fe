/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        base: '0 0 4px rgba(0,0,0,0.12)',
      },
      colors: {
        primary: '#1d4ed8',
        secondary: '#db2777',
      },
      height: {
        header: '60px',
      },
    },
  },
  important: true,
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1d4ed8',
          secondary: '#db2777',
          accent: '#1dcdbc',
          neutral: '#2b3440',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
}
