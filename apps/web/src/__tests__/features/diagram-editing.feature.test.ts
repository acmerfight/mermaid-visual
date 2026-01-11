/**
 * Feature: Diagram Editing
 * 
 * As a user of the Mermaid Visual Editor
 * I want to edit Mermaid code in the editor
 * So that I can create and modify diagrams
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'jotai';
import {
  editorCodeAtom,
  renderStatusAtom,
  updateCodeAction,
  setCodeAction,
} from '../../atoms';
import { DEFAULT_MERMAID_CODE } from '../../constants/editor.constants';

describe('Feature: Diagram Editing', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('Scenario: User types new diagram code', () => {
    it('Given the editor is loaded with default code', () => {
      const code = store.get(editorCodeAtom);
      expect(code).toBe(DEFAULT_MERMAID_CODE);
    });

    it('When the user types new diagram code', () => {
      const newCode = 'graph LR\n  A --> B --> C';
      store.set(updateCodeAction, newCode);
      
      const code = store.get(editorCodeAtom);
      expect(code).toBe(newCode);
    });

    it('Then the code in the editor should update immediately', () => {
      const newCode = 'sequenceDiagram\n  Alice->>Bob: Hello';
      store.set(updateCodeAction, newCode);
      
      const code = store.get(editorCodeAtom);
      expect(code).toBe(newCode);
    });

    it('And the render status should change to rendering', () => {
      store.set(updateCodeAction, 'graph TD\n  X --> Y');
      
      const status = store.get(renderStatusAtom);
      expect(status).toBe('rendering');
    });
  });

  describe('Scenario: Code updates trigger debounced rendering', () => {
    it('Given the user is editing code', () => {
      store.set(updateCodeAction, 'graph TD\n  A');
      expect(store.get(renderStatusAtom)).toBe('rendering');
    });

    it('When multiple updates happen in quick succession', () => {
      store.set(updateCodeAction, 'graph TD\n  A');
      store.set(updateCodeAction, 'graph TD\n  A --> B');
      store.set(updateCodeAction, 'graph TD\n  A --> B --> C');
      
      // Code should reflect the latest update
      const code = store.get(editorCodeAtom);
      expect(code).toBe('graph TD\n  A --> B --> C');
    });

    it('Then the diagram should update after debounce delay', async () => {
      store.set(updateCodeAction, 'graph LR\n  Start --> End');
      
      // Wait for debounce (300ms) + render time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const status = store.get(renderStatusAtom);
      expect(['success', 'error']).toContain(status);
    });
  });

  describe('Scenario: Programmatic code update without rendering', () => {
    it('Given the editor has some code', () => {
      const initialCode = store.get(editorCodeAtom);
      expect(initialCode).toBeTruthy();
    });

    it('When code is set programmatically without render', () => {
      const newCode = 'pie\n  "A": 50\n  "B": 50';
      store.set(setCodeAction, newCode);
      
      const code = store.get(editorCodeAtom);
      expect(code).toBe(newCode);
    });

    it('Then the render status should remain unchanged', () => {
      const initialStatus = store.get(renderStatusAtom);
      store.set(setCodeAction, 'graph TD\n  New');
      const newStatus = store.get(renderStatusAtom);
      
      expect(newStatus).toBe(initialStatus);
    });
  });

  describe('Scenario: Editor preserves code structure', () => {
    it('Given a complex multi-line diagram', () => {
      const complexCode = `graph TD
    subgraph Frontend
        A[React App] --> B[Components]
        B --> C[State Management]
    end
    subgraph Backend
        D[API Server] --> E[Database]
    end
    A --> D`;
      
      store.set(updateCodeAction, complexCode);
      const savedCode = store.get(editorCodeAtom);
      
      expect(savedCode).toBe(complexCode);
    });

    it('When special characters are included', () => {
      const codeWithSpecialChars = 'graph TD\n  A["Node with (brackets)"] --> B';
      store.set(updateCodeAction, codeWithSpecialChars);
      
      const code = store.get(editorCodeAtom);
      expect(code).toContain('(brackets)');
    });

    it('Then the code should be preserved exactly', () => {
      const exactCode = 'flowchart LR\n    A[Hard] -->|Text| B(Round)\n    B --> C{Decision}';
      store.set(updateCodeAction, exactCode);
      
      expect(store.get(editorCodeAtom)).toBe(exactCode);
    });
  });
});

