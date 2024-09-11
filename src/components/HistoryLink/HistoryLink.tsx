import { formatURL } from '@/helpers/methods';
import { Link } from '@/helpers/navigation';
import { RequestData } from '@/helpers/types';
import styles from './HistoryLink.module.css';

export default function HistoryLink({ url, body, method, headers }: RequestData) {
  return (
    <Link href={`client/${formatURL({ url, body, method, headers })}`} className={styles.historyLink}>
      <p className={styles.historyLinkMethod}>{method}</p>
      <p className={styles.historyLinkURL}>{url}</p>
    </Link>
  );
}
