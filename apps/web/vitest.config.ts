/**
 * Vitest Configuration
 * Optimized for fast test execution following industry best practices
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Global test APIs (describe, it, expect, etc.)
    globals: true,
    
    // Browser-like environment for React components
    environment: 'jsdom',
    
    // Setup files run before each test file
    setupFiles: ['./src/test/setup.ts'],
    
    // Include CSS in tests
    css: true,
    
    // Parallel execution - use threads for better performance
    pool: 'threads',
    poolOptions: {
      threads: {
        // Use all available CPU cores
        minThreads: 1,
        maxThreads: 4,
      },
    },
    
    // Run test files in parallel
    fileParallelism: true,
    
    // Faster test isolation (reuse environment when safe)
    isolate: true,
    
    // Timeout configuration
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Fail fast on first error (optional, good for CI)
    // bail: 1,
    
    // Reporter configuration
    reporter: ['default'],
    
    // Coverage configuration (when needed)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
    
    // Include patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    
    // Exclude patterns
    exclude: ['node_modules', 'dist'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Optimize dependency pre-bundling for tests
  optimizeDeps: {
    include: ['jotai', 'mermaid'],
  },
});
