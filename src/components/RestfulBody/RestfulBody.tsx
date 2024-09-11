import { useTranslations } from 'next-intl';
import JSONEditor from '../JSONEditor/JSONEditor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBody } from '@/store/features/selectors';
import { setBody } from '@/store/features/requestSlice';

function RestfulBody() {
  const t = useTranslations('Client');
  const dispatch = useDispatch();
  const body = useSelector(selectBody);

  const [currentBody, setCurrentBody] = useState(body);

  useEffect(() => {
    dispatch(setBody(currentBody));
  }, [currentBody, dispatch]);

  return <JSONEditor title={t('body-title')} variables={currentBody} setVariables={setCurrentBody} />;
}

export default RestfulBody;
