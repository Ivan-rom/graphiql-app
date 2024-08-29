import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';

type Props = {
  extensions: Extension;
  value: string;
};

function CodeEditor({ extensions, value }: Props) {
  const editor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: value,
      extensions: extensions,
    });

    const view = new EditorView({ state, parent: editor.current! });

    return () => {
      view.destroy();
    };
  }, [value, extensions]);

  return <div className="editor" ref={editor}></div>;
}

export default CodeEditor;
