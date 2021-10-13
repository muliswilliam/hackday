const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetch coins price from CoinGecko
 * @param coinIds Array id of coins, get coin ids at COINGECKO_BASE_URL/coins/list
 * @param currencies Array of currencies, get supported currencies at COINGECKO_BASE_URL/supported_vs_currencies
 */
export async function fetchCoinsPrices(
  coinIds: string[],
  currencies: string[]
) {
  try {
    const ids = encodeURIComponent(coinIds.join(','));
    const vsCurrencies = encodeURIComponent(currencies.join(','));

    const headers = new Headers();
    headers.append('pragma', 'no-cache');
    headers.append('cache-control', 'no-cache');
    const url = `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;
    const request = new Request(url);
    const response = await fetch(request, {
      method: 'GET',
      headers,
    });
    if (response.ok) return response.json();
    else throw Error(response.statusText);
  } catch (error) {
    throw new Error('Fetching coin prices failed. Please try again later.');
  }
}
