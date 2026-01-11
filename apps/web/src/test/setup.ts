/**
 * Test Setup
 * Global test configuration and utilities
 */

import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';

// Extend Vitest's expect with DOM matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Global setup - runs once before all tests
beforeAll(() => {
  // Suppress console errors during tests (optional)
  // const originalError = console.error;
  // console.error = (...args) => {
  //   if (args[0]?.includes?.('getBBox')) return;
  //   originalError.apply(console, args);
  // };
});

// Re-export test utilities for convenience
export * from './utils';
