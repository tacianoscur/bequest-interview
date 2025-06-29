const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        nav: {
          background: 'hsl(var(--nav-background))',
        },
        card: {
          background: 'hsl(var(--card-background))',
        },
        secondary: 'hsl(var(--secondary))',
      },
    },
  },
  plugins: [],
};
