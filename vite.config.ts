import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const appVersion = process.env.npm_package_version.replace(/\./g, "")
const htmlPlugin = () => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            return html
                .replaceAll('.js', '.js?v=' + appVersion)
                .replaceAll('.css', '.css?v=' + appVersion)
        },
    }
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        htmlPlugin(),
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: `assets/js/[name].[hash].js`,
                entryFileNames: `assets/js/[name].[hash].js`,
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').pop();
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }
                    if (/eot|ttf|woff2?/i.test(extType)) {
                        extType = 'font';
                    }
                    return `assets/${extType}/[name].[hash][extname]`;
                },
            }
        }
    },
    server: {
    host: '0.0.0.0'
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    }
})
