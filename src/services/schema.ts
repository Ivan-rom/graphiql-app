import { buildClientSchema, getIntrospectionQuery } from 'graphql';

export const fetchSchema = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    const introspection = await res.json();

    if (introspection.errors) {
      return null;
    }

    const clientSchema = buildClientSchema(introspection.data);

    return clientSchema;
  } catch {
    return null;
  }
};
