import { MenuItem } from '../../nav/menuItem';

const navItems: MenuItem[] = [
  {
    id: 1,
    title: 'Crypto',
    url: '/',
    iconUrl: './crypto.svg',
    alt: 'Crypto Icon',
    isSeparated: false,
    active: true,
  },
  {
    id: 2,
    title: 'Rewards',
    url: '/',
    iconUrl: './rewards.svg',
    alt: 'Rewards Icon',
    isSeparated: false,
  },
  {
    id: 3,
    title: 'Cards',
    url: '/',
    iconUrl: './credit-card.svg',
    alt: 'Credit Cards Icon',
    isSeparated: false,
  },
  {
    id: 4,
    title: 'Add Exchange',
    url: '/',
    iconUrl: './wallet-add.svg',
    alt: 'Add to wallet Icon',
    isSeparated: true,
  },
];

export default navItems;
