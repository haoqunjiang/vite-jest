import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...(process.env.NODE_ENV !== "test" ? [reactRefresh()] : [])],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
