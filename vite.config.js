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
  server: {
    // open: true, // Automatically open the app on startup
    hmr: true,  // Hot Module Replacement (should be enabled by default)
  },

})
