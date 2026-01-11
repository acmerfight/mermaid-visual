/**
 * Editor Constants
 * Centralized configuration and default values
 */

/**
 * Default Mermaid diagram code shown when the editor loads
 */
export const DEFAULT_MERMAID_CODE = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`;

/**
 * Debounce delay in milliseconds for code updates
 */
export const DEBOUNCE_DELAY_MS = 300;

/**
 * UI Text constants for the editor
 */
export const UI_TEXT = {
  APP_TITLE: 'Mermaid Visual Editor',
  APP_SUBTITLE: 'Real-time Mermaid diagram editing and preview',
  
  EDITOR_TITLE: 'Code Editor',
  PREVIEW_TITLE: 'Diagram Preview',
  
  STATUS_IDLE: 'Ready',
  STATUS_RENDERING: 'Rendering...',
  STATUS_SUCCESS: 'Success',
  STATUS_ERROR: 'Error',
  
  PLACEHOLDER_IDLE: 'Start editing code to see your diagram here',
  PLACEHOLDER_RENDERING: 'Rendering diagram...',
  
  ERROR_TITLE: 'Rendering Error',
  ERROR_UNKNOWN: 'An unknown error occurred',
} as const;

/**
 * Mermaid theme configuration
 */
export const MERMAID_THEME_CONFIG = {
  primaryColor: '#e8f0fe',
  primaryTextColor: '#1a1a2e',
  primaryBorderColor: '#667eea',
  lineColor: '#667eea',
  arrowheadColor: '#667eea',
  secondaryColor: '#f3e8ff',
  secondaryTextColor: '#1a1a2e',
  secondaryBorderColor: '#a855f7',
  tertiaryColor: '#fef3c7',
  tertiaryTextColor: '#1a1a2e',
  tertiaryBorderColor: '#f59e0b',
  background: '#ffffff',
  mainBkg: '#e8f0fe',
  secondBkg: '#f3e8ff',
  textColor: '#1a1a2e',
  nodeTextColor: '#1a1a2e',
  nodeBorder: '#667eea',
  clusterBorder: '#667eea',
  clusterBkg: '#f8fafc',
  edgeLabelBackground: '#ffffff',
  noteBkgColor: '#fef9c3',
  noteTextColor: '#713f12',
  noteBorderColor: '#facc15',
  actorBorder: '#667eea',
  actorBkg: '#e8f0fe',
  actorTextColor: '#1a1a2e',
  actorLineColor: '#667eea',
  signalColor: '#1a1a2e',
  signalTextColor: '#1a1a2e',
  labelBoxBkgColor: '#e8f0fe',
  labelBoxBorderColor: '#667eea',
  labelTextColor: '#1a1a2e',
  loopTextColor: '#1a1a2e',
  sectionBkgColor: '#e8f0fe',
  altSectionBkgColor: '#f3e8ff',
  taskBorderColor: '#667eea',
  taskBkgColor: '#e8f0fe',
  taskTextColor: '#1a1a2e',
  taskTextLightColor: '#1a1a2e',
  taskTextDarkColor: '#1a1a2e',
  activeTaskBorderColor: '#a855f7',
  activeTaskBkgColor: '#f3e8ff',
  doneTaskBkgColor: '#dcfce7',
  doneTaskBorderColor: '#22c55e',
  critBorderColor: '#ef4444',
  critBkgColor: '#fee2e2',
  gridColor: '#e2e8f0',
  todayLineColor: '#f59e0b',
} as const;

