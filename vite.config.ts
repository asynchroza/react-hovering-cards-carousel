import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
// import typescript2 from "rollup-plugin-typescript2"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    //  typescript2()
    ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/libs/index.ts'),
      name: 'React Hovering Cards Carousel',
      // the proper extensions will be added
      fileName: 'react-hovering-cards-carousel',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
})
