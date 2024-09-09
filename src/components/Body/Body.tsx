import { useTranslations } from 'next-intl';
import styles from './body.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
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
    <div className={styles.body_container}>
      <label htmlFor="input_body">{t(variableBodyVisible ? 'body-variables' : 'body-text')}</label>
      <div className={styles.body_container_title}>
        <button className={styles.header_button} onClick={() => setVariableBodyVisible((visible) => !visible)}>
          {t(variableBodyVisible ? 'hide-variables' : 'show-variables')}
        </button>
        <button
          className={`${styles.header_button} ${variableBodyVisible ? '' : `${styles.hidden}`}`}
          onClick={() => setBodyVariable(addVariablesHandler(bodyVariable))}
        >
          {t('add-variable')}
        </button>
      </div>
      <CodeEditor
        className={`${styles.input_body} ${variableBodyVisible ? `${styles.hidden}` : ''}`}
        extensions={extensions}
        value={prettifyingBody(body)}
        blurHandler={bodyOnBlurHandler}
      />
      <div className={`body_variable_container ${!variableBodyVisible ? `${styles.hidden}` : ''}`}>
        <div className={styles.headers_input}>
          {bodyVariable.map((value, index) => {
            return (
              <VariableComponent
                key={index}
                variable={value}
                index={index}
                callback={handleChangeBodyVariables}
                removeCallback={removeBodyVariable}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
