import { MenuItem } from './menuItem';
import { NavItem } from './navItem';

import styles from './nav.module.scss';

export interface NavProps {
  navItems: MenuItem[];
}

export const Nav = (props: NavProps): JSX.Element => {
  const { navItems } = props;
  const topItems = navItems.filter((navItem) => !navItem.isSeparated);
  const bottomItems = navItems.filter((navItem) => navItem.isSeparated);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navItemsContainer}>
        {topItems.map((navItem) => (
          <NavItem key={navItem.id} {...navItem} />
        ))}

        <hr className={styles.hr} />

        {bottomItems.map((navItem) => (
          <NavItem key={navItem.id} {...navItem} />
        ))}
      </ul>
    </nav>
  );
};
