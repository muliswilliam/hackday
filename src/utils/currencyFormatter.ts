export function formatToCurrency(
  amount: number,
  locale = 'en-US',
  currency = 'USD'
): string {
  const intl = new Intl.NumberFormat(locale, { style: 'currency', currency });

  return intl.format(amount);
}
