import classNames from 'classnames';
import styles from './loader.module.css';

type Props = {
  className?: string;
};

function Loader({ className }: Props) {
  return <div className={classNames(styles.loader, className)} />;
}

export default Loader;
