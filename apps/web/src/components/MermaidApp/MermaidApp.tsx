/**
 * MermaidApp Component
 * Main application container that orchestrates the editor and preview
 */

import { useSetAtom, useAtomValue } from 'jotai';
import { MermaidEditor } from '../MermaidEditor/MermaidEditor';
import { MermaidPreview } from '../MermaidPreview/MermaidPreview';
import { ThemeSelector } from '../ThemeSelector/ThemeSelector';
import { renderDiagramAction, editorCodeAtom, renderStatusAtom } from '../../atoms';
import { UI_TEXT } from '../../constants/editor.constants';
import { isInitialized, markInitialized } from './initialization';
import './MermaidApp.css';

/**
 * Initializer component - triggers initial render on mount
 * Separated to keep initialization logic isolated
 */
function DiagramInitializer(): null {
  const renderDiagram = useSetAtom(renderDiagramAction);
  const code = useAtomValue(editorCodeAtom);
  const status = useAtomValue(renderStatusAtom);

  // Trigger initial render only once when code exists and status is idle
  if (!isInitialized() && code && status === 'idle') {
    markInitialized();
    // Use setTimeout to avoid updating state during render
    setTimeout(() => {
      renderDiagram();
    }, 0);
  }

  return null;
}

/**
 * Main Mermaid Editor Application
 */
export function MermaidApp(): JSX.Element {
  return (
    <div className="mermaid-app">
      <DiagramInitializer />
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>{UI_TEXT.APP_TITLE}</h1>
            <p>{UI_TEXT.APP_SUBTITLE}</p>
          </div>
        </div>
      </header>
      <div className="app-toolbar">
        <ThemeSelector />
      </div>
      <main className="app-main">
        <MermaidEditor />
        <MermaidPreview />
      </main>
    </div>
  );
}
