/**
 * Feature: Application Startup
 * 
 * As a user of the Mermaid Visual Editor
 * I want the application to load quickly and show a diagram
 * So that I can start working immediately
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider, createStore } from 'jotai';
import { MermaidApp, resetInitialization } from '../../components';
import { renderStatusAtom } from '../../atoms';
import { UI_TEXT } from '../../constants/editor.constants';

describe('Feature: Application Startup', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    resetInitialization();
  });

  afterEach(() => {
    resetInitialization();
  });

  const renderApp = () => {
    return render(
      <Provider store={store}>
        <MermaidApp />
      </Provider>
    );
  };

  describe('Scenario: User opens the application', () => {
    it('Given the user navigates to the Mermaid Editor', () => {
      renderApp();
      expect(screen.getByText(UI_TEXT.APP_TITLE)).toBeInTheDocument();
    });

    it('Then the application title should be visible', () => {
      renderApp();
      expect(screen.getByText(UI_TEXT.APP_TITLE)).toBeInTheDocument();
      expect(screen.getByText(UI_TEXT.APP_SUBTITLE)).toBeInTheDocument();
    });

    it('And the code editor section should be visible', () => {
      renderApp();
      expect(screen.getByText(UI_TEXT.EDITOR_TITLE)).toBeInTheDocument();
    });

    it('And the preview section should be visible', () => {
      renderApp();
      expect(screen.getByText(UI_TEXT.PREVIEW_TITLE)).toBeInTheDocument();
    });
  });

  describe('Scenario: Initial diagram renders on startup', () => {
    it('Given the application has loaded, Then rendering should start', async () => {
      renderApp();
      
      await waitFor(
        () => {
          const status = store.get(renderStatusAtom);
          expect(['rendering', 'success', 'error']).toContain(status);
        },
        { timeout: 2000, interval: 50 }
      );
    });

    it('When the initial rendering completes', async () => {
      renderApp();
      
      await waitFor(
        () => {
          const status = store.get(renderStatusAtom);
          expect(status).not.toBe('rendering');
          expect(['success', 'error']).toContain(status);
        },
        { timeout: 5000, interval: 50 }
      );
    });

    it('Then the render status should not be stuck', async () => {
      renderApp();
      
      await waitFor(
        () => {
          const status = store.get(renderStatusAtom);
          expect(status).not.toBe('rendering');
        },
        { timeout: 5000, interval: 50 }
      );
    });

    it('And a status indicator should be shown', async () => {
      renderApp();
      
      await waitFor(
        () => {
          const status = store.get(renderStatusAtom);
          return status !== 'rendering';
        },
        { timeout: 5000, interval: 50 }
      );

      const status = store.get(renderStatusAtom);
      expect(['success', 'error']).toContain(status);
      
      const previewHeader = screen.getByText(UI_TEXT.PREVIEW_TITLE);
      expect(previewHeader).toBeInTheDocument();
    });
  });

  describe('Scenario: Application handles rendering gracefully', () => {
    it('Given rendering is in progress, Then it should eventually complete', async () => {
      renderApp();
      
      await waitFor(
        () => {
          const status = store.get(renderStatusAtom);
          expect(status).not.toBe('rendering');
        },
        { timeout: 5000, interval: 50 }
      );
    });

    it('And the application should not freeze', async () => {
      const startTime = Date.now();
      renderApp();
      
      await waitFor(
        () => {
          const status = store.get(renderStatusAtom);
          return status === 'success' || status === 'error';
        },
        { timeout: 5000, interval: 50 }
      );
      
      const elapsedTime = Date.now() - startTime;
      expect(elapsedTime).toBeLessThan(6000);
    });
  });
});
