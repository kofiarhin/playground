import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure a single React instance across deps (monorepo-safe)
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 4000,
  },
});
