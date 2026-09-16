import { STORAGE_KEYS } from '../config/constants';

export const getStorage = <T>(key: string, fallback: T): T => {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
};

export const setStorage = <T>(key: string, value: T): void => {
  try { if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

export const removeStorage = (key: string): void => {
  try { if (typeof window !== 'undefined') window.localStorage.removeItem(key); } catch {}
};

export const getCartStorage = <T>(fallback: T) => getStorage<T>(STORAGE_KEYS.CART, fallback);
export const setCartStorage = <T>(value: T) => setStorage<T>(STORAGE_KEYS.CART, value);
export const getWishlistStorage = <T>(fallback: T) => getStorage<T>(STORAGE_KEYS.WISHLIST, fallback);
export const setWishlistStorage = <T>(value: T) => setStorage<T>(STORAGE_KEYS.WISHLIST, value);
export const getTokenStorage = (): string | null => getStorage<string | null>(STORAGE_KEYS.TOKEN, null);
export const setTokenStorage = (token: string): void => setStorage<string>(STORAGE_KEYS.TOKEN, token);
export const removeTokenStorage = (): void => removeStorage(STORAGE_KEYS.TOKEN);
export const getUserStorage = <T>(fallback: T) => getStorage<T>(STORAGE_KEYS.USER, fallback);
export const setUserStorage = <T>(user: T): void => setStorage<T>(STORAGE_KEYS.USER, user);
export const removeUserStorage = (): void => removeStorage(STORAGE_KEYS.USER);
