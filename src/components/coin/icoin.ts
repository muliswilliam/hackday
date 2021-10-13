export interface ICoin {
  id: string;
  coinIconUrl: string | null;
  coinName: string;
  coinSymbol: string;
  coinPriceUsd: number;
  coinPriceBtc: number;
}
