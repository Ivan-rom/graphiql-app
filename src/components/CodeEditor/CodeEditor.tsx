import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import '@/styles/editor.css';
import classNames from 'classnames';

type Props = {
  extensions: Extension;
  value: string;
  className?: string;
};

function CodeEditor({ extensions, value, className }: Props) {
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

  return <div className={classNames('editor', className)} ref={editor} />;
}

export default CodeEditor;
