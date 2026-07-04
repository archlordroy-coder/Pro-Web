/**
 * Cache simple en mémoire pour les requêtes API
 */
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

export function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache() {
  cache.clear();
}

export function clearCacheKey(key: string) {
  cache.delete(key);
}

/**
 * Gestion des erreurs API avec messages spécifiques
 */
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Une erreur inconnue s\'est produite';
}

/**
 * Retry logic pour les requêtes en cas d'erreur
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs * (i + 1)));
      }
    }
  }

  throw lastError;
}

/**
 * Debounce pour limiter les appels API fréquents
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delayMs: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delayMs);
  };
}

/**
 * Validation des erreurs réseau
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return error.message.includes('fetch') || error.message.includes('network');
  }
  return false;
}

/**
 * Validation des erreurs de timeout
 */
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('timeout') || error.message.includes('abort');
  }
  return false;
}
