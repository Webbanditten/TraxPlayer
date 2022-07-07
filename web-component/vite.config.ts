import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2015",
    lib: {
      name: "habbo-traxplayer",
      entry: 'src/habbo-traxplayer.ts',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      output: {
        minifyInternalExports: true,
        exports: 'none'
      },
    }
  }
})
