import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'translate(0px, 0px);',
          },
          '25%': {
            transform: 'translate(-2px, 0px);',
          },
          '75%': {
            transform: 'translate(2px, 0px);',
          },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out ',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
