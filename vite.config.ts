import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/taptap-game/',
  server: {
    proxy: {
      '/lark-api': {
        target: 'https://open.larksuite.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lark-api/, ''),
      },
    },
  },
})
