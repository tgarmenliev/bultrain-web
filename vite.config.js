import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // The BulTrain API only allows these exact origins (CORS). Fail loudly instead of
  // silently moving to another port, where live data would be blocked.
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
})
