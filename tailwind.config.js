/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
      aspectRatio: {
        'w-16': 16,
        'h-9': 9,
      },
      colors: {
        // Custom colors for dark mode
        'dark-card': '#1F2937',
        'dark-hover': '#374151',
        'dark-border': '#374151',
        // Black and blue theme colors
        'blue-950': '#0A1A35',
        'blue-925': '#0E2045',
        'blue-900': '#102C5A',
        'blue-875': '#153A70',
        // Black theme colors
        'gray-950': '#0A0A0A',
        'gray-925': '#121212',
        'gray-900': '#171717',
        'gray-875': '#1A1A1A',
        'gray-850': '#1E1E1E',
      },
      backgroundColor: {
        'dark-page': '#111827',
        'blue-night': '#0A1A35',
        'black-night': '#0A0A0A',
      },
      textColor: {
        'dark-primary': '#F9FAFB',
        'dark-secondary': '#D1D5DB',
        'dark-muted': '#9CA3AF',
      },
      borderColor: {
        'blue-dark': '#153A70',
        'gray-dark': '#2A2A2A',
      },
      gradientColorStops: {
        'blue-dark-start': '#102C5A',
        'blue-dark-end': '#0A1A35',
        'gray-dark-start': '#171717',
        'gray-dark-end': '#0A0A0A',
      },
    },
  },
  plugins: [],
};