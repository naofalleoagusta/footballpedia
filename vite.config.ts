import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@hooks": fileURLToPath(
        new URL("./src/hooks", import.meta.url)
      ),
      "@types": fileURLToPath(
        new URL("./src/types", import.meta.url)
      ),
      "@helpers": fileURLToPath(
        new URL("./src/helpers", import.meta.url)
      ),
    },
  },
  server: {
    port: 4000,
  },
});
