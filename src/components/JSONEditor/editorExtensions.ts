import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';

const syntaxLinter = linter(jsonParseLinter());

export const extensions: Extension = [json(), syntaxLinter, EditorView.lineWrapping];
