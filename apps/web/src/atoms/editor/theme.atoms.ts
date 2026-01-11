/**
 * Theme State Atoms
 * Manages the current theme selection
 */

import { atom } from 'jotai';
import { DEFAULT_THEME, getThemeById, type ThemeConfig } from '../../constants/themes.constants';

/**
 * Current selected theme
 */
export const currentThemeAtom = atom<ThemeConfig>(DEFAULT_THEME);

/**
 * Action: Select a theme by ID
 */
export const selectThemeAction = atom(
  null,
  (_get, set, themeId: string) => {
    const theme = getThemeById(themeId);
    set(currentThemeAtom, theme);
  }
);

