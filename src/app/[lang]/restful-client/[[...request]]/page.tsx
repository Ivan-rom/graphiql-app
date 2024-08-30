'use client';

import Response from '@/components/Response/Response';
import styles from './page.module.css';
import { useRouter } from '@/helpers/navigation';
import { Routes } from '@/helpers/enums';
import sharedStyles from '@/styles/shared.module.css';

export default function RestfulClientPage() {
  // THIS CODE IS TEMPORARY FOR CHECKING <Response> BEHAVIOR
  const router = useRouter();
  // curl https://jsonplaceholder.typicode.com/posts/1
  const GET_URL = `${Routes.restApi}/GET/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE=`;
  // curl -d '{"title":"fakeTitle","userId":1,"body":"fakeMessage"}' https://jsonplaceholder.typicode.com/posts
  const POST_URL = `${Routes.restApi}/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=?Content-Type=application%2Fjson`;
  // '{"query": "query ExampleQuery {characters(page: 1) {results {name}}}","variables": {"name": "Rick"}}' https://rickandmortyapi.com/graphql
  const GRAPH_URL = `${Routes.restApi}/GRAPHQL/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2dyYXBocWw=/eyJxdWVyeSI6ICJxdWVyeSBFeGFtcGxlUXVlcnkge2NoYXJhY3RlcnMocGFnZTogMSkge3Jlc3VsdHMge25hbWV9fX0iLCJ2YXJpYWJsZXMiOiB7Im5hbWUiOiAiUmljayJ9fQ==`;

  return (
    <section className={styles.page}>
      {/* THIS CODE IS TEMPORARY FOR CHECKING <Response> BEHAVIOR */}
      <div className={styles.form}>
        <button
          className={sharedStyles.button}
          onClick={() => router.push(GET_URL)}
        >
          GET TEST
        </button>
        <button
          className={sharedStyles.button}
          onClick={() => router.push(POST_URL)}
        >
          POST TEST
        </button>
        <button
          className={sharedStyles.button}
          onClick={() => router.push(GRAPH_URL)}
        >
          GRAPHQL TEST
        </button>
      </div>
      <Response />
    </section>
  );
}
