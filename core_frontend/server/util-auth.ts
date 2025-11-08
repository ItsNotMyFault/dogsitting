import type { H3Event } from "h3";
import {
	debugWarn,
	getRefreshMemoryStats,
	incrementRefreshCompleted,
	incrementRefreshStarted,
	incrementRefreshTimedOut,
	isDebugEnabled,
	logMemoryStats,
	updateMaxConcurrent
} from "./auth-debug";

/** What we keep in the session (no tokens) */
type SessionShape = {
	id?: string;
	user?: any;
	tokenExpiresAt?: number; // ms epoch
	tokenType?: string;
	// Add for race condition detection
	lastRefreshTime?: number;
};

type TokenUpdate = {
	accessToken: string;
	refreshToken?: string;
	tokenExpiresAt?: number;
	lastRefreshTime: number;
};

// Lightweight in-memory cache for very short-term deduplication only
// This is bounded and self-cleaning to prevent memory issues at scale
const activeRefreshes = new Map<
	string,
	{
		promise: Promise<TokenUpdate>;
		timestamp: number;
		userId?: string; // For debugging
		status: "pending" | "resolved" | "rejected";
	}
>();

// Aggressive cleanup to prevent memory leaks - optimized for 100-150 users
const REFRESH_LOCK_TTL = 15000; // 15 seconds max (reduced from 30s)
const CLEANUP_INTERVAL = 5000; // 5 seconds (more frequent cleanup)
const MAX_ACTIVE_REFRESHES = 200; // Hard limit to prevent memory issues

setInterval(() => {
	const now = Date.now();
	const keysToDelete: string[] = [];
	const beforeSize = activeRefreshes.size;

	for (const [key, entry] of activeRefreshes.entries()) {
		if (now - entry.timestamp > REFRESH_LOCK_TTL) {
			keysToDelete.push(key);
			if (entry.status === "pending") {
				incrementRefreshTimedOut();
				debugWarn(
					`Refresh timed out: ${key}, userId: ${entry.userId || "unknown"}, age: ${now - entry.timestamp}ms`
				);
			}
		}
	}

	keysToDelete.forEach((key) => activeRefreshes.delete(key));

	// Update max concurrent tracking
	updateMaxConcurrent(activeRefreshes.size);

	// Debug logging
	if (isDebugEnabled() && (beforeSize > 0 || keysToDelete.length > 0)) {
		console.debug(
			`[Auth Debug] Cleanup: ${keysToDelete.length} removed, ${activeRefreshes.size} remaining`
		);
	}

	// Emergency cleanup if we hit the limit
	if (activeRefreshes.size > MAX_ACTIVE_REFRESHES) {
		console.warn(`[Auth] Emergency cleanup: ${activeRefreshes.size} active refreshes`);
		// Remove oldest entries first
		const entries = Array.from(activeRefreshes.entries()).sort(
			([, a], [, b]) => a.timestamp - b.timestamp
		);

		const toRemove = entries.slice(0, activeRefreshes.size - MAX_ACTIVE_REFRESHES);
		toRemove.forEach(([key]) => {
			const entry = activeRefreshes.get(key);
			if (entry?.status === "pending") incrementRefreshTimedOut();
			activeRefreshes.delete(key);
		});
	}

	// Periodic memory stats (every minute in debug mode)
	if (isDebugEnabled() && now % 60000 < CLEANUP_INTERVAL) {
		logMemoryStats(activeRefreshes);
	}
}, CLEANUP_INTERVAL);

/** Get current refresh memory statistics (wrapper for debug module) */
export function getAuthMemoryStats() {
	return getRefreshMemoryStats(activeRefreshes);
}

/** Force cleanup of all active refreshes (for debugging) */
export function clearAllActiveRefreshes() {
	const count = activeRefreshes.size;
	activeRefreshes.clear();
	console.debug(`[Auth Debug] Cleared ${count} active refreshes`);
	return count;
}

