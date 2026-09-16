export const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export const cn = (...classes: Array<string | number | false | null | undefined>): string =>
  classes.filter((c) => typeof c === 'string' && c).join(' ');

export const getEffectivePrice = (price: number, discountPrice?: number): number =>
  typeof discountPrice === 'number' && discountPrice < price ? discountPrice : price;

export const getDiscountPercent = (price: number, discountPrice?: number): number => {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
};

export const getCartCount = (items: Array<{ quantity: number }>): number =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const generateId = (prefix = 'id'): string =>
  prefix + '_' + Math.random().toString(36).slice(2, 10);

export const buildQueryString = (params: Record<string, unknown>): string => {
  const s = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') s.append(k, String(v));
  });
  const qs = s.toString();
  return qs ? ('?' + qs) : '';
};

export const debounce = <T extends (...args: any[]) => void>(fn: T, wait = 300) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

export const matchesSearch = (target: string, query: string): boolean =>
  !query.trim() || target.toLowerCase().includes(query.toLowerCase().trim());
