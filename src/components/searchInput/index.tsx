import cx from 'classnames';

import styles from './searchInput.module.scss';

export interface SearchInputProps
  extends React.ComponentPropsWithoutRef<'input'> {}

export const SearchInput = (props: SearchInputProps): JSX.Element => {
  const { className, ...rest } = props;
  const classNames = cx(styles.input, className);

  return <input className={classNames} {...rest} />;
};
