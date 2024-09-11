'use client';
import { Routes } from '@/helpers/enums';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Link } from '@/helpers/navigation';
import HistoryLink from '@/components/HistoryLink/HistoryLink';
import { RequestData } from '@/helpers/types';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import sharedStyles from '@/styles/shared.module.css';

export default function History() {
  const [history, setHistory] = useState<RequestData[] | null>(null);
  const t = useTranslations('History');

  useEffect(() => {
    const localStorageInfo = localStorage.getItem('history');
    if (localStorageInfo !== null) {
      const storedHistory = JSON.parse(localStorageInfo);
      setHistory(storedHistory);
    } else {
      setHistory(localStorageInfo);
    }
  }, []);

  return (
    <div className={styles.history_container}>
      <h1>{t('history-header')}</h1>
      {history ? (
        <div className={styles.client_links_container}>
          {history.map(({ url, body, method, headers }: RequestData, index) => (
            <HistoryLink key={index} url={url} body={body} method={method} headers={headers} />
          ))}
        </div>
      ) : (
        <div className={styles.empty_history}>
          <p>{t('empty-msg')}</p>
          <div className={styles.client_empty_links_container}>
            <Link className={classNames(sharedStyles.button, styles.empty_link)} href={Routes.restApi}>
              REST {t('client')}
            </Link>
            <Link className={classNames(sharedStyles.button, styles.empty_link)} href={Routes.graphiQL}>
              GraphiQL {t('client')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
