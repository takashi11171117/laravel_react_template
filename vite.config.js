import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  resolve: {
    alias: {
      '@': 'resources/ts',
    },
  },
  plugins: [
    laravel({
      refresh: true,
      input: ['resources/sass/*', 'resources/ts/*'],
    }),
    react(),
    tsconfigPaths(),
  ],
})
