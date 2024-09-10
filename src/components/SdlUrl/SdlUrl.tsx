import { useSelector } from 'react-redux';
import { selectURL } from '@/store/features/selectors';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './sdlUrl.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';

const SDL_POSTFIX = '?sdl';

function SdlUrl() {
  const t = useTranslations('Client');
  const endpoint = useSelector(selectURL);
  const [sdlEndpoint, setSdlEndpoint] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!isChanged) setSdlEndpoint(`${endpoint}${SDL_POSTFIX}`);
  }, [endpoint, isChanged]);

  useEffect(() => {
    // set empty input on first render
    if (!endpoint) setSdlEndpoint('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true);
    setSdlEndpoint(value.trim());
  };

  const clickHandler = () => {};

  return (
    <div className={styles.sdl}>
      <div className={styles.container}>
        <input
          className={classNames(sharedStyles.input, styles.input)}
          value={sdlEndpoint}
          onChange={changeHandler}
          type="text"
          placeholder={t('sdl-placeholder')}
        />
      </div>
      <button
        className={classNames(sharedStyles.button, styles.button)}
        onClick={clickHandler}
        disabled={sdlEndpoint === SDL_POSTFIX || !sdlEndpoint}
      >
        {t('sdl-button')}
      </button>
    </div>
  );
}

export default SdlUrl;
