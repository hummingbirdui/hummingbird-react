/** Formats a byte count as a human-readable size (e.g. `1.5 MB`). */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  return `${parseFloat((bytes / k ** i).toFixed(decimals))} ${units[i]}`;
}
