import { basicSetup } from 'codemirror';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const theme = HighlightStyle.define([
  { tag: tags.string, color: 'var(--editor-string-color)' },
  { tag: tags.number, color: 'var(--editor-number-color)' },
  { tag: tags.null, color: 'var(--editor-null-color)' },
  { tag: tags.bool, color: 'var(--editor-boolean-color)' },
  { tag: tags.propertyName, color: 'var(--accent-color)' },
]);

export const extensions: Extension = [basicSetup, json(), syntaxHighlighting(theme), EditorView.lineWrapping];
