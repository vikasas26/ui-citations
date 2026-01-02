import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: false, // 🔥 THIS FIXES YOUR TYPES DISAPPEARING
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ui-citations',
      fileName: 'ui-citations',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
})
