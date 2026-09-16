export const formatCurrency = (value: number): string => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

export const formatDate = (iso: string | Date): string => {
  const date = typeof iso === 'string' ? new Date(iso) : iso;
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

export const formatDateTime = (iso: string | Date): string => {
  const date = typeof iso === 'string' ? new Date(iso) : iso;
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
};

export const truncate = (value: string, max = 80): string =>
  !value ? '' : value.length > max ? (value.slice(0, max).trim() + '...') : value;

export const slugify = (value: string): string =>
  value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

export const formatOrderId = (id: string): string =>
  id.startsWith('ORD-') || id.startsWith('#') ? id : ('#' + id);
