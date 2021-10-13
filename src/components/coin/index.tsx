import { formatToCurrency } from '../../utils/currencyFormatter';
import { ICoin } from './icoin';

import styles from './coin.module.scss';

export interface CoinProps extends ICoin {}

export const Coin = ({
  coinIconUrl,
  coinName,
  coinPriceUsd,
  coinPriceBtc,
}: CoinProps): JSX.Element => {
  return (
    <div className={styles.coinPrice}>
      <div className={styles.coinDetails}>
        {coinIconUrl && (
          <img
            className={styles.coinIcon}
            src={coinIconUrl}
            alt={`${coinName} Icon`}
          />
        )}
        <span className={styles.coinName}>{coinName}</span>
      </div>
      <div className={styles.coinPrices}>
        <span className={styles.coinPriceUsd}>
          {formatToCurrency(coinPriceUsd)}
        </span>
        <span className={styles.coinPriceBtc}>
          {coinPriceBtc && `${coinPriceBtc} BTC`}
        </span>
      </div>
    </div>
  );
};
