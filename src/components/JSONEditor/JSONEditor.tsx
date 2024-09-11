import { useTranslations } from 'next-intl';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IVariable } from '@/helpers/types';
import { DEFAULT_VARIABLE } from '@/helpers/constants';
import {
  addVariablesHandler,
  handleChangeVariables,
  prettifyingBody,
  removeItemFromArray,
  variableObject,
} from '@/helpers/methods';
import { VariableComponent } from '../VariableComponent/Variable';
import CodeEditor from '../CodeEditor/CodeEditor';
import { extensions } from './editorExtensions';
import styles from './JSONEditor.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';

enum BodyType {
  variables = 'variables',
  JSON = 'JSON',
}

type Props = {
  title: string;
  variables: string;
  setVariables: Dispatch<SetStateAction<string>>;
};

function JSONEditor({ title, variables, setVariables }: Props) {
  const t = useTranslations('Client');

  const [bodyVariable, setBodyVariable] = useState<IVariable[]>([]);
  const [variableBodyVisible, setVariableBodyVisible] = useState(false);

  useEffect(() => {
    try {
      const obj = JSON.parse(variables);

      const result = Object.keys(obj).map((key, index) => {
        const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
        return { key, value, id: index };
      });

      setBodyVariable(result);
    } catch {
      setBodyVariable([{ ...DEFAULT_VARIABLE }]);
    }
  }, [variables]);

  const bodyToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setVariableBodyVisible(event.target.value === BodyType.variables);
  };

  const setBodyHandler = (value: string) => {
    setVariables(value.trim());
  };

  const handleChangeBodyVariables = (value: string, name: string, index: number) => {
    updateBodyVariableState(handleChangeVariables(value, name, index, bodyVariable));
  };

  const removeBodyVariable = (index: number) => {
    updateBodyVariableState(removeItemFromArray(bodyVariable, index));
  };

  const updateBodyVariableState = (variables: IVariable[]) => {
    setBodyVariable(variables);
    setBodyHandler(JSON.stringify(variableObject(variables, {})));
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>{title}</p>
        <label className={styles.toggler}>
          <input
            type="radio"
            name="body_type"
            value={BodyType.JSON}
            checked={!variableBodyVisible}
            onChange={bodyToggle}
          />
          <div className={styles.radio} />
          <span>JSON</span>
        </label>
        <label className={styles.toggler}>
          <input
            type="radio"
            name="body_type"
            value={BodyType.variables}
            checked={variableBodyVisible}
            onChange={bodyToggle}
          />
          <div className={styles.radio} />
          <span>{t('variables-type')}</span>
        </label>
      </div>
      {variableBodyVisible ? (
        <div className={styles.variablesWrapper}>
          <div className={styles.variables}>
            {bodyVariable.map((value, index) => (
              <VariableComponent
                key={value.id}
                variable={value}
                index={index}
                callback={handleChangeBodyVariables}
                removeCallback={removeBodyVariable}
              />
            ))}
          </div>
          <button
            className={classNames(sharedStyles.button, styles.button)}
            onClick={() => setBodyVariable(addVariablesHandler(bodyVariable))}
          >
            +
          </button>
        </div>
      ) : (
        <div className={styles.editorWrapper}>
          <CodeEditor
            className={styles.editor}
            extensions={extensions}
            value={prettifyingBody(variables)}
            blurHandler={setBodyHandler}
          />
        </div>
      )}
    </div>
  );
}

export default JSONEditor;
