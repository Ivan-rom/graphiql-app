import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef, useState } from 'react';
import './codeEditor.css';
import classNames from 'classnames';

type Props = {
  extensions: Extension;
  value: string;
  className?: string;
  blurHandler?: (value: string) => void;
};

function CodeEditor({ extensions, value, className, blurHandler }: Props) {
  const editor = useRef<HTMLDivElement | null>(null);
  const [currentValue, setCurrentValue] = useState(value);

  const onBlurHandler = () => {
    if (blurHandler) {
      blurHandler(currentValue);
    }
  };

  useEffect(() => {
    if (editor.current) {
      const eventListeners = EditorView.updateListener.of(({ state }) => {
        if (blurHandler) setCurrentValue(state.doc.toString());
      });

      const state = EditorState.create({
        doc: value,
        extensions: [extensions, eventListeners],
      });

      const view = new EditorView({ state, parent: editor.current });

      return () => {
        view.destroy();
      };
    }
  }, [value, extensions, editor, blurHandler]);

  return <div className={classNames('editor', className)} ref={editor} onBlur={onBlurHandler} />;
}

export default CodeEditor;
