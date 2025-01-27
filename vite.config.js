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
      "/api/office": {
        target: "http://54.205.247.215:8080", // URL del microservicio de oficinas
        changeOrigin: true,
        secure: false,

      },
    },
  },
});
