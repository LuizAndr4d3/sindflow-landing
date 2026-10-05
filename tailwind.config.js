/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#09151A',
        navy: '#10233F',
        surface: '#16294A',
        azure: '#3C6FD6',
        sky: '#609DFF',
        flow: {
          DEFAULT: '#1E7BE8',
          // mesmo azul ~1% mais claro: em texto pequeno o oficial fica abaixo de 4,5:1
          texto: '#207EEA',
        },
        ink: '#EAF0F8',
        steel: '#8FA6C4',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderColor: {
        hairline: 'rgba(96, 157, 255, 0.14)',
      },
      backgroundImage: {
        'glow-radial':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(60, 111, 214, 0.18), transparent 70%)',
      },
      maxWidth: {
        wrap: '72rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
