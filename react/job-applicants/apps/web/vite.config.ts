import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'



// https://vite.dev/config/
export default defineConfig(() => {
  const apiTarget = process.env.VITE_API_TARGET;

  if (!apiTarget) {
    throw new Error('Missing VITE_API_TARGET in apps/web/.env. Set it to http://localhost:3000 for local development.');
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          // strip the /api prefix before forwarding so backend routes like /applicants match
          rewrite: (path) => path.replace(/^\/api/, ''),
          // changeOrigin: true
        },
        '/rpc': {
          target: apiTarget,
          // proxy RPC calls to the API server
          // changeOrigin: true
        },
      },
    },
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        { find: '#src', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      ],
    },
  };
})
