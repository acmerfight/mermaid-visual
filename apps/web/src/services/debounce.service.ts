/**
 * Debounce Service
 * Provides debouncing functionality for async operations
 */

type DebouncedCallback<T> = (value: T) => void | Promise<void>;

/**
 * Creates a debounced version of a callback function
 * Ensures only the last call within the delay period is executed
 */
export class Debouncer<T> {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private currentExecutionId = 0;

  constructor(
    private callback: DebouncedCallback<T>,
    private delay: number
  ) {}

  /**
   * Execute the debounced callback
   * @param value - The value to pass to the callback
   */
  execute(value: T): void {
    // Clear any pending timer
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Increment execution ID to track the latest call
    const executionId = ++this.currentExecutionId;

    // Set new timer
    this.timer = setTimeout(async () => {
      // Only execute if this is still the most recent call
      if (executionId === this.currentExecutionId) {
        await this.callback(value);
      }
    }, this.delay);
  }

  /**
   * Cancel any pending debounced call
   */
  cancel(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Execute immediately without waiting for debounce
   * @param value - The value to pass to the callback
   */
  async executeImmediate(value: T): Promise<void> {
    this.cancel();
    this.currentExecutionId++;
    await this.callback(value);
  }

  /**
   * Get the current execution ID (useful for race condition handling)
   */
  getCurrentExecutionId(): number {
    return this.currentExecutionId;
  }
}

/**
 * Factory function to create a debouncer
 */
export function createDebouncer<T>(
  callback: DebouncedCallback<T>,
  delay: number
): Debouncer<T> {
  return new Debouncer(callback, delay);
}
