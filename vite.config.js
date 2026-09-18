import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import { visualizer } from 'rollup-plugin-visualizer' // 👈 1. Importas el visualizador
import { ROUTE_SEGMENTS } from './src/utils/routes'

const SITE_HOST = 'https://blucotravel.com'
const ALL_ROUTES = Array.from(
  new Set([...Object.values(ROUTE_SEGMENTS.es), ...Object.values(ROUTE_SEGMENTS.en)])
).map((path) => (path === '/' ? '/' : path))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: SITE_HOST,
      dynamicRoutes: ALL_ROUTES,
      readable: true,
      exclude: ['/'],
    }),
    visualizer({ 
      open: true,       // Abre automáticamente el reporte en el navegador al compilar
      filename: 'stats.html', // Nombre del archivo de reporte generado
      gzipSize: true,   // Muestra el tamaño comprimido (gzip) que es el real para la web
      brotliSize: true  // Muestra el tamaño con compresión brotli
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-i18next') || id.includes('i18next')) return 'i18n'
            if (id.includes('@fortawesome')) return 'icons'
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) return 'vendor'
            return 'vendor'
          }
        },
      },
    },
  },
})