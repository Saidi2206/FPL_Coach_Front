export const fmtPrice = (n: number) => `£${n.toFixed(1)}m`;

export const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export const compact = (n: number) =>
  Math.abs(n) >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
  export const fmtInt = (n: number | null | undefined) =>
  n == null ? '—' : n.toLocaleString('fr-FR');