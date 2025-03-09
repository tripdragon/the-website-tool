import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "/the-website-tool/",
  resolve: {
    alias: {
      '@stores' : '/src/stores',
      '@tools' : '/src/comps/Tools'
    },
  },

})
