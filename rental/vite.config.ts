import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: ["rentals.work.gd", "localhost"],
    port: 5174,
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
});
