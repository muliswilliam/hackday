import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  fetchCoinsPricesAsync,
  searchCoins,
  selectCoinsPrices,
  selectCoinsPricesError,
  selectCoinsPricesStatus,
  selectSearchResults,
} from '@features/coins/coinsSlice';
import { CoinsList } from '@components/coinsList';
import { Button } from '@components/button';
import AddIcon from '@components/icons/AddIcon';
import { Nav } from '@components/nav';
import { SearchInput } from '@components/searchInput';
import navItems from '@components/layouts/mainLayout/menuItems';
import { getDefaultCoinIds, getDefaultCurrencies } from '@utils/coinsUtils';

import styles from './mainLayout.module.scss';

const coinIds = getDefaultCoinIds();
const currencies = getDefaultCurrencies();

export const MainLayout = (): JSX.Element => {
  const coins = useAppSelector(selectCoinsPrices);
  const coinsSearchResults = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectCoinsPricesStatus);
  const error = useAppSelector(selectCoinsPricesError);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCoinsPricesAsync({ coinIds, currencies }));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(
      () => dispatch(fetchCoinsPricesAsync({ coinIds, currencies })),
      5000
    );

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleAddAssetClick = () => {
    alert('Add Asset button clicked');
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
    dispatch(searchCoins(value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSidebar}>
        <Nav navItems={navItems} />
      </div>
      <div className={styles.content}>
        <SearchInput
          placeholder="Search Coins"
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
        {status === 'loading' && (
          <div className={styles.loader}>Loading...</div>
        )}

        {status === 'searching' && (
          <div className={styles.loader}>Searching...</div>
        )}

        {status === 'idle' && (
          <CoinsList coins={searchTerm ? coinsSearchResults : coins} />
        )}

        {status === 'failed' && error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        <div className={styles.addAssetCointainer}>
          <Button
            onClick={() => handleAddAssetClick()}
            disabled={status === 'loading'}
          >
            <AddIcon /> &nbsp;Add Asset
          </Button>
        </div>
      </div>
      <div className={styles.rightSidebar}></div>
    </div>
  );
};
