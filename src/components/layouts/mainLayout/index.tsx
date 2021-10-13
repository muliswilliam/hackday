import { useTransition, animated, config } from 'react-spring';
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

import layoutStyles from './mainLayout.module.scss';

const REFRESH_TIME_MS = 5000;
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
      () =>
        dispatch(
          fetchCoinsPricesAsync({ coinIds, currencies, refreshing: true })
        ),
      REFRESH_TIME_MS
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

  const transitions = useTransition(status === 'idle', {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  });

  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.leftSidebar}>
        <Nav navItems={navItems} />
      </div>
      <div className={layoutStyles.content}>
        <SearchInput
          placeholder="Search Coins"
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
        {status === 'loading' && (
          <div className={layoutStyles.loader}>Loading...</div>
        )}

        {status === 'searching' && (
          <div className={layoutStyles.loader}>Searching...</div>
        )}

        {transitions(
          (styles, show) =>
            show && (
              <animated.div style={styles}>
                <CoinsList coins={searchTerm ? coinsSearchResults : coins} />
              </animated.div>
            )
        )}

        {status === 'failed' && error && (
          <div className={layoutStyles.errorMessage}>{error}</div>
        )}

        <div className={layoutStyles.addAssetCointainer}>
          <Button
            onClick={() => handleAddAssetClick()}
            disabled={status === 'loading'}
          >
            <AddIcon /> &nbsp;Add Asset
          </Button>
        </div>
      </div>
      <div className={layoutStyles.rightSidebar}></div>
    </div>
  );
};
