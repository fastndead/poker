import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // depending on your application, base can also be "/"
  build: {
    outDir: 'build',
  },
  base: '',
  plugins: [
    svgr({
      include: '**/*.svg',
    }),
    react(),
    viteTsconfigPaths(),
  ],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
})
