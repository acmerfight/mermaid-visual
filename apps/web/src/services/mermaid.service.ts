/**
 * Mermaid Service
 * Encapsulates all Mermaid.js rendering logic with proper state management
 */

import mermaid from 'mermaid';
import type { RenderResult } from '../types/editor.types';
import { MERMAID_THEME_CONFIG } from '../constants/editor.constants';

/**
 * MermaidService class handles all Mermaid diagram rendering operations
 * Uses singleton pattern to ensure single initialization
 */
class MermaidServiceClass {
  private initialized = false;
  private renderCounter = 0;

  /**
   * Initialize Mermaid with custom theme configuration
   */
  initialize(): void {
    if (this.initialized) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: MERMAID_THEME_CONFIG,
      securityLevel: 'loose',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 16,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        padding: 15,
        nodeSpacing: 50,
        rankSpacing: 50,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
        useMaxWidth: true,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35,
        fontSize: 11,
        numberSectionStyles: 4,
        axisFormat: '%Y-%m-%d',
      },
    });

    this.initialized = true;
  }

  /**
   * Generate a unique render ID to prevent race conditions
   */
  generateRenderId(): string {
    this.renderCounter += 1;
    return `mermaid-diagram-${this.renderCounter}-${Date.now()}`;
  }

  /**
   * Render Mermaid code to SVG
   * @param code - The Mermaid diagram code
   * @returns RenderResult with success status and SVG or error
   */
  async render(code: string): Promise<RenderResult> {
    try {
      this.initialize();
      const id = this.generateRenderId();
      const { svg } = await mermaid.render(id, code);
      return { success: true, svg };
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown rendering error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Validate Mermaid code without rendering
   * @param code - The Mermaid diagram code to validate
   * @returns RenderResult with success status
   */
  async validate(code: string): Promise<RenderResult> {
    try {
      this.initialize();
      await mermaid.parse(code);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Invalid Mermaid syntax';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Reset the service state (useful for testing)
   */
  reset(): void {
    this.initialized = false;
    this.renderCounter = 0;
  }
}

// Export singleton instance
export const MermaidService = new MermaidServiceClass();

// Export class for testing purposes
export { MermaidServiceClass };

