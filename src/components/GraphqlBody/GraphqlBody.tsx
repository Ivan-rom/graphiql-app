import { useDispatch, useSelector } from 'react-redux';
import { setBody } from '@/store/features/requestSlice';
import CodeEditor from '../CodeEditor/CodeEditor';
import { extensions } from './editorExtensions';
import styles from './graphqlBody.module.css';
import { selectBody } from '@/store/features/selectors';
import { useEffect, useState } from 'react';
import GraphqlVariables from '../JSONEditor/JSONEditor';
import SdlUrl from '../SdlUrl/SdlUrl';
import { useTranslations } from 'next-intl';

function formatGraphQLQuery(query: string): string {
  let indentLevel = 0;
  const indentString = '  '; // Используем два пробела для отступов
  let formattedQuery = '';

  for (let i = 0; i < query.length; i++) {
    const char = query[i];

    switch (char) {
      case '{':
        // Если открывающая фигурная скобка, то добавляем её и увеличиваем уровень отступов
        formattedQuery += ' {\n' + indentString.repeat(++indentLevel);
        break;

      case '}':
        // Если закрывающая фигурная скобка, то уменьшаем уровень отступов и добавляем её на новой строке
        formattedQuery += '\n' + indentString.repeat(--indentLevel) + '}';
        break;

      case ',':
        // Если запятая, то добавляем её и переходим на новую строку с текущим отступом
        formattedQuery += ',\n' + indentString.repeat(indentLevel);
        break;

      default:
        // В остальных случаях просто добавляем символ
        formattedQuery += char;

        // Если символ - пробел, но после него идет "}", убираем лишний пробел перед закрывающей скобкой
        if (char === ' ' && query[i + 1] === '}') {
          formattedQuery = formattedQuery.slice(0, -1);
        }
        break;
    }
  }

  return formattedQuery;
}

function compactGraphQLQuery(query: string): string {
  // Удаляем все переносы строк, лишние пробелы и форматируем запрос в одну строку
  return query
    .replace(/\s+/g, ' ') // Заменяем все виды пробельных символов (переносы строк, табуляции, пробелы) на один пробел
    .replace(/\s*{\s*/g, '{') // Убираем пробелы перед и после открывающей скобки
    .replace(/\s*}\s*/g, '}') // Убираем пробелы перед и после закрывающей скобки
    .replace(/\s*,\s*/g, ',') // Убираем пробелы перед и после запятой
    .trim(); // Убираем возможные пробелы в начале и конце строки
}

function GraphqlBody() {
  const t = useTranslations('Client');
  const dispatch = useDispatch();
  const body = useSelector(selectBody);
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');

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
    const newBody = { query, variables: '{}' };

    try {
      const parsedVariables = JSON.parse(variables);
      newBody.variables = parsedVariables;
    } catch {
      newBody.variables = variables;
    }

    dispatch(setBody(JSON.stringify(newBody)));
  }, [query, variables, dispatch]);

  const queryBlurHandler = (value: string) => {
    setQuery(compactGraphQLQuery(value.trim()));
  };

  return (
    <>
      <SdlUrl />
      <div className={styles.body}>
        <div className={styles.header}>
          <p>{t('query-title')}</p>
        </div>

        <div className={styles.editorWrapper}>
          <CodeEditor
            className={styles.editor}
            extensions={extensions}
            value={formatGraphQLQuery(query)}
            blurHandler={queryBlurHandler}
          />
        </div>

        <GraphqlVariables variables={variables} setVariables={setVariables} title={t('variables-title')} />
      </div>
    </>
  );
}

export default GraphqlBody;
