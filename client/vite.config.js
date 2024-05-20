import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "export DATABASE_URI=postgresql://mattkennedy:Kv42t7VQJAGXxaD80los6jUF6l2oAJwg@dpg-cp5e4ei1hbls73fds3k0-a.ohio-postgres.render.com/band_app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
