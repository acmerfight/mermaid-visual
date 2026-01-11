/**
 * Mermaid Theme Configurations
 * Collection of beautiful, elegant themes for diagram rendering
 */

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  preview: string; // CSS gradient for preview
  variables: Record<string, string>;
}

/**
 * Ocean Breeze - Calm blue tones inspired by the sea
 */
const oceanBreeze: ThemeConfig = {
  id: 'ocean-breeze',
  name: 'Ocean Breeze',
  description: 'Calm and professional blue tones',
  preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  variables: {
    primaryColor: '#e0f2fe',
    primaryTextColor: '#0c4a6e',
    primaryBorderColor: '#0284c7',
    lineColor: '#0284c7',
    secondaryColor: '#f0f9ff',
    tertiaryColor: '#e0f2fe',
    background: '#ffffff',
    mainBkg: '#e0f2fe',
    nodeBorder: '#0284c7',
    clusterBkg: '#f0f9ff',
    clusterBorder: '#38bdf8',
    titleColor: '#0c4a6e',
    edgeLabelBackground: '#ffffff',
    nodeTextColor: '#0c4a6e',
  },
};

/**
 * Sunset Glow - Warm orange and pink gradients
 */
const sunsetGlow: ThemeConfig = {
  id: 'sunset-glow',
  name: 'Sunset Glow',
  description: 'Warm and vibrant sunset colors',
  preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  variables: {
    primaryColor: '#fef3c7',
    primaryTextColor: '#78350f',
    primaryBorderColor: '#f59e0b',
    lineColor: '#f59e0b',
    secondaryColor: '#fef9c3',
    tertiaryColor: '#ffedd5',
    background: '#fffbeb',
    mainBkg: '#fef3c7',
    nodeBorder: '#f59e0b',
    clusterBkg: '#fef9c3',
    clusterBorder: '#fbbf24',
    titleColor: '#78350f',
    edgeLabelBackground: '#fffbeb',
    nodeTextColor: '#78350f',
  },
};

/**
 * Forest Mint - Fresh green nature-inspired theme
 */
const forestMint: ThemeConfig = {
  id: 'forest-mint',
  name: 'Forest Mint',
  description: 'Fresh and natural green tones',
  preview: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  variables: {
    primaryColor: '#dcfce7',
    primaryTextColor: '#14532d',
    primaryBorderColor: '#22c55e',
    lineColor: '#22c55e',
    secondaryColor: '#f0fdf4',
    tertiaryColor: '#bbf7d0',
    background: '#f0fdf4',
    mainBkg: '#dcfce7',
    nodeBorder: '#22c55e',
    clusterBkg: '#f0fdf4',
    clusterBorder: '#4ade80',
    titleColor: '#14532d',
    edgeLabelBackground: '#f0fdf4',
    nodeTextColor: '#14532d',
  },
};

/**
 * Midnight Purple - Dark elegant purple theme
 */
const midnightPurple: ThemeConfig = {
  id: 'midnight-purple',
  name: 'Midnight Purple',
  description: 'Elegant dark purple aesthetic',
  preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  variables: {
    primaryColor: '#ede9fe',
    primaryTextColor: '#3b0764',
    primaryBorderColor: '#8b5cf6',
    lineColor: '#8b5cf6',
    secondaryColor: '#f5f3ff',
    tertiaryColor: '#ddd6fe',
    background: '#faf5ff',
    mainBkg: '#ede9fe',
    nodeBorder: '#8b5cf6',
    clusterBkg: '#f5f3ff',
    clusterBorder: '#a78bfa',
    titleColor: '#3b0764',
    edgeLabelBackground: '#faf5ff',
    nodeTextColor: '#3b0764',
  },
};

/**
 * Rose Garden - Soft pink romantic theme
 */
const roseGarden: ThemeConfig = {
  id: 'rose-garden',
  name: 'Rose Garden',
  description: 'Soft and romantic pink tones',
  preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  variables: {
    primaryColor: '#fce7f3',
    primaryTextColor: '#831843',
    primaryBorderColor: '#ec4899',
    lineColor: '#ec4899',
    secondaryColor: '#fdf2f8',
    tertiaryColor: '#fbcfe8',
    background: '#fdf2f8',
    mainBkg: '#fce7f3',
    nodeBorder: '#ec4899',
    clusterBkg: '#fdf2f8',
    clusterBorder: '#f472b6',
    titleColor: '#831843',
    edgeLabelBackground: '#fdf2f8',
    nodeTextColor: '#831843',
  },
};

/**
 * Cyber Neon - Futuristic neon cyberpunk theme
 */
const cyberNeon: ThemeConfig = {
  id: 'cyber-neon',
  name: 'Cyber Neon',
  description: 'Futuristic cyberpunk neon style',
  preview: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  variables: {
    primaryColor: '#1e1b4b',
    primaryTextColor: '#c4b5fd',
    primaryBorderColor: '#a855f7',
    lineColor: '#22d3ee',
    secondaryColor: '#312e81',
    tertiaryColor: '#3730a3',
    background: '#0f0a1f',
    mainBkg: '#1e1b4b',
    nodeBorder: '#a855f7',
    clusterBkg: '#312e81',
    clusterBorder: '#8b5cf6',
    titleColor: '#22d3ee',
    edgeLabelBackground: '#1e1b4b',
    nodeTextColor: '#e0e7ff',
  },
};

/**
 * Monochrome - Clean black and white minimal theme
 */
