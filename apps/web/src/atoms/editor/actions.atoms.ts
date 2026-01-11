/**
 * Editor Action Atoms
 * Write-only atoms that handle state mutations and side effects
 */

import { atom } from 'jotai';
import {
  editorCodeAtom,
  renderStatusAtom,
  renderedSvgAtom,
  renderErrorAtom,
} from './state.atoms';
import { currentThemeAtom } from './theme.atoms';
import { MermaidService } from '../../services/mermaid.service';
import { Debouncer } from '../../services/debounce.service';
import { DEBOUNCE_DELAY_MS } from '../../constants/editor.constants';
import type { ThemeConfig } from '../../constants/themes.constants';

// Track the current render to prevent race conditions
let currentRenderId = 0;

// Debouncer instance for code updates
let renderDebouncer: Debouncer<{
  code: string;
  theme: ThemeConfig;
  renderId: number;
  setStatus: (status: 'idle' | 'rendering' | 'success' | 'error') => void;
  setSvg: (svg: string) => void;
  setError: (error: string | null) => void;
}> | null = null;

/**
 * Initialize the debouncer with the render callback
 */
function getDebouncer() {
  if (!renderDebouncer) {
    renderDebouncer = new Debouncer(async ({ code, theme, renderId, setStatus, setSvg, setError }) => {
      // Check if this is still the current render request
      if (renderId !== currentRenderId) return;

      const result = await MermaidService.render(code, theme);

      // Check again after async operation
      if (renderId !== currentRenderId) return;

      if (result.success && result.svg) {
        setSvg(result.svg);
        setError(null);
        setStatus('success');
      } else {
        setError(result.error || 'Unknown error');
        setStatus('error');
      }
    }, DEBOUNCE_DELAY_MS);
  }
  return renderDebouncer;
}

/**
 * Action: Update code and trigger debounced rendering
 * Used when user types in the editor
 */
export const updateCodeAction = atom(
  null,
  (get, set, newCode: string) => {
    // Update code immediately
    set(editorCodeAtom, newCode);
    
    // Get current theme
    const theme = get(currentThemeAtom);
    
    // Set status to rendering
    set(renderStatusAtom, 'rendering');
    
    // Increment render ID to invalidate previous renders
    const renderId = ++currentRenderId;
    
    // Trigger debounced render
    getDebouncer().execute({
      code: newCode,
      theme,
      renderId,
      setStatus: (status) => set(renderStatusAtom, status),
      setSvg: (svg) => set(renderedSvgAtom, svg),
      setError: (error) => set(renderErrorAtom, error),
    });
  }
);

/**
 * Action: Render diagram immediately without debouncing
 * Used for initial render and manual refresh
 */
export const renderDiagramAction = atom(
  null,
  async (get, set) => {
    const code = get(editorCodeAtom);
    const theme = get(currentThemeAtom);
    const renderId = ++currentRenderId;
    
    // Cancel any pending debounced renders
    getDebouncer().cancel();
    
    // Set status to rendering
    set(renderStatusAtom, 'rendering');
    
    // Render immediately with current theme
    const result = await MermaidService.render(code, theme);
    
    // Check if this is still the current render
    if (renderId !== currentRenderId) return;
    
    if (result.success && result.svg) {
      set(renderedSvgAtom, result.svg);
      set(renderErrorAtom, null);
      set(renderStatusAtom, 'success');
    } else {
      set(renderErrorAtom, result.error || 'Unknown error');
      set(renderStatusAtom, 'error');
    }
  }
);

/**
 * Action: Set code without triggering render
 * Used for programmatic code updates
 */
export const setCodeAction = atom(
  null,
  (_get, set, newCode: string) => {
    set(editorCodeAtom, newCode);
  }
);

/**
 * Action: Reset editor to default state
 */
export const resetEditorAction = atom(
  null,
  (_get, set) => {
    currentRenderId++;
    getDebouncer().cancel();
    set(renderStatusAtom, 'idle');
    set(renderedSvgAtom, '');
    set(renderErrorAtom, null);
  }
);

