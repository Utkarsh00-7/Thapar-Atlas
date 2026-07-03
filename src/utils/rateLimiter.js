/**
 * Simple client-side rate limiter / request throttle.
 * Saves the timestamp of actions to localStorage to enforce cooldown periods.
 */

export function isActionAllowed(actionKey, cooldownMs = 60000) {
  try {
    const now = Date.now();
    const lastActionTime = localStorage.getItem(`rate_limit_${actionKey}`);
    
    if (lastActionTime) {
      const elapsed = now - Number(lastActionTime);
      if (elapsed < cooldownMs) {
        return {
          allowed: false,
          remainingTime: Math.ceil((cooldownMs - elapsed) / 1000)
        };
      }
    }
  } catch (e) {
    // Fallback if localStorage is disabled or corrupted
  }
  return { allowed: true, remainingTime: 0 };
}

export function recordAction(actionKey) {
  try {
    localStorage.setItem(`rate_limit_${actionKey}`, Date.now().toString());
  } catch (e) {
    // Ignore if localStorage is blocked
  }
}
