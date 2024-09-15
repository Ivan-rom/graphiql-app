import { buildClientSchema, getIntrospectionQuery } from 'graphql';

export const fetchSchema = async (url: string) => {
  let response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
  } catch {
    throw 'fetch-error';
  }

  try {
    const introspection = await response.json();

    if (introspection.errors) {
      return null;
    }

    const clientSchema = buildClientSchema(introspection.data);

    return clientSchema;
  } catch {
    throw 'parse-error';
  }
};
