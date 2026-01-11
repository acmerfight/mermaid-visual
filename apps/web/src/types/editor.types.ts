/**
 * Editor State Types
 * Defines the core types for the Mermaid editor state management
 */

/**
 * Render status represents the current state of diagram rendering
 * - idle: No rendering has been attempted yet
 * - rendering: Diagram is currently being rendered
 * - success: Diagram rendered successfully
 * - error: Rendering failed with an error
 */
export type RenderStatus = 'idle' | 'rendering' | 'success' | 'error';

/**
 * Complete editor state interface
 */
export interface EditorState {
  code: string;
  status: RenderStatus;
  svg: string;
  error: string | null;
}

/**
 * Render result from the mermaid service
 */
export interface RenderResult {
  success: boolean;
  svg?: string;
  error?: string;
}

/**
 * Mermaid configuration options
 */
export interface MermaidConfig {
  theme: string;
  fontFamily: string;
  fontSize: number;
  securityLevel: 'strict' | 'loose' | 'antiscript' | 'sandbox';
}