/** Get cookie names with configurable prefix */
function getTokenCookieNames(event: H3Event) {
	const config = useRuntimeConfig(event);
	const prefix =
		(config as any).auth?.cookiePrefix || process.env.NUXT_AUTH_COOKIE_PREFIX || "nucl";

	return {
		accessToken: `${prefix}-access-token`,
		refreshToken: `${prefix}-refresh-token`
	};
}

/** Get cookie configuration */
function getTokenCookieConfig(event: H3Event) {
	const config = useRuntimeConfig(event);
	const publicConfig = config.public as any;

	return {
		httpOnly: true,
		secure: config.cookies?.secure ?? process.env.NODE_ENV === "production",
		sameSite: (config.cookies?.sameSite as "lax" | "strict" | "none") ?? "lax",
		path: "/",
		...(config.cookies?.domain && { domain: config.cookies.domain })
	};
}

/** Read access token from cookie */
export function getAccessToken(event: H3Event): string | undefined {
	const cookieNames = getTokenCookieNames(event);
	console.log("cookieNames", cookieNames);
	const cookie = getCookie(event, cookieNames.accessToken);
	console.log("cookie", cookie);

	return cookie;
}

/** Read refresh token from cookie */
function getRefreshToken(event: H3Event): string | undefined {
	const cookieNames = getTokenCookieNames(event);
	return getCookie(event, cookieNames.refreshToken);
}

/** Set access token cookie */
function setAccessToken(event: H3Event, token: string, expiresAt: number) {
	const cookieConfig = getTokenCookieConfig(event);
	const cookieNames = getTokenCookieNames(event);
	const maxAge = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));

	setCookie(event, cookieNames.accessToken, token, {
		...cookieConfig,
		maxAge
	});
}

/** Set refresh token cookie */
function setRefreshToken(event: H3Event, token: string) {
	const cookieConfig = getTokenCookieConfig(event);
	const cookieNames = getTokenCookieNames(event);

	setCookie(event, cookieNames.refreshToken, token, {
		...cookieConfig,
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});
}

/** Clear token cookies */
function clearTokenCookies(event: H3Event) {
	const cookieNames = getTokenCookieNames(event);
	deleteCookie(event, cookieNames.accessToken);
	deleteCookie(event, cookieNames.refreshToken);
}

/** Read most recent session (server-only) */
async function readSession(event: H3Event): Promise<SessionShape | null> {
	try {
		return (await getUserSession(event)) as SessionShape;
	} catch {
		return null;
	}
}

/** Require a session (401 if none) */
export async function requireSession(event: H3Event): Promise<SessionShape> {
	return (await requireUserSession(event)) as SessionShape;
}

