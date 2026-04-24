import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic',
  })],
  build: {
    lib: {
      entry: "src/index.js",
      name: "AuraUI",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") return "index.es.js";
        if (format === "cjs") return "index.cjs.js";
      }
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "lucide-react": "LucideReact"
        }
      }
    }
  }
});