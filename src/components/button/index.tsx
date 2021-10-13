import cx from 'classnames';

const styles = require('./button.module.scss');

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large';
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { size = 'medium', className, ...rest } = props;
  const classNames = cx(styles.button, className, {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
  });

  return <button className={classNames} {...rest} />;
};