/** Generate a stable key for the refresh token */
function getRefreshTokenKey(refreshToken: string): string {
	// Use a simple hash to create a short, stable key
	// This avoids storing sensitive data while keeping memory usage minimal
	let hash = 0;
	for (let i = 0; i < refreshToken.length; i++) {
		const char = refreshToken.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return Math.abs(hash).toString(36).slice(0, 8); // 8-character key
}

/** Ensure we have a not-near-expiry access token; otherwise refresh */
export async function ensureFreshAccessToken(event: H3Event): Promise<string> {
	const cfg = useRuntimeConfig(event) as any;
	const skewMs = ((cfg?.auth?.tokenRefreshBuffer ?? 60) as number) * 1000;

	const session = await readSession(event);
	console.log("session////////////", session);

	if (!session) {
		throw createError({ statusCode: 401, statusMessage: "No session found" });
	}

	const accessToken = getAccessToken(event);
	const now = Date.now();

	// Check if token is still fresh
	if (accessToken && session.tokenExpiresAt && session.tokenExpiresAt > now + skewMs) {
		return accessToken;
	}

	// Add jitter to prevent refresh storms (spread refreshes over time)
	const jitterMs = Math.random() * 5000; // 0-5 seconds
	if (accessToken && session.tokenExpiresAt && session.tokenExpiresAt > now + skewMs - jitterMs) {
		// Token is close to expiry but within jitter window - use it for now
		return accessToken;
	}

	// Need to refresh
	const newAccessToken = await refreshAccessToken(event);
	return newAccessToken;
}

/**
 * Cookie-optimized refresh token handling
 * - Uses refresh token as the lock key (since that's what actually matters)
 * - Implements "last writer wins" with timestamp checking
 * - Handles cookie session race conditions properly
 */
export async function refreshAccessToken(event: H3Event): Promise<string> {
	const currentSession = await readSession(event);
	// const refreshToken = getRefreshToken(event);

	// if (!currentSession || !refreshToken) {
	// 	throw createError({ statusCode: 401, statusMessage: "No refresh token available" });
	// }

	const cfg = useRuntimeConfig(event) as any;
	const skewMs = ((cfg?.auth?.tokenRefreshBuffer ?? 60) as number) * 1000;
	const now = Date.now();

	// Double-check if token became fresh (another request might have refreshed)
	const accessToken = getAccessToken(event);
	return accessToken as any;
	if (
		accessToken && currentSession &&
		currentSession.tokenExpiresAt &&
		currentSession.tokenExpiresAt > now + skewMs
	) {
		return accessToken;
	}

	const refreshTokenKey = getRefreshTokenKey(refreshToken);

	// Check if there's already a refresh in progress for this refresh token
	const existingRefresh = activeRefreshes.get(refreshTokenKey);
	if (existingRefresh) {
		// Wait for the existing refresh and then read the updated tokens
		const update = await existingRefresh.promise;

		// Check if we have the updated tokens
		const updatedAccessToken = getAccessToken(event);
		const updatedSession = await readSession(event);

		if (updatedAccessToken && updatedSession?.lastRefreshTime === update.lastRefreshTime) {
			return updatedAccessToken;
		}

		// If we don't have the updated tokens yet, apply the update ourselves
		setAccessToken(event, update.accessToken, update.tokenExpiresAt || Date.now() + 3600000);
		if (update.refreshToken) {
			setRefreshToken(event, update.refreshToken);
		}

		await replaceUserSession(event, {
			...currentSession,
			tokenExpiresAt: update.tokenExpiresAt,
			lastRefreshTime: update.lastRefreshTime
		});

		return update.accessToken;
	}

	// Start new refresh process
	const refreshPromise = performTokenRefresh(event, currentSession, refreshToken);

	// Store the active refresh with debugging info
	const session = await readSession(event);
	activeRefreshes.set(refreshTokenKey, {
		promise: refreshPromise,
		timestamp: now,
		userId: session?.id || session?.user?.id,
		status: "pending"
	});

	incrementRefreshStarted();
	updateMaxConcurrent(activeRefreshes.size);

	try {
		const update = await refreshPromise;

		// Mark as resolved
		const entry = activeRefreshes.get(refreshTokenKey);
		if (entry) {
			entry.status = "resolved";
			incrementRefreshCompleted();
		}

		return update.accessToken;
	} catch (error) {
		// Mark as rejected
		const entry = activeRefreshes.get(refreshTokenKey);
		if (entry) {
			entry.status = "rejected";
		}
		throw error;
	} finally {
		// Cleanup the active refresh after completion
		activeRefreshes.delete(refreshTokenKey);
	}
}

/**
 * Perform the actual token refresh with proper cookie handling
 */
async function performTokenRefresh(
	event: H3Event,
	initialSession: SessionShape,
	initialRefreshToken: string
): Promise<TokenUpdate> {
	const cfg = useRuntimeConfig(event) as any;

	// Re-read tokens to get the absolute latest refresh token
	// (in case another request rotated it between the initial read and now)
	const currentRefreshToken = getRefreshToken(event);
	if (!currentRefreshToken) {
		throw createError({
			statusCode: 401,
			statusMessage: "Refresh token disappeared during refresh"
		});
	}

	// If the refresh token changed, another process completed a refresh
	if (currentRefreshToken !== initialRefreshToken) {
		// Use the new tokens from the other process
		const currentAccessToken = getAccessToken(event);
		const currentSession = await readSession(event);

		if (currentAccessToken && currentSession?.tokenExpiresAt) {
			return {
				accessToken: currentAccessToken,
				refreshToken: currentRefreshToken,
				tokenExpiresAt: currentSession.tokenExpiresAt,
				lastRefreshTime: currentSession.lastRefreshTime || Date.now()
			};
		}
	}

	// Use cfg.oauth.zitadel instead of cfg.zitadel (nuxt-auth-utils manages OAuth config)
	const zitadelConfig = cfg.oauth?.zitadel || cfg.zitadel;
	const tokenUrl = `https://${zitadelConfig.domain}/oauth/v2/token`;
	const clientId: string = zitadelConfig.clientId;
	const clientSecret: string | undefined = zitadelConfig.clientSecret;
	const form = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: currentRefreshToken,
		client_id: clientId
	});
	if (clientSecret) form.set("client_secret", clientSecret);

	let resp: any;
	try {
		resp = await $fetch(tokenUrl, {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: form
		});
	} catch (e: any) {
		const msg =
			e?.response?._data?.error_description ||
			e?.response?._data?.error ||
			e?.statusMessage ||
			"Refresh failed";

		throw createError({ statusCode: e?.response?.status || 400, statusMessage: msg });
	}

	const accessToken: string | undefined = resp?.access_token;
	const rotatedRefresh: string | undefined = resp?.refresh_token;

	if (!accessToken) {
		throw createError({ statusCode: 400, statusMessage: "No access_token in refresh response" });
	}

	const expiresInSec = getExpiresIn(resp);
	const tokenExpiresAt = Date.now() + (Number.isFinite(expiresInSec) ? expiresInSec * 1000 : 0);
	const lastRefreshTime = Date.now();

	const tokenUpdate: TokenUpdate = {
		accessToken,
		refreshToken: rotatedRefresh ?? currentRefreshToken,
		tokenExpiresAt,
		lastRefreshTime
	};

	// Update cookies with new tokens
	setAccessToken(
		event,
		tokenUpdate.accessToken,
		tokenUpdate.tokenExpiresAt || Date.now() + 3600000
	);
	if (tokenUpdate.refreshToken) {
		setRefreshToken(event, tokenUpdate.refreshToken);
	}

	// Update session with metadata (no tokens)
	await replaceUserSession(event, {
		...initialSession,
		tokenExpiresAt: tokenUpdate.tokenExpiresAt,
		lastRefreshTime: tokenUpdate.lastRefreshTime
	});

	return tokenUpdate;
}

