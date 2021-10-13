import { Coin } from '../coin';
import { ICoin } from '../coin/icoin';

import styles from './coinsList.module.scss';

export interface CoinsListProps {
  coins: ICoin[];
}

export const CoinsList = ({ coins }: CoinsListProps): JSX.Element => {
  return (
    <div className={styles.coinList}>
      {coins.length === 0 && (
        <div className={styles.emptyState}>No coins found.</div>
      )}
      {coins.map((coin) => (
        <div key={coin.id} className={styles.coinListItem}>
          <Coin key={coin.id} {...coin} />
        </div>
      ))}
    </div>
  );
};
