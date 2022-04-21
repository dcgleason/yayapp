import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const { resolve } = require('path')

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })



module.exports = defineConfig({
  plugins: [react()],
  proxy: {
    '/messages': {
         target: 'https://localhost:3001',
         changeOrigin: true,
         secure: false,      
         ws: true,
     },
     '/message': {
      target: 'https://localhost:3001',
      changeOrigin: true,
      secure: false,      
      ws: true,
  },
  '/email': {
    target: 'https://localhost:3001',
    changeOrigin: true,
    secure: false,      
    ws: true,
},
'/bundle': {
  target: 'https://localhost:3001',
  changeOrigin: true,
  secure: false,      
  ws: true,
}
},
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})