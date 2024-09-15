import { locales } from '@/helpers/constants';
import { permanentRedirect } from 'next/navigation';

function NotFoundPage() {
  permanentRedirect(`/${locales[0]}`);
}

export default NotFoundPage;
