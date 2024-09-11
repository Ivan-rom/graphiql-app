import { useDispatch, useSelector } from 'react-redux';
import { setBody } from '@/store/features/requestSlice';
import CodeEditor from '../CodeEditor/CodeEditor';
import { editorExtensions, schemaExtensions } from './editorExtensions';
import styles from './graphqlBody.module.css';
import { selectBody } from '@/store/features/selectors';
import { useEffect, useState } from 'react';
import GraphqlVariables from '../JSONEditor/JSONEditor';
import SdlUrl from '../SdlUrl/SdlUrl';
import { useTranslations } from 'next-intl';
import { GraphQLSchema, printSchema } from 'graphql';
import { graphql } from 'cm6-graphql';
import { compactGraphQLQuery, formatGraphQLQuery } from '@/helpers/methods';

function GraphqlBody() {
  const t = useTranslations('Client');
  const dispatch = useDispatch();
  const body = useSelector(selectBody);
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [isSchemaVisible, setIsSchemaVisible] = useState(false);
  const [extensions, setExtensions] = useState(editorExtensions);

  useEffect(() => {
    if (body) {
      try {
        const { query: defaultQuery, variables: defaultVariables } = JSON.parse(body);

        setQuery(defaultQuery);

        if (typeof defaultVariables === 'string') {
          setVariables(defaultVariables);
        } else {
          setVariables(JSON.stringify(defaultVariables));
        }
      } catch {
        setQuery('');
        setVariables('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newBody = { query, variables: '' };

    try {
      const parsedVariables = JSON.parse(variables);
      newBody.variables = parsedVariables;
    } catch {
      newBody.variables = variables;
    }

    dispatch(setBody(JSON.stringify(newBody)));
  }, [query, variables, dispatch]);

  useEffect(() => {
    if (schema) setExtensions([editorExtensions, graphql(schema)]);
    else setExtensions([editorExtensions, graphql()]);
  }, [schema]);

  const queryBlurHandler = (value: string) => {
    setQuery(compactGraphQLQuery(value.trim()));
  };

  return (
    <>
      <SdlUrl
        updateSchema={setSchema}
        schema={schema}
        setIsSchemaVisible={setIsSchemaVisible}
        isSchemaVisible={isSchemaVisible}
      />

      <div className={styles.wrapper}>
        {schema && isSchemaVisible && (
          <div className={styles.schemaWrapper}>
            <CodeEditor className={styles.schema} extensions={schemaExtensions} value={printSchema(schema)} />
          </div>
        )}

        <div className={styles.body}>
          <p>{t('query-title')}</p>

          <div className={styles.editorWrapper}>
            <CodeEditor
              className={styles.editor}
              extensions={extensions}
              value={formatGraphQLQuery(query)}
              blurHandler={queryBlurHandler}
            />
          </div>

          <div className={styles.variables}>
            <GraphqlVariables variables={variables} setVariables={setVariables} title={t('variables-title')} />
          </div>
        </div>
      </div>
    </>
  );
}

export default GraphqlBody;
