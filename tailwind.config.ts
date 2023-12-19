/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    'src/app/components/**/*.{ts,tsx}',
    'src/app/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    'src/app/**.{ts,tsx}',
    'src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        bg: "url('/assets/img/background.png')",
      },
      gridTemplateRows: {
        home: 'auto 1fr',
        homeItem: '1fr 0.3fr',
        body: '16rem 1fr',
      },
      gridTemplateColumns: {
        modal: '0.8fr, 1fr',
      },
      colors: {
        gray: '#495057',
        red: '#ff0000',
        white: '#ffffff',
        primary: '#FFC501',
        secondary: '#F4F4F4',
        input_color: '#133052',
        light_gray: '#EDF4FB',
        font_gray: '#3E4756',
        lent: '#ADB5BD',

        edit_color: '#167CE2',
        inactive_color: '#ED5E5E',
        active_color: '#49D749',
        h_gray: '#CDCDCD',
        'skeleton-gray': '#CCCCCC',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        up: {
          '0%': { transform: 'translate(0, 0)', 'font-size': '16px' },
          '100%': { transform: 'translate(0, -23px)', 'font-size': '14px' },
        },
        down: {
          '0%': { transform: 'translate(0, -23px)', 'font-size': '14px' },
          '100%': { transform: 'translate(0, 0)', 'font-size': '16px' },
        },
        left: {
          '0%': { transform: 'translate(100%, 0)' },
          '20%': { transform: 'translate(0, 0)' },
          '80%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(100%, 0)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'smooth-to-top-select': {
          '0%': { top: -40, opacity: 0 },
          '100%': { top: -0, opacity: 1 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        getup: 'up 0.09s ease-in',
        getdown: 'down 0.09s ease-in',
        rotateup: 'rotate 0.1s ease-in',
        'smooth-opacity': 'opacity 0.3s ease-in',
        'smooth-top-select': 'smooth-to-top-select 0.13s ease-in',
        'smooth-left': 'left 3.5s ease',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
