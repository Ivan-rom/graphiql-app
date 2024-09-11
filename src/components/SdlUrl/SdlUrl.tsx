import { useSelector } from 'react-redux';
import { selectURL } from '@/store/features/selectors';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './sdlUrl.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import Schema from '../../assets/svg/schema.svg';

const SDL_POSTFIX = '?sdl';

const fetchSchema = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    const introspection = await res.json();

    if (introspection.errors) {
      return null;
    }

    const clientSchema = buildClientSchema(introspection.data);

    return clientSchema;
  } catch {
    return null;
  }
};

type Props = {
  updateSchema: (schema: GraphQLSchema | null) => void;
  schema: GraphQLSchema | null;
  setIsSchemaVisible: (status: boolean) => void;
  isSchemaVisible: boolean;
};

function SdlUrl({ updateSchema, schema, setIsSchemaVisible, isSchemaVisible }: Props) {
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

  const clickHandler = async () => {
    const schema = await fetchSchema(sdlEndpoint);
    updateSchema(schema);
    setIsSchemaVisible(Boolean(schema));
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
