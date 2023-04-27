import reactRefresh from "@vitejs/plugin-react-refresh";
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [react(), reactRefresh(), tsconfigPaths()],
  build: { sourcemap: true }
};