import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // important: set correct base path for Nginx/OpenShift
  build: {
    outDir: "dist", // default is 'dist'
  },
  server: {
    port: 5173, // dev only
  },
});
