import type { Config } from 'tailwindcss'
import scrollBarPlugin from 'tailwind-scrollbar'
import defaultTheme from 'tailwindcss/defaultTheme'

console.log('tailwind config: load themes fonts: ', defaultTheme.fontFamily.sans)
export default <Partial<Config>>{
  plugins: [
    scrollBarPlugin({ nocompatible: true }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
