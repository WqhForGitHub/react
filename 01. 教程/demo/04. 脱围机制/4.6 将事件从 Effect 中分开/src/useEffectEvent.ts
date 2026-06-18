import { useCallback, useRef, useLayoutEffect } from 'react';

/**
 * useEffectEvent polyfill
 *
 * This is a polyfill for the experimental useEffectEvent Hook.
 * It creates a stable callback that always reads the latest values
 * from the closure, without being reactive itself.
 *
 * IMPORTANT: This is an experimental API. Do not use in production.
 * Only call Effect Events inside Effects.
 * Never pass Effect Events to other components or Hooks.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef<T>(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback(((...args: any[]) => {
    const fn = ref.current;
    return fn(...args);
  }) as T, []) as T;
}
