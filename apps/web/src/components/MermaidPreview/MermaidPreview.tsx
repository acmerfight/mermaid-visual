/**
 * MermaidPreview Component
 * Displays the rendered Mermaid diagram
 */

import { useAtomValue } from 'jotai';
import {
  renderStatusAtom,
  renderErrorAtom,
  renderedSvgAtom,
} from '../../atoms';
import { UI_TEXT } from '../../constants/editor.constants';
import './MermaidPreview.css';

/**
 * Status indicator component
 */
function StatusIndicator(): JSX.Element | null {
  const status = useAtomValue(renderStatusAtom);

  switch (status) {
    case 'rendering':
      return <span className="status-indicator rendering">{UI_TEXT.STATUS_RENDERING}</span>;
    case 'success':
      return <span className="status-indicator success">✓ {UI_TEXT.STATUS_SUCCESS}</span>;
    case 'error':
      return <span className="status-indicator error">✗ {UI_TEXT.STATUS_ERROR}</span>;
    default:
      return <span className="status-indicator idle">{UI_TEXT.STATUS_IDLE}</span>;
  }
}

/**
 * Preview content based on render status
 */
function PreviewContent(): JSX.Element {
  const status = useAtomValue(renderStatusAtom);
  const error = useAtomValue(renderErrorAtom);
  const svg = useAtomValue(renderedSvgAtom);

  if (status === 'idle') {
    return (
      <div className="preview-placeholder">
        <p>{UI_TEXT.PLACEHOLDER_IDLE}</p>
      </div>
    );
  }

  if (status === 'rendering') {
    return (
      <div className="preview-placeholder">
        <div className="loading-spinner" />
        <p>{UI_TEXT.PLACEHOLDER_RENDERING}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="preview-error">
        <div className="error-icon">⚠️</div>
        <p className="error-title">{UI_TEXT.ERROR_TITLE}</p>
        <p className="error-message">{error || UI_TEXT.ERROR_UNKNOWN}</p>
      </div>
    );
  }

  // Success state
  return (
    <div
      className="preview-svg"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/**
 * Mermaid diagram preview panel
 */
export function MermaidPreview(): JSX.Element {
  return (
    <div className="mermaid-preview">
      <div className="preview-header">
        <h3>{UI_TEXT.PREVIEW_TITLE}</h3>
        <StatusIndicator />
      </div>
      <div className="preview-container">
        <PreviewContent />
      </div>
    </div>
  );
}

