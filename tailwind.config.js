/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#F4CCC8',
          2: '#EBA59E',
          3: '#E27D73',
          4: '#DA584B',
        },
        secondary: {
          1: '#C8E1BC',
          2: '#AAD199',
          3: '#8DC275',
          4: '#70B252',
        },
        tertiary: {
          1: '#F9EED7',
          2: '#F2DAAB',
          3: '#EBC77F',
          4: '#E5B454',
        },
        neutral: {
          1: '#FFFFFF',
          2: '#94979A',
          3: '#393D41',
          4: '#2C2F33',
          5: '#222528',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'sans-serif'
        ],
      },
      fontSize: {
        // Display
        'xs': ['24px', { lineHeight: '32px', letterSpacing: '1px' }],
        's': ['32px', { lineHeight: '48px', letterSpacing: '1px' }],
        'm': ['48px', { lineHeight: '56px', letterSpacing: '1px' }],
        'l': ['56px', { lineHeight: '72px', letterSpacing: '1px' }],
        'xl': ['64px', { lineHeight: '88px', letterSpacing: '1px' }],
        // Body
        'body-s': ['13px', { lineHeight: '22px', letterSpacing: '0.25px' }],
        'body-m': ['15px', { lineHeight: '24px', letterSpacing: '0.75px' }],
        'body-l': ['18px', { lineHeight: '32px', letterSpacing: '0.75px' }],
        'body-xl': ['20px', { lineHeight: '32px', letterSpacing: '0.75px' }],
        // iOS Specific
        'ios-xs': ['31px', { lineHeight: '32px', letterSpacing: '1px' }],
        'ios-s': ['32px', { lineHeight: '34px', letterSpacing: '1px' }],
        'ios-m': ['33px', { lineHeight: '40px', letterSpacing: '1px' }],
        'ios-l': ['34px', { lineHeight: '48px', letterSpacing: '1px' }],
      }
    },
  },
  plugins: [],
}