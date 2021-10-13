import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app/store';
import { ICoin } from '@components/coin/icoin';
import {
  getCoinIcon,
  searchCoins as searchCoinFn,
  sortCoinsByName,
} from '@utils/coinsUtils';
import { fetchCoinsPrices } from '@features/coins/coinsApi';

export interface CoinsState {
  coinsPrices: ICoin[];
  status: 'idle' | 'loading' | 'searching' | 'failed';
  error?: string;
  searchTerm: string;
  searchResults: ICoin[];
}

const initialState: CoinsState = {
  coinsPrices: [],
  status: 'idle',
  error: undefined,
  searchTerm: '',
  searchResults: [],
};

export const fetchCoinsPricesAsync = createAsyncThunk<
  ICoin[],
  {
    coinIds: string[];
    currencies: string[];
  },
  {
    rejectValue: Error;
  }
>('coins/fetchCoinsPrices', async ({ coinIds, currencies }, thunkApi) => {
  try {
    const prices: any = await fetchCoinsPrices(coinIds, currencies);
    const coins: ICoin[] = Object.keys(prices).map((key) => {
      const coinIcon = getCoinIcon(key);
      const _coin = prices[key];

      const coin: ICoin = {
        id: key,
        coinIconUrl: coinIcon !== undefined ? coinIcon.icon : null,
        coinName: coinIcon !== undefined ? coinIcon.name : '',
        coinPriceUsd: _coin.usd,
        coinPriceBtc: key === 'bitcoin' ? '' : _coin.btc, // Omit btc price in bitcoins, it will always be 1
      };

      return coin;
    });

    // The value we return becomes the `fulfilled` action payload
    return sortCoinsByName(coins);
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as Error);
  }
});

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    searchCoins: (state, action: PayloadAction<string>) => {
      state.status = 'searching';
      state.searchTerm = action.payload;
      const searchResults = searchCoinFn(state.coinsPrices, action.payload);
      state.status = 'idle';
      state.searchResults = sortCoinsByName(searchResults);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsPricesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoinsPricesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // Set search results if searchTerm is available
        if (state.searchTerm) {
          const searchResults = searchCoinFn(action.payload, state.searchTerm);
          state.searchResults = sortCoinsByName(searchResults);
        }
        state.coinsPrices = action.payload;
      })
      .addCase(fetchCoinsPricesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      });
  },
});

export const { searchCoins } = coinsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.coins)`
export const selectCoinsPrices = (state: RootState) => state.coins.coinsPrices;
export const selectCoinsPricesStatus = (state: RootState) => state.coins.status;
export const selectCoinsPricesError = (state: RootState) => state.coins.error;
export const selectSearchResults = (state: RootState) =>
  state.coins.searchResults;

export default coinsSlice.reducer;