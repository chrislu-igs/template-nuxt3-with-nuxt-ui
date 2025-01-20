import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

console.log('tailwind config: load themes fonts: ', defaultTheme.fontFamily.sans)
export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
