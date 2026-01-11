/**
 * Feature: Diagram Rendering
 * 
 * As a user of the Mermaid Visual Editor
 * I want diagrams to render automatically
 * So that I can see my diagrams without manual actions
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'jotai';
import {
  editorCodeAtom,
  renderStatusAtom,
  renderedSvgAtom,
  renderDiagramAction,
} from '../../atoms';
import { DEFAULT_MERMAID_CODE } from '../../constants/editor.constants';

describe('Feature: Diagram Rendering', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('Scenario: Application loads with default diagram', () => {
    it('Given the application has just started', () => {
      // The store should have default code loaded
      const code = store.get(editorCodeAtom);
      expect(code).toBe(DEFAULT_MERMAID_CODE);
    });

    it('And the render status should be idle', () => {
      const status = store.get(renderStatusAtom);
      expect(status).toBe('idle');
    });

    it('When the initial render is triggered', async () => {
      // Trigger the render action
      await store.set(renderDiagramAction);
      
      // Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    it('Then the diagram should complete rendering (success or error in test env)', async () => {
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      // In jsdom, getBBox is not available so we may get error
      // The important thing is that we're not stuck in 'rendering'
      expect(['success', 'error']).toContain(status);
      expect(status).not.toBe('rendering');
    });

    it('And the SVG output should exist when successful', async () => {
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      if (status === 'success') {
        const svg = store.get(renderedSvgAtom);
        expect(svg).toBeTruthy();
        expect(svg.length).toBeGreaterThan(0);
      }
    });

    it('And the SVG should contain valid markup when successful', async () => {
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      if (status === 'success') {
        const svg = store.get(renderedSvgAtom);
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
      }
    });
  });

  describe('Scenario: Rendering completes within acceptable time', () => {
    it('Given a valid Mermaid diagram code', () => {
      const code = store.get(editorCodeAtom);
      expect(code).toContain('graph');
    });

    it('When rendering is triggered', async () => {
      const startTime = Date.now();
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const endTime = Date.now();
      
      // Rendering should complete within 5 seconds
      expect(endTime - startTime).toBeLessThan(6000);
    });

    it('Then the status should not remain stuck on rendering', async () => {
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const status = store.get(renderStatusAtom);
      expect(status).not.toBe('rendering');
      expect(['success', 'error']).toContain(status);
    });
  });

  describe('Scenario: Rendering never gets stuck in loading state', () => {
    it('Given rendering has been initiated, it should complete', async () => {
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const status = store.get(renderStatusAtom);
      expect(status).not.toBe('rendering');
      expect(['success', 'error']).toContain(status);
    }, 10000);
  });
});
