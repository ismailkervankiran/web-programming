import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2311012067 sayısını 2311010000'e yuvarlıyor,
    // mod(--no, 360) yanlış renk veriyor. Bu yüzden CSS küçültülmüyor.
    cssMinify: false,
  },
})