const monochrome: ThemeConfig = {
  id: 'monochrome',
  name: 'Monochrome',
  description: 'Clean minimalist black and white',
  preview: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  variables: {
    primaryColor: '#f5f5f5',
    primaryTextColor: '#171717',
    primaryBorderColor: '#404040',
    lineColor: '#525252',
    secondaryColor: '#fafafa',
    tertiaryColor: '#e5e5e5',
    background: '#ffffff',
    mainBkg: '#f5f5f5',
    nodeBorder: '#404040',
    clusterBkg: '#fafafa',
    clusterBorder: '#737373',
    titleColor: '#171717',
    edgeLabelBackground: '#ffffff',
    nodeTextColor: '#171717',
  },
};

/**
 * Aurora Borealis - Magical northern lights theme
 */
const auroraBorealis: ThemeConfig = {
  id: 'aurora-borealis',
  name: 'Aurora Borealis',
  description: 'Magical northern lights colors',
  preview: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
  variables: {
    primaryColor: '#ccfbf1',
    primaryTextColor: '#134e4a',
    primaryBorderColor: '#14b8a6',
    lineColor: '#0891b2',
    secondaryColor: '#cffafe',
    tertiaryColor: '#a5f3fc',
    background: '#f0fdfa',
    mainBkg: '#ccfbf1',
    nodeBorder: '#14b8a6',
    clusterBkg: '#ecfeff',
    clusterBorder: '#2dd4bf',
    titleColor: '#134e4a',
    edgeLabelBackground: '#f0fdfa',
    nodeTextColor: '#134e4a',
  },
};

/**
 * Cherry Blossom - Japanese sakura inspired theme
 */
const cherryBlossom: ThemeConfig = {
  id: 'cherry-blossom',
  name: 'Cherry Blossom',
  description: 'Delicate Japanese sakura aesthetic',
  preview: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  variables: {
    primaryColor: '#fff1f2',
    primaryTextColor: '#881337',
    primaryBorderColor: '#fb7185',
    lineColor: '#f43f5e',
    secondaryColor: '#ffe4e6',
    tertiaryColor: '#fecdd3',
    background: '#fff1f2',
    mainBkg: '#ffe4e6',
    nodeBorder: '#fb7185',
    clusterBkg: '#fff1f2',
    clusterBorder: '#fda4af',
    titleColor: '#881337',
    edgeLabelBackground: '#fff1f2',
    nodeTextColor: '#881337',
  },
};

/**
 * Deep Space - Dark cosmic theme
 */
const deepSpace: ThemeConfig = {
  id: 'deep-space',
  name: 'Deep Space',
  description: 'Dark cosmic exploration theme',
  preview: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  variables: {
    primaryColor: '#1e3a5f',
    primaryTextColor: '#93c5fd',
    primaryBorderColor: '#3b82f6',
    lineColor: '#60a5fa',
    secondaryColor: '#1e3a5f',
    tertiaryColor: '#1e40af',
    background: '#0c1929',
    mainBkg: '#1e3a5f',
    nodeBorder: '#3b82f6',
    clusterBkg: '#172554',
    clusterBorder: '#2563eb',
    titleColor: '#93c5fd',
    edgeLabelBackground: '#1e3a5f',
    nodeTextColor: '#bfdbfe',
  },
};

/**
 * Lavender Fields - Soft calming lavender theme
 */
const lavenderFields: ThemeConfig = {
  id: 'lavender-fields',
  name: 'Lavender Fields',
  description: 'Soft calming lavender tones',
  preview: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
  variables: {
    primaryColor: '#ede9fe',
    primaryTextColor: '#4c1d95',
    primaryBorderColor: '#7c3aed',
    lineColor: '#8b5cf6',
    secondaryColor: '#f5f3ff',
    tertiaryColor: '#ddd6fe',
    background: '#faf5ff',
    mainBkg: '#ede9fe',
    nodeBorder: '#7c3aed',
    clusterBkg: '#f5f3ff',
    clusterBorder: '#a78bfa',
    titleColor: '#4c1d95',
    edgeLabelBackground: '#faf5ff',
    nodeTextColor: '#4c1d95',
  },
};

/**
 * Coral Reef - Vibrant underwater coral theme
 */
const coralReef: ThemeConfig = {
  id: 'coral-reef',
  name: 'Coral Reef',
  description: 'Vibrant underwater coral colors',
  preview: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  variables: {
    primaryColor: '#fed7aa',
    primaryTextColor: '#7c2d12',
    primaryBorderColor: '#ea580c',
    lineColor: '#f97316',
    secondaryColor: '#ffedd5',
    tertiaryColor: '#fdba74',
    background: '#fff7ed',
    mainBkg: '#fed7aa',
    nodeBorder: '#ea580c',
    clusterBkg: '#ffedd5',
    clusterBorder: '#fb923c',
    titleColor: '#7c2d12',
    edgeLabelBackground: '#fff7ed',
    nodeTextColor: '#7c2d12',
  },
};

/**
 * All available themes
 */
export const THEMES: ThemeConfig[] = [
  oceanBreeze,
  sunsetGlow,
  forestMint,
  midnightPurple,
  roseGarden,
  cyberNeon,
  monochrome,
  auroraBorealis,
  cherryBlossom,
  deepSpace,
  lavenderFields,
  coralReef,
];

/**
 * Default theme
 */
export const DEFAULT_THEME = oceanBreeze;

/**
 * Get theme by ID
 */
export function getThemeById(id: string): ThemeConfig {
  return THEMES.find(theme => theme.id === id) || DEFAULT_THEME;
}

/**
 * Check if theme is dark mode
 */
export function isDarkTheme(theme: ThemeConfig): boolean {
  return ['cyber-neon', 'deep-space'].includes(theme.id);
}

