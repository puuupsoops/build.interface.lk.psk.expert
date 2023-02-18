import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      svgLoader()
  ],
  server: {
    host: '0.0.0.0'
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
}
})
