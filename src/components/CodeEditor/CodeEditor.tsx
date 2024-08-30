import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import '@/styles/editor.css';

type Props = {
  extensions: Extension;
  value: string;
};

function CodeEditor({ extensions, value }: Props) {
  const editor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editor.current) {
      const state = EditorState.create({
        doc: value,
        extensions,
      });

      const view = new EditorView({ state, parent: editor.current });

      return () => {
        view.destroy();
      };
    }
  }, [value, extensions, editor]);

  return <div className="editor" ref={editor} />;
}

export default CodeEditor;
