import type { H3Event } from "h3";

// Memory monitoring and debugging counters
let totalRefreshesStarted = 0;
let totalRefreshesCompleted = 0;
let totalRefreshesTimedOut = 0;
let maxConcurrentRefreshes = 0;

// Debug configuration
const DEBUG_MEMORY = process.env.NODE_ENV === "development" || process.env.AUTH_DEBUG === "true";

/** Increment refresh started counter */
export function incrementRefreshStarted() {
  totalRefreshesStarted++;
}

/** Increment refresh completed counter */
export function incrementRefreshCompleted() {
  totalRefreshesCompleted++;
}

/** Increment refresh timed out counter */
export function incrementRefreshTimedOut() {
  totalRefreshesTimedOut++;
}

/** Update max concurrent refreshes */
export function updateMaxConcurrent(current: number) {
  maxConcurrentRefreshes = Math.max(maxConcurrentRefreshes, current);
}

/** Get current refresh memory statistics */
export function getRefreshMemoryStats(activeRefreshes: Map<string, any>) {
  const pendingRefreshes = Array.from(activeRefreshes.entries())
    .filter(([, entry]) => entry.status === "pending")
    .map(([key, entry]) => ({
      key,
      userId: entry.userId,
      age: Date.now() - entry.timestamp
    }));

  return {
    activeCount: activeRefreshes.size,
    maxConcurrent: maxConcurrentRefreshes,
    totalStarted: totalRefreshesStarted,
    totalCompleted: totalRefreshesCompleted,
    totalTimedOut: totalRefreshesTimedOut,
    estimatedMemoryKB: Math.round(((activeRefreshes.size * 150) / 1024) * 100) / 100, // ~150 bytes per entry
    pendingRefreshes
  };
}

/** Log memory and performance statistics */
export function logMemoryStats(activeRefreshes: Map<string, any>) {
  const stats = getRefreshMemoryStats(activeRefreshes);
  console.debug(`[Auth Memory Stats]`, {
    activeRefreshes: stats.activeCount,
    maxConcurrent: stats.maxConcurrent,
    totalStarted: stats.totalStarted,
    totalCompleted: stats.totalCompleted,
    totalTimedOut: stats.totalTimedOut,
    successRate: `${((stats.totalCompleted / Math.max(1, stats.totalStarted)) * 100).toFixed(1)}%`,
    memoryEstimate: `${stats.estimatedMemoryKB}KB`,
    pendingRefreshes: stats.pendingRefreshes
  });
}

/** Check if debug mode is enabled */
export function isDebugEnabled() {
  return DEBUG_MEMORY;
}

/** Log debug message if debug mode is enabled */
export function debugLog(message: string, ...args: any[]) {
  if (DEBUG_MEMORY) {
    console.debug(`[Auth Debug] ${message}`, ...args);
  }
}

/** Log debug warning if debug mode is enabled */
export function debugWarn(message: string, ...args: any[]) {
  if (DEBUG_MEMORY) {
    console.warn(`[Auth Debug] ${message}`, ...args);
  }
}

/** Reset all counters (for testing) */
export function resetCounters() {
  totalRefreshesStarted = 0;
  totalRefreshesCompleted = 0;
  totalRefreshesTimedOut = 0;
  maxConcurrentRefreshes = 0;
}

/** Get detailed debug info about a specific refresh */
export function getRefreshDebugInfo(
  refreshToken: string,
  activeRefreshes: Map<string, any>,
  getRefreshTokenKey: (token: string) => string
) {
  const key = getRefreshTokenKey(refreshToken);
  const entry = activeRefreshes.get(key);

  if (!entry) {
    return { found: false, key };
  }

  return {
    found: true,
    key,
    userId: entry.userId,
    status: entry.status,
    age: Date.now() - entry.timestamp,
    timestamp: entry.timestamp
  };
}

/** Create a debug endpoint handler for monitoring */
export function createDebugEndpoint(activeRefreshes: Map<string, any>) {
  return defineEventHandler(async (event: H3Event) => {
    // Only allow in development or with debug flag
    if (!isDebugEnabled()) {
      throw createError({
        statusCode: 404,
        statusMessage: "Debug endpoint not available"
      });
    }

    const stats = getRefreshMemoryStats(activeRefreshes);

    return {
      timestamp: new Date().toISOString(),
      memory: stats,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        authDebug: process.env.AUTH_DEBUG,
        debugEnabled: isDebugEnabled()
      },
      actions: {
        clearAll: "/api/auth/debug/clear",
        logs: "/api/auth/debug/logs"
      }
    };
  });
}
