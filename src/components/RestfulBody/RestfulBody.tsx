import { useTranslations } from 'next-intl';
import JSONEditor from '../JSONEditor/JSONEditor';
import { useDispatch, useSelector } from 'react-redux';
import { selectBody } from '@/store/features/selectors';
import { setBody } from '@/store/features/requestSlice';

function RestfulBody() {
  const t = useTranslations('Client');
  const dispatch = useDispatch();
  const body = useSelector(selectBody);

  const updateBody = (value: string) => {
    dispatch(setBody(value));
  };

  return <JSONEditor title={t('body-title')} variables={body} setVariables={updateBody} />;
}

export default RestfulBody;
