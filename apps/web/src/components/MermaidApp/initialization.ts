/**
 * Initialization state management
 * Tracks whether the app has been initialized to prevent duplicate renders
 */

let initialized = false;

/**
 * Check if the app has been initialized
 */
export function isInitialized(): boolean {
  return initialized;
}

/**
 * Mark the app as initialized
 */
export function markInitialized(): void {
  initialized = true;
}

/**
 * Reset initialization state (useful for testing)
 */
export function resetInitialization(): void {
  initialized = false;
}

