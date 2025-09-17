/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* subtle warm gray */
        input: 'var(--color-input)', /* warm off-white */
        ring: 'var(--color-ring)', /* golden wheat */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* rich charcoal */
        primary: {
          DEFAULT: 'var(--color-primary)', /* warm terracotta */
          foreground: 'var(--color-primary-foreground)', /* warm off-white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* sage green */
          foreground: 'var(--color-secondary-foreground)', /* warm off-white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* earthy sienna */
          foreground: 'var(--color-destructive-foreground)', /* warm off-white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* subtle warm gray */
          foreground: 'var(--color-muted-foreground)', /* medium gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* golden wheat */
          foreground: 'var(--color-accent-foreground)', /* rich charcoal */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* warm off-white */
          foreground: 'var(--color-popover-foreground)', /* rich charcoal */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* warm off-white */
          foreground: 'var(--color-card-foreground)', /* rich charcoal */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* natural green */
          foreground: 'var(--color-success-foreground)', /* warm off-white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber gold */
          foreground: 'var(--color-warning-foreground)', /* rich charcoal */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* earthy sienna */
          foreground: 'var(--color-error-foreground)', /* warm off-white */
        },
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '8px',
        md: '4px',
        sm: '4px',
        xl: '16px',
      },
      boxShadow: {
        'warm': '0 4px 12px rgba(139, 69, 19, 0.08)',
        'warm-lg': '0 8px 24px rgba(139, 69, 19, 0.12)',
        'warm-xl': '0 16px 32px rgba(139, 69, 19, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-in': 'slideIn 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}