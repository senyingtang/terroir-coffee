/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        bg2:      'var(--bg2)',
        bg3:      'var(--bg3)',
        text:     'var(--text)',
        text2:    'var(--text2)',
        taupe:    'var(--taupe)',
        'taupe-lt': 'var(--taupe-lt)',
        line:     'var(--line)',
        accent:   'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
    },
  },
}
