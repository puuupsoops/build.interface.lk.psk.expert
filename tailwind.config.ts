import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{vue,ts}'
    ],
    theme: {
        extend: {
            colors: {
                'light-font-color': 'gray-500',
                'light-bg-color': '#E5E7EB',
                'light-bg-color2': '#D1D5DB',
                'light-bg-default': '#1F2227',
                'light-accent-color': '#FAC12E',

                'dark-bg-color': '#15171C',
                'dark-bg-color2': '#292C32',
                'dark-bg-default': '#1F2227',
                'dark-font-color': '#A5A7A9',
                'dark-accent-color': '#FAC12E',
                },
        }
    },
    plugins: [formsPlugin],
})