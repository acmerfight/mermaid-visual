/**
 * ThemeSelector Component
 * Beautiful theme picker with preview cards
 */

import { useAtomValue, useSetAtom } from 'jotai';
import { currentThemeAtom, selectThemeAction, renderDiagramAction } from '../../atoms';
import { THEMES, type ThemeConfig } from '../../constants/themes.constants';
import './ThemeSelector.css';

interface ThemeCardProps {
  theme: ThemeConfig;
  isSelected: boolean;
  onSelect: () => void;
}

function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps): JSX.Element {
  return (
    <button
      className={`theme-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      title={theme.description}
    >
      <div 
        className="theme-preview" 
        style={{ background: theme.preview }}
      >
        <div className="theme-preview-nodes">
          <div 
            className="preview-node"
            style={{ 
              background: theme.variables.primaryColor,
              borderColor: theme.variables.primaryBorderColor,
              color: theme.variables.primaryTextColor,
            }}
          >
            A
          </div>
          <div 
            className="preview-arrow"
            style={{ background: theme.variables.lineColor }}
          />
          <div 
            className="preview-node"
            style={{ 
              background: theme.variables.secondaryColor,
              borderColor: theme.variables.primaryBorderColor,
              color: theme.variables.primaryTextColor,
            }}
          >
            B
          </div>
        </div>
      </div>
      <div className="theme-info">
        <span className="theme-name">{theme.name}</span>
      </div>
      {isSelected && (
        <div className="selected-indicator">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      )}
    </button>
  );
}

export function ThemeSelector(): JSX.Element {
  const currentTheme = useAtomValue(currentThemeAtom);
  const selectTheme = useSetAtom(selectThemeAction);
  const renderDiagram = useSetAtom(renderDiagramAction);

  const handleThemeSelect = (themeId: string): void => {
    selectTheme(themeId);
    // Re-render diagram with new theme
    setTimeout(() => {
      renderDiagram();
    }, 50);
  };

  return (
    <div className="theme-selector">
      <div className="theme-selector-header">
        <h4>Theme</h4>
        <span className="current-theme-badge">{currentTheme.name}</span>
      </div>
      <div className="theme-grid">
        {THEMES.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={theme.id === currentTheme.id}
            onSelect={() => handleThemeSelect(theme.id)}
          />
        ))}
      </div>
    </div>
  );
}

