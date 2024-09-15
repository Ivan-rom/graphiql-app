import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { linter, Diagnostic } from '@codemirror/lint';
import { GraphQLError, parse, SourceLocation } from 'graphql';
import { graphql } from 'cm6-graphql';

interface GraphQLSyntaxError extends GraphQLError {
  locations: SourceLocation[];
}

function graphqlLinter(view: EditorView): Diagnostic[] {
  const doc = view.state.doc.toString();
  try {
    parse(doc);
  } catch (error) {
    const gqlError = error as GraphQLSyntaxError;

    const message = gqlError.message;
    const location = gqlError.locations?.[0];
    if (!location) return [];

    const from = location.column - 1;
    const to = from + 1;
    return [
      {
        from,
        to,
        severity: 'error',
        message,
      },
    ];
  }
  return [];
}

export const editorExtensions: Extension = [linter(graphqlLinter), EditorView.lineWrapping];
export const schemaExtensions: Extension = [graphql(), EditorView.lineWrapping, EditorState.readOnly.of(true)];
