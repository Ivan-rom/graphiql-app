'use client';

import styles from './response.module.css';
import CodeEditor from '../CodeEditor/CodeEditor';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useStatusCodeClassName } from '@/hooks/useStatusCodeClassName';
import { extensions } from './editorExtensions';
import Loader from '../Loader/Loader';

type Props = {
  value: { status: number; body: string };
  isLoading: boolean;
};

function Response({ value, isLoading }: Props) {
  const t = useTranslations('Client');

  const codeClassName = useStatusCodeClassName(value.status);

  return (
    <div className={styles.response}>
      <h3 className={styles.title}>{t('response.title')}</h3>
      <div className={styles.wrapper}>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <div className={styles.status}>
              <span className={styles.statusText}>{t('response.status')}</span>
              <span className={classNames(styles.code, styles[codeClassName])}>{value.status}</span>
            </div>

            <div className={styles.editorWrapper}>
              <CodeEditor className={styles.viewer} extensions={extensions} value={value.body} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Response;
