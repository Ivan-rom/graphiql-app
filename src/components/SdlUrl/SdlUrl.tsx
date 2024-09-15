import { useSelector } from 'react-redux';
import { selectURL } from '@/store/features/selectors';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './sdlUrl.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';
import { GraphQLSchema } from 'graphql';
import Schema from '../../assets/svg/schema.svg';
import { fetchSchema } from '@/services/schema';
import { toast } from 'react-toastify';
import LoadingButton from '../LoadingButton/LoadingButton';

const SDL_POSTFIX = '?sdl';

type Props = {
  updateSchema: (schema: GraphQLSchema | null) => void;
  schema: GraphQLSchema | null;
  setIsSchemaVisible: (status: boolean) => void;
  isSchemaVisible: boolean;
};

function SdlUrl({ updateSchema, schema, setIsSchemaVisible, isSchemaVisible }: Props) {
  const t = useTranslations('Client');
  const tErrors = useTranslations('SdlErrors');
  const endpoint = useSelector(selectURL);
  const [sdlEndpoint, setSdlEndpoint] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const clickHandler = () => {
    setIsLoading(true);
    fetchSchema(sdlEndpoint)
      .then((result) => {
        updateSchema(result);
        setIsSchemaVisible(Boolean(result));
      })
      .catch((error: string) => {
        toast.error(tErrors(error));
      })
      .finally(() => setIsLoading(false));
  };

  const schemaToggler = () => {
    setIsSchemaVisible(!isSchemaVisible);
  };

  return (
    <div className={styles.sdl}>
      <button
        className={classNames(sharedStyles.button, styles.schemaButton)}
        onClick={schemaToggler}
        disabled={!schema}
      >
        <Schema className={styles.svg} />
      </button>
      <div className={styles.container}>
        <input
          className={classNames(sharedStyles.input, styles.input)}
          value={sdlEndpoint}
          onChange={changeHandler}
          type="text"
          placeholder={t('sdl-placeholder')}
        />
      </div>
      <LoadingButton
        onClick={clickHandler}
        isLoading={isLoading}
        className={styles.button}
        disabled={sdlEndpoint === SDL_POSTFIX || !sdlEndpoint}
      >
        {t('sdl-button')}
      </LoadingButton>
    </div>
  );
}

export default SdlUrl;
