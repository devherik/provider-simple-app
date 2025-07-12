import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src', // Adjust the path as necessary for your project structure
      '@components': '/src/components', // Example alias for components
      '@hooks': '/src/hooks', // Example alias for hooks
      '@utils': '/src/utils', // Example alias for utilities
      '@server': '/src/server', // Example alias for services
      '@providers': '/src/providers', // Example alias for providers
      '@presentation': '/src/presentation', // Example alias for presentation layer
      '@assets': '/src/assets', // Example alias for assets
    },
  }
})
