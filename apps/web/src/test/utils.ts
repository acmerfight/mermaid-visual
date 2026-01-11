/**
 * Test Utilities
 * Efficient async helpers following industry best practices
 * No mocking - uses real implementations with smart polling
 */

/**
 * Poll a condition until it returns true or timeout
 * More efficient than fixed timeouts - checks frequently and exits early
 */
export async function pollUntil(
  condition: () => boolean | Promise<boolean>,
  options: {
    timeout?: number;
    interval?: number;
    message?: string;
  } = {}
): Promise<void> {
  const { timeout = 5000, interval = 50, message = 'Condition not met' } = options;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const result = await condition();
    if (result) return;
    await sleep(interval);
  }

  throw new Error(`${message} (timeout: ${timeout}ms)`);
}

/**
 * Sleep for a specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait for a value to change from its initial value
 */
export async function waitForChange<T>(
  getValue: () => T,
  options: {
    timeout?: number;
    interval?: number;
  } = {}
): Promise<T> {
  const { timeout = 5000, interval = 50 } = options;
  const initialValue = getValue();
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const currentValue = getValue();
    if (currentValue !== initialValue) {
      return currentValue;
    }
    await sleep(interval);
  }

  throw new Error(`Value did not change from ${initialValue} within ${timeout}ms`);
}

/**
 * Wait for render status to reach a final state (not 'rendering' or 'idle')
 */
export async function waitForRenderComplete(
  getStatus: () => string,
  options: {
    timeout?: number;
    interval?: number;
  } = {}
): Promise<string> {
  const { timeout = 5000, interval = 50 } = options;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const status = getStatus();
    if (status === 'success' || status === 'error') {
      return status;
    }
    await sleep(interval);
  }

  const finalStatus = getStatus();
  if (finalStatus === 'success' || finalStatus === 'error') {
    return finalStatus;
  }

  throw new Error(`Render did not complete within ${timeout}ms. Final status: ${finalStatus}`);
}

/**
 * Wait for a specific status value
 */
export async function waitForStatus(
  getStatus: () => string,
  expectedStatus: string | string[],
  options: {
    timeout?: number;
    interval?: number;
  } = {}
): Promise<string> {
  const { timeout = 5000, interval = 50 } = options;
  const expected = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const status = getStatus();
    if (expected.includes(status)) {
      return status;
    }
    await sleep(interval);
  }

  const finalStatus = getStatus();
  throw new Error(
    `Expected status to be one of [${expected.join(', ')}] but got '${finalStatus}' after ${timeout}ms`
  );
}

/**
 * Retry an async operation until it succeeds or times out
 */
export async function retry<T>(
  operation: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: boolean;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 100, backoff = false } = options;
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxAttempts) {
        const waitTime = backoff ? delay * attempt : delay;
        await sleep(waitTime);
      }
    }
  }

  throw lastError;
}

/**
 * Measure execution time of an async operation
 */
export async function measureTime<T>(
  operation: () => Promise<T>
): Promise<{ result: T; duration: number }> {
  const startTime = Date.now();
  const result = await operation();
  const duration = Date.now() - startTime;
  return { result, duration };
}

