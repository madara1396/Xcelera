import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace this with your actual GitHub repository name
export default defineConfig({
  base: '/',
  plugins: [react()],
})
