import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import macrosPlugin from 'vite-plugin-babel-macros'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  envDir: './resources/ts/env',
  resolve: {
    alias: {
      '@': 'resources/ts',
    },
  },
  plugins: [
    laravel({
      refresh: true,
      input: ['resources/ts/index.tsx'],
    }),
    react({
      jsxImportSource: '@emotion/react',
    }),
    macrosPlugin(),
    tsconfigPaths(),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
})
