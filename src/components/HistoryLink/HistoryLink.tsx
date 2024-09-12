import { formatURL } from '@/helpers/methods';
import { Link } from '@/helpers/navigation';
import { RequestData } from '@/helpers/types';
import styles from './HistoryLink.module.css';

type Props = {
  request: RequestData;
};

export default function HistoryLink({ request }: Props) {
  return (
    <Link href={`client/${formatURL(request)}`} className={styles.historyLink}>
      <p className={styles.method}>{request.method}</p>
      <p className={styles.url}>{request.url}</p>
    </Link>
  );
}
