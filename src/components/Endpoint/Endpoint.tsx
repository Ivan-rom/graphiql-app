import { useDispatch, useSelector } from 'react-redux';
import { MethodSelector } from '../MethodSelector/MethodSelector';
import styles from './endpoint.module.css';
import { RootState } from '@/store/store';
import { setURL } from '@/store/features/requestSlice';
import { useTranslations } from 'next-intl';
import { RequestData } from '@/helpers/types';

type Props = {
  sendHandler: (request: RequestData) => void;
};

function Endpoint({ sendHandler }: Props) {
  const t = useTranslations('RestfulClient');
  const dispatch = useDispatch();
  const request = useSelector((state) => (state as RootState).request);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setURL(event.target.value.trim()));
  };

  const clickHandler = () => {
    sendHandler(request);
  };

  return (
    <div className={styles.send_container}>
      <div className={styles.methods_container}>
        <MethodSelector />
        <input
          className={styles.url_input}
          value={request.url}
          onChange={changeHandler}
          type="text"
          placeholder={t('url-placeholder')}
        />
      </div>
      <button className={styles.send_button} onClick={clickHandler} disabled={!request.url}>
        {t('send')}
      </button>
    </div>
  );
}

export default Endpoint;
