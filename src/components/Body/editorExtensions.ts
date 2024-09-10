import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { linter } from '@codemirror/lint';

const theme = HighlightStyle.define([
  { tag: tags.string, color: 'var(--editor-string-color)' },
  { tag: tags.number, color: 'var(--editor-number-color)' },
  { tag: tags.null, color: 'var(--editor-null-color)' },
  { tag: tags.bool, color: 'var(--editor-boolean-color)' },
  { tag: tags.propertyName, color: 'var(--accent-color)' },
]);

const syntaxLinter = linter(jsonParseLinter());

export const extensions: Extension = [json(), syntaxLinter, syntaxHighlighting(theme), EditorView.lineWrapping];
