import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      // EMPRESAS
      "/api/bussines": {
        target: "http://52.20.30.108:8080", // URL del microservicio de empresas
        changeOrigin: true,
        secure: false,

      },


// OFFICE
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
      
      // PRODUCTOS
      "/api/prod_list": {
        target: "http://44.204.193.108:8000",  
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/prod_list/, '/productos/')
},
      "/api/prod_save": {
        target: "http://35.174.107.150:8000",  
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/prod_save/, '/productos/')
},

      "/api/prod_delete": {
        target: "http://18.207.156.150:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/prod_delete/, '/productos/')
      },

      "/api/prod_update": {
        target: "http://54.152.113.164:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/prod_update/, '/productos/')
      },

      // CLIENTES
      "/api/clients_list": {
        target: "http://54.152.113.164:3000",  
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/clients_list/, '/api/clientes')
      },

    "/api/clients_save": {
        target: "http://54.152.113.164:3002",  
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/clients_save/, '/api/clientes')
      },

      "/api/clients_delete": {
    target: "http://54.152.113.164:3004",  
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api\/clients_delete/, '/api/clientes')
},

    "/api/clients_update": {
    target: "http://54.152.113.164:3003",  
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api\/clients_update/, '/api/clientes')
},

"/api/memberships": {
    target: "http://54.152.113.164:8080", // URL del microservicio de empresas
    changeOrigin: true,
    secure: false,
}

      


      
    },
  },
});
