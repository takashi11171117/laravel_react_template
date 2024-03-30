import { defineConfig } from 'vite'
import macrosPlugin from 'vite-plugin-babel-macros'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    macrosPlugin(),
    tsconfigPaths(),
  ],
})
