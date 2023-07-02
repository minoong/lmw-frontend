import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "lmw-vue-ui",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "cjs" ? "js" : "mjs"}`,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.ts"),
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => assetInfo.name,
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
