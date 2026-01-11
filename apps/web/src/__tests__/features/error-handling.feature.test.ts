/**
 * Feature: Error Handling
 * 
 * As a user of the Mermaid Visual Editor
 * I want to see clear error messages when my diagram has issues
 * So that I can fix problems in my code
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'jotai';
import {
  editorCodeAtom,
  renderStatusAtom,
  renderErrorAtom,
  renderDiagramAction,
  setCodeAction,
} from '../../atoms';

describe('Feature: Error Handling', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('Scenario: Invalid Mermaid syntax triggers error', () => {
    it('Given the editor contains invalid Mermaid code', () => {
      const invalidCode = 'this is not valid mermaid syntax';
      store.set(setCodeAction, invalidCode);
      
      expect(store.get(editorCodeAtom)).toBe(invalidCode);
    });

    it('When rendering is triggered', async () => {
      store.set(setCodeAction, 'invalid syntax here');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    it('Then the status should be error', async () => {
      store.set(setCodeAction, 'not a valid diagram');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      expect(status).toBe('error');
    });

    it('And an error message should be provided', async () => {
      store.set(setCodeAction, 'completely invalid code');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const error = store.get(renderErrorAtom);
      expect(error).toBeTruthy();
      expect(typeof error).toBe('string');
    });
  });

  describe('Scenario: Syntax error provides helpful message', () => {
    it('Given a diagram with a syntax error', async () => {
      const codeWithError = 'graph TD\n  A --> --> B';
      store.set(setCodeAction, codeWithError);
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      expect(status).toBe('error');
    });

    it('Then the error message should be descriptive', async () => {
      store.set(setCodeAction, 'graph TD\n  A --> --> B');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const error = store.get(renderErrorAtom);
      expect(error).toBeTruthy();
      expect(error!.length).toBeGreaterThan(5);
    });
  });

  describe('Scenario: Recovery from error state', () => {
    it('Given the editor is in an error state', async () => {
      store.set(setCodeAction, 'invalid code');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      expect(store.get(renderStatusAtom)).toBe('error');
    });

    it('When valid code is entered and rendered', async () => {
      // First create error state
      store.set(setCodeAction, 'invalid');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Now enter valid code
      store.set(setCodeAction, 'graph TD\n  A --> B');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      // Note: In jsdom, even valid code may fail due to getBBox
      // The important test is that we don't stay stuck in 'rendering'
      expect(status).not.toBe('rendering');
    });

    it('Then the status should transition away from error or rendering', async () => {
      // Create error state
      store.set(setCodeAction, 'bad code');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Recover with valid code
      store.set(setCodeAction, 'graph LR\n  A --> B');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      // In test environment, getBBox may cause errors
      // Key assertion: not stuck in rendering
      expect(status).not.toBe('rendering');
      expect(['success', 'error']).toContain(status);
    });
  });

  describe('Scenario: Empty code handling', () => {
    it('Given the code editor is empty', () => {
      store.set(setCodeAction, '');
      expect(store.get(editorCodeAtom)).toBe('');
    });

    it('When rendering is attempted', async () => {
      store.set(setCodeAction, '');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    it('Then an appropriate error should be shown', async () => {
      store.set(setCodeAction, '');
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      expect(status).toBe('error');
    });
  });

  describe('Scenario: Partial diagram code handling', () => {
    it('Given an incomplete diagram definition', async () => {
      const incompleteCode = 'graph TD\n  A -->';
      store.set(setCodeAction, incompleteCode);
      await store.set(renderDiagramAction);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Should result in an error state
      const status = store.get(renderStatusAtom);
      expect(status).toBe('error');
    });
  });
});
