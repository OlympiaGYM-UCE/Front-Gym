import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/empresas": {
        target: "http://52.20.30.108:8080", // URL del microservicio de empresas
        changeOrigin: true,
        secure: false,

      },

      "/api/office_list": {
        target: "http://98.85.58.85:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/office_list/, '/api/office')
      },
      "/api/office_save": {
        target: "http://13.216.39.139:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/office_save/, '/api/office')
      },
      "/api/office-delete": {
        target: "http://54.160.171.184:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/office-delete/, '/api/office')
      },

      "/api/office": {
        target: "http://54.205.247.215:8080", // URL del microservicio de empresas
        changeOrigin: true,
        secure: false,

      },
    },
  },
});
