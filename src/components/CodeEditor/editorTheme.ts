import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const editorTheme = [
  syntaxHighlighting(
    HighlightStyle.define([
      { tag: tags.keyword, color: 'var(--editor-keyword-color)' },
      { tag: tags.variableName, color: 'var(--editor-variable-name-color)' },
      { tag: tags.propertyName, color: 'var(--accent-color)' },
      { tag: tags.string, color: 'var(--editor-string-color)' },
      { tag: tags.number, color: 'var(--editor-number-color)' },
      { tag: tags.null, color: 'var(--editor-null-color)' },
      { tag: tags.bool, color: 'var(--editor-boolean-color)' },
    ]),
  ),
];
