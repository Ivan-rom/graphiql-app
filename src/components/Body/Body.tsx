import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { IVariable } from '@/helpers/types';
import { DEFAULT_VARIABLE } from '@/helpers/constants';
import {
  addVariablesHandler,
  handleChangeVariables,
  prettifyingBody,
  removeItemFromArray,
  variableObject,
} from '@/helpers/methods';
import { setBody } from '@/store/features/requestSlice';
import { VariableComponent } from '../VariableComponent/Variable';
import CodeEditor from '../CodeEditor/CodeEditor';
import { extensions } from './editorExtensions';
import styles from './body.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';

enum BodyType {
  variables = 'variables',
  JSON = 'JSON',
}

function Body() {
  const t = useTranslations('RestfulClient');
  const dispatch = useDispatch();
  const { body } = useSelector((state) => (state as RootState).request);

  const [bodyVariable, setBodyVariable] = useState<IVariable[]>([]);
  const [variableBodyVisible, setVariableBodyVisible] = useState(false);

  useEffect(() => {
    try {
      const obj = JSON.parse(body);

      const result = Object.keys(obj).map((key, index) => {
        const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
        return { key, value, id: index };
      });

      setBodyVariable(result);
    } catch {
      setBodyVariable([{ ...DEFAULT_VARIABLE }]);
    }
  }, [body]);

  const bodyToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setVariableBodyVisible(event.target.value === BodyType.variables);
  };

  const setBodyHandler = (value: string) => {
    dispatch(setBody(value.trim()));
  };

  const bodyOnBlurHandler = (value: string) => {
    dispatch(setBody(value));
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
        <p>{t('body-title')}</p>
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
          <span>{t('variables-title')}</span>
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
            value={prettifyingBody(body)}
            blurHandler={bodyOnBlurHandler}
          />
        </div>
      )}
    </div>
  );
}

export default Body;
