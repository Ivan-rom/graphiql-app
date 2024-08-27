'use client';

import Response from '@/components/Response/Response';
import styles from './page.module.css';
import { useRouter } from '@/helpers/navigation';
import { Routes } from '@/helpers/enums';

export default function RestfulClientPage() {
  // THIS CODE IS TEMPORARY FOR CHECKING <Response> BEHAVIOR
  const router = useRouter();
  // curl https://jsonplaceholder.typicode.com/posts/1
  const GET_URL = `${Routes.restApi}/GET/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE=`;
  // curl -d '{"title":"fakeTitle","userId":1,"body":"fakeMessage"}' https://jsonplaceholder.typicode.com/posts
  const POST_URL = `${Routes.restApi}/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=?Content-Type=application%2Fjson`;

  return (
    <section className={styles.page}>
      {/* THIS CODE IS TEMPORARY FOR CHECKING <Response> BEHAVIOR */}
      <div className={styles.form}>
        <button onClick={() => router.push(GET_URL)}>GET TEST</button>
        <button onClick={() => router.push(POST_URL)}>POST TEST</button>
      </div>
      <Response />
    </section>
  );
}
