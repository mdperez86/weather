export function formatDateTime(
  value: string | Date | number,
  options?: Intl.DateTimeFormatOptions
) {
  const formatter = new Intl.DateTimeFormat(undefined, options);
  const date = new Date(value);
  return formatter.format(date);
}

export function formatTime(value: string | Date) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  });
  return formatter.format(new Date(value));
}

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
) {
  const formatter = new Intl.NumberFormat(undefined, options);
  return formatter.format(value);
}
