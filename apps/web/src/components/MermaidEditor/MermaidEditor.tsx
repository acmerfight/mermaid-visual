/**
 * MermaidEditor Component
 * Code editor for Mermaid diagram syntax
 */

import { useAtomValue, useSetAtom } from 'jotai';
import Editor from '@monaco-editor/react';
import { editorCodeAtom, updateCodeAction } from '../../atoms';
import { UI_TEXT } from '../../constants/editor.constants';
import './MermaidEditor.css';

/**
 * Monaco Editor wrapper for Mermaid code editing
 */
export function MermaidEditor(): JSX.Element {
  const code = useAtomValue(editorCodeAtom);
  const updateCode = useSetAtom(updateCodeAction);

  const handleEditorChange = (value: string | undefined): void => {
    if (value !== undefined) {
      updateCode(value);
    }
  };

  return (
    <div className="mermaid-editor">
      <div className="editor-header">
        <h3>{UI_TEXT.EDITOR_TITLE}</h3>
      </div>
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </div>
    </div>
  );
}

