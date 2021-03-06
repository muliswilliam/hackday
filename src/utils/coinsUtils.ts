import { ICoin } from '../components/coin/icoin';

interface CoinIcon {
  coinId: string;
  name: string;
  symbol: string;
  icon: string;
}

const coinIcons: CoinIcon[] = [
  {
    coinId: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'btc.svg',
  },
  {
    coinId: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'eth.svg',
  },
  {
    coinId: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    icon: 'bnb.svg',
  },
  {
    coinId: 'basic-attention-token',
    name: 'Basic Attention Token',
    symbol: 'BAT',
    icon: 'bat.svg',
  },
];

export const getCoinIcon = (coinId: string): CoinIcon | undefined => {
  return coinIcons.find((coinIcon) => coinIcon.coinId === coinId);
};

export const getDefaultCoinIds = (): string[] => {
  return coinIcons.map((coin) => coin.coinId);
};

export const getDefaultCurrencies = (): string[] => {
  return ['usd', 'btc'];
};

export const searchCoins = (coins: ICoin[], searchTerm: string): ICoin[] => {
  return coins.filter(
    (coin) => coin.coinName.includes(searchTerm) || coin.id.includes(searchTerm)
  );
};

export const sortCoinsByName = (coins: ICoin[]) => {
  return coins.sort((a, b) => a.coinName.localeCompare(b.coinName));
};
