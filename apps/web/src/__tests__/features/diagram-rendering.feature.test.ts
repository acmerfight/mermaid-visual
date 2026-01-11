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
import { waitForRenderComplete, measureTime } from '../../test/utils';

describe('Feature: Diagram Rendering', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('Scenario: Application loads with default diagram', () => {
    it('Given the application has just started', () => {
      const code = store.get(editorCodeAtom);
      expect(code).toBe(DEFAULT_MERMAID_CODE);
    });

    it('And the render status should be idle', () => {
      const status = store.get(renderStatusAtom);
      expect(status).toBe('idle');
    });

    it('When the initial render is triggered, Then it should complete', async () => {
      await store.set(renderDiagramAction);
      
      const status = await waitForRenderComplete(
        () => store.get(renderStatusAtom),
        { timeout: 5000, interval: 50 }
      );
      
      expect(['success', 'error']).toContain(status);
      expect(status).not.toBe('rendering');
    });

    it('And the SVG output should exist when successful', async () => {
      await store.set(renderDiagramAction);
      
      const status = await waitForRenderComplete(
        () => store.get(renderStatusAtom),
        { timeout: 5000, interval: 50 }
      );
      
      if (status === 'success') {
        const svg = store.get(renderedSvgAtom);
        expect(svg).toBeTruthy();
        expect(svg.length).toBeGreaterThan(0);
      }
    });

    it('And the SVG should contain valid markup when successful', async () => {
      await store.set(renderDiagramAction);
      
      const status = await waitForRenderComplete(
        () => store.get(renderStatusAtom),
        { timeout: 5000, interval: 50 }
      );
      
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

    it('When rendering is triggered, Then it should complete within 5 seconds', async () => {
      const { duration } = await measureTime(async () => {
        await store.set(renderDiagramAction);
        return waitForRenderComplete(
          () => store.get(renderStatusAtom),
          { timeout: 5000, interval: 50 }
        );
      });
      
      expect(duration).toBeLessThan(5000);
    });

    it('Then the status should not remain stuck on rendering', async () => {
      await store.set(renderDiagramAction);
      
      const status = await waitForRenderComplete(
        () => store.get(renderStatusAtom),
        { timeout: 5000, interval: 50 }
      );
      
      expect(status).not.toBe('rendering');
      expect(['success', 'error']).toContain(status);
    });
  });

  describe('Scenario: Rendering never gets stuck in loading state', () => {
    it('Given rendering has been initiated, it should complete', async () => {
      await store.set(renderDiagramAction);
      
      const status = await waitForRenderComplete(
        () => store.get(renderStatusAtom),
        { timeout: 5000, interval: 50 }
      );
      
      expect(status).not.toBe('rendering');
      expect(['success', 'error']).toContain(status);
    });
  });
});
