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
    '/api': 'http://localhost:3001/api',
    '/message': 'http://localhost:3001/message',
    '/messages': 'http://localhost:3001/messages',
    '/bundle': 'http://localhost:3001/bundle'
  }

})