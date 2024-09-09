import { useDispatch, useSelector } from 'react-redux';
import { MethodSelector } from '../MethodSelector/MethodSelector';
import { setURL } from '@/store/features/requestSlice';
import { useTranslations } from 'next-intl';
import { RequestData } from '@/helpers/types';
import styles from './endpoint.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';
import { selectRequest } from '@/store/features/selectors';

type Props = {
  sendHandler: (request: RequestData) => void;
};

function Endpoint({ sendHandler }: Props) {
  const t = useTranslations('Client');
  const dispatch = useDispatch();
  const request = useSelector(selectRequest);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setURL(event.target.value.trim()));
  };

  const clickHandler = () => {
    sendHandler(request);
  };

  return (
    <div className={styles.endpoint}>
      <div className={styles.container}>
        <MethodSelector />
        <input
          className={styles.input}
          value={request.url}
          onChange={changeHandler}
          type="text"
          placeholder={t('url-placeholder')}
        />
      </div>
      <button className={classNames(sharedStyles.button, styles.button)} onClick={clickHandler} disabled={!request.url}>
        {t('send')}
      </button>
    </div>
  );
}

export default Endpoint;
