import cx from 'classnames';
import { MenuItem } from './menuItem';
import styles from './nav.module.scss';

export interface NavItemProps extends MenuItem {}

export const NavItem = (props: NavItemProps) => {
  const { title, url, iconUrl, alt, active } = props;
  const classNames = cx(styles.navItem, {
    [styles.navItemActive]: active,
  });

  return (
    <li className={classNames}>
      <a href={url}>
        <img src={iconUrl} alt={alt} />
        {title}
      </a>
    </li>
  );
};
