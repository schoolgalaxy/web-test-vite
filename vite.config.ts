import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets', // Specify the directory for static assets in the build output
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for large libraries
          'react-vendor': ['react', 'react-dom'],
          'aws-amplify': ['aws-amplify', '@aws-amplify/ui-react', '@aws-amplify/ui-react-storage'],
          'router': ['react-router-dom'],
          // Node modules chunk for other dependencies
          'vendor': ['web-vitals'],
        },
      },
    },
    // Increase chunk size warning limit to 1000kb
    chunkSizeWarningLimit: 1000,
  },
})
