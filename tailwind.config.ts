import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tab-black': '#1f1f25',
        'point-green': '#cbf147',
      },
    },
  },
  plugins: [],
} satisfies Config
