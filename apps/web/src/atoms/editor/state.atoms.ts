/**
 * Editor State Atoms
 * Pure read-only state atoms with no side effects
 */

import { atom } from 'jotai';
import type { RenderStatus } from '../../types/editor.types';
import { DEFAULT_MERMAID_CODE } from '../../constants/editor.constants';

/**
 * The current Mermaid code in the editor
 */
export const editorCodeAtom = atom<string>(DEFAULT_MERMAID_CODE);

/**
 * The current render status
 */
export const renderStatusAtom = atom<RenderStatus>('idle');

/**
 * The rendered SVG string (empty if not yet rendered)
 */
export const renderedSvgAtom = atom<string>('');

/**
 * The current error message (null if no error)
 */
export const renderErrorAtom = atom<string | null>(null);

/**
 * Derived atom: Check if currently rendering
 */
export const isRenderingAtom = atom((get) => get(renderStatusAtom) === 'rendering');

/**
 * Derived atom: Check if there is an error
 */
export const hasErrorAtom = atom((get) => get(renderStatusAtom) === 'error');

/**
 * Derived atom: Check if render was successful
 */
export const isSuccessAtom = atom((get) => get(renderStatusAtom) === 'success');

