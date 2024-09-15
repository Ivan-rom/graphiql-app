import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

export const extensions: Extension = [json(), EditorView.lineWrapping, EditorState.readOnly.of(true)];
