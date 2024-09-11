import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { linter, Diagnostic } from '@codemirror/lint';
import { GraphQLError, parse, SourceLocation } from 'graphql';

interface GraphQLSyntaxError extends GraphQLError {
  locations: SourceLocation[];
}

function graphqlLinter(view: EditorView): Diagnostic[] {
  const doc = view.state.doc.toString();
  try {
    parse(doc); // Пытаемся распарсить документ GraphQL
  } catch (error) {
    const gqlError = error as GraphQLSyntaxError; // Явно указываем тип ошибки GraphQL

    // Если возникает ошибка, возвращаем синтаксическое сообщение об ошибке
    const message = gqlError.message;
    const location = gqlError.locations?.[0]; // Проверяем, есть ли информация о локации
    if (!location) return [];

    const from = location.column - 1;
    const to = from + 1; // Выделяем одну колонку, где произошла ошибка
    return [
      {
        from,
        to,
        severity: 'error',
        message,
      },
    ];
  }
  return []; // Если нет ошибок, ничего не возвращаем
}

export const extensions: Extension = [linter(graphqlLinter), EditorView.lineWrapping];