/** Resolve expires_in seconds (prefer expires_in; else derive from JWT exp) */
export function getExpiresIn(tokens: { expires_in?: number; access_token?: string }): number {
	if (typeof tokens.expires_in === "number") return tokens.expires_in;
	if (!tokens.access_token) return 0;

	try {
		const parts = tokens.access_token.split(".");
		if (parts.length !== 3 || !parts[1]) return 0;
		const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
		if (!payload?.exp) return 0;
		const nowSec = Math.floor(Date.now() / 1000);
		return Math.max(0, Number(payload.exp) - nowSec);
	} catch {
		return 0;
	}
}

/**
 * Check if a session refresh is safe to perform
 */
export async function canRefreshSafely(event: H3Event): Promise<boolean> {
	const refreshToken = getRefreshToken(event);
	if (!refreshToken) return false;

	// Check if another process is already refreshing this token
	const refreshTokenKey = getRefreshTokenKey(refreshToken);
	const existingRefresh = activeRefreshes.get(refreshTokenKey);

	return !existingRefresh;
}

/**
 * Clear session and token cookies
 */
export async function logoutAndClearSession(event: H3Event): Promise<void> {
	const refreshToken = getRefreshToken(event);
	if (refreshToken) {
		const refreshTokenKey = getRefreshTokenKey(refreshToken);
		activeRefreshes.delete(refreshTokenKey);
	}

	clearTokenCookies(event);
	await clearUserSession(event);
}

/**
 * Set initial tokens after login
 */
export async function setInitialTokens(
	event: H3Event,
	accessToken: string,
	refreshToken: string,
	tokenExpiresAt: number
): Promise<void> {
	setAccessToken(event, accessToken, tokenExpiresAt);
	setRefreshToken(event, refreshToken);
}
