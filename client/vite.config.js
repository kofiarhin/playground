import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      include: ['src/components/**/*.jsx', 'src/hooks/**/*.js']
    }
  }
});
