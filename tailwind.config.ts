import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// REPLACE the existing `colors: { ... }` block with this
colors: {
  background: '#000000',          // page background -> pure black
  foreground: '#E9E6E2',          // main text -> warm off-white
  card: {
    DEFAULT: '#0b0b0b',           // card bg (slightly lighter than page)
    foreground: '#EDE9E4'
  },
  popover: {
    DEFAULT: '#0b0b0b',
    foreground: '#EDE9E4'
  },
  primary: {
    DEFAULT: '#d1b891',           // Rhueyra gold (use for buttons/accents)
    foreground: '#0b0b0b'
  },
  secondary: {
    DEFAULT: '#2a2a2a',
    foreground: '#E9E6E2'
  },
  muted: {
    DEFAULT: '#151515',
    foreground: '#BFBAB3'
  },
  accent: {
    DEFAULT: '#b88f4a',
    foreground: '#0b0b0b'
  },
  destructive: {
    DEFAULT: '#ad2b2b',
    foreground: '#fff'
  },
  border: '#151515',
  input: '#0d0d0d',
  ring: '#2b2b2b',
  chart: {
    '1': '#d1b891',
    '2': '#b88f4a',
    '3': '#8f6b2a',
    '4': '#5b4120',
    '5': '#34220f'
  }
}
}
},
  plugins: [require("tailwindcss-animate")],
};
export default config;
