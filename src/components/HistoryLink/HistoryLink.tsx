import { Link } from '@/helpers/navigation';
import styles from './HistoryLink.module.css';
import { Routes } from '@/helpers/enums';

type Props = {
  request: {
    method: string;
    url: string;
    href: string;
  };
};

export default function HistoryLink({ request }: Props) {
  return (
    <Link href={`${Routes.client}${request.href}`} className={styles.historyLink}>
      <p className={styles.method}>{request.method}</p>
      <p className={styles.url}>{request.url}</p>
    </Link>
  );
}
