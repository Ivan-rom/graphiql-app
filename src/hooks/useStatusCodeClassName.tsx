import { useEffect, useState } from 'react';

export function useStatusCodeClassName(code: number) {
  const [statusClassName, setStatusClassName] = useState('');

  useEffect(() => {
    if (code >= 500) {
      return setStatusClassName('serverError');
    }

    if (code >= 400) {
      return setStatusClassName('clientError');
    }

    if (code >= 300) {
      return setStatusClassName('redirect');
    }

    if (code >= 200) {
      return setStatusClassName('success');
    }

    return setStatusClassName('info');
  }, [code]);

  return statusClassName;
}
