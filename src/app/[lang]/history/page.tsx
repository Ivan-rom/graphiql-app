'use client';
import { Routes } from '@/helpers/enums';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { Link } from '@/helpers/navigation';
import HistoryLink from '@/components/HistoryLink/HistoryLink';
import { HistoryElement } from '@/helpers/types';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

export default function History() {
  const [history, setHistory] = useState<HistoryElement[] | null>(null);
  const t = useTranslations('History');

  useEffect(() => {
    const localStorageInfo = localStorage.getItem('history');
    if (localStorageInfo !== null) {
      const storedHistory = JSON.parse(localStorageInfo);
      setHistory(storedHistory);
    }
  }, []);

  return (
    <div className={styles.history}>
      <h1>{t('history-header')}</h1>
      {history ? (
        <div className={styles.client_links}>
          {history.map((request: HistoryElement, index) => (
            <HistoryLink key={index} request={request} />
          ))}
        </div>
      ) : (
        <div className={styles.empty_history}>
          <p>{t('empty-msg')}</p>
          <div className={styles.client_empty_links}>
            <Link className={classNames(sharedStyles.link)} href={Routes.restApi}>
              REST {t('client')}
            </Link>
            <Link className={classNames(sharedStyles.link)} href={Routes.graphiQL}>
              GraphiQL {t('client')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
