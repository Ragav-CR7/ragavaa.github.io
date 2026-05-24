import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    strictPort: false,
  },
});
