/**
 * Mermaid Service
 * Encapsulates all Mermaid.js rendering logic with proper state management
 */

import mermaid from 'mermaid';
import type { RenderResult } from '../types/editor.types';
import type { ThemeConfig } from '../constants/themes.constants';
import { DEFAULT_THEME } from '../constants/themes.constants';

/**
 * MermaidService class handles all Mermaid diagram rendering operations
 * Uses singleton pattern to ensure single initialization
 */
class MermaidServiceClass {
  private initialized = false;
  private renderCounter = 0;
  private currentTheme: ThemeConfig = DEFAULT_THEME;

  /**
   * Initialize Mermaid with theme configuration
   */
  private initializeWithTheme(theme: ThemeConfig): void {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        ...theme.variables,
        // Enhanced styling for better visuals
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '16px',
        // Flowchart specific
        arrowheadColor: theme.variables.lineColor,
        // Additional styling
        noteBkgColor: theme.variables.secondaryColor,
        noteTextColor: theme.variables.primaryTextColor,
        noteBorderColor: theme.variables.primaryBorderColor,
        // Actor styling for sequence diagrams
        actorBorder: theme.variables.primaryBorderColor,
        actorBkg: theme.variables.primaryColor,
        actorTextColor: theme.variables.primaryTextColor,
        actorLineColor: theme.variables.lineColor,
        signalColor: theme.variables.primaryTextColor,
        signalTextColor: theme.variables.primaryTextColor,
        labelBoxBkgColor: theme.variables.primaryColor,
        labelBoxBorderColor: theme.variables.primaryBorderColor,
        labelTextColor: theme.variables.primaryTextColor,
        loopTextColor: theme.variables.primaryTextColor,
        // Gantt specific
        sectionBkgColor: theme.variables.primaryColor,
        altSectionBkgColor: theme.variables.secondaryColor,
        taskBorderColor: theme.variables.primaryBorderColor,
        taskBkgColor: theme.variables.primaryColor,
        taskTextColor: theme.variables.primaryTextColor,
        taskTextLightColor: theme.variables.primaryTextColor,
        taskTextDarkColor: theme.variables.primaryTextColor,
        activeTaskBorderColor: theme.variables.lineColor,
        activeTaskBkgColor: theme.variables.secondaryColor,
        doneTaskBkgColor: theme.variables.tertiaryColor,
        doneTaskBorderColor: theme.variables.primaryBorderColor,
        critBorderColor: '#ef4444',
        critBkgColor: '#fee2e2',
        gridColor: theme.variables.primaryBorderColor + '40',
        todayLineColor: theme.variables.lineColor,
      },
      securityLevel: 'loose',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 16,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        padding: 20,
        nodeSpacing: 60,
        rankSpacing: 60,
        diagramPadding: 20,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 20,
        actorMargin: 60,
        width: 180,
        height: 70,
        boxMargin: 15,
        boxTextMargin: 8,
        noteMargin: 15,
        messageMargin: 40,
        mirrorActors: true,
        useMaxWidth: true,
        wrap: true,
      },
      gantt: {
        titleTopMargin: 30,
        barHeight: 25,
        barGap: 6,
        topPadding: 60,
        leftPadding: 100,
        gridLineStartPadding: 40,
        fontSize: 12,
        numberSectionStyles: 4,
        axisFormat: '%Y-%m-%d',
      },
      er: {
        diagramPadding: 20,
        layoutDirection: 'TB',
        minEntityWidth: 100,
        minEntityHeight: 75,
        entityPadding: 15,
        stroke: theme.variables.primaryBorderColor,
        fill: theme.variables.primaryColor,
      },
      pie: {
        textPosition: 0.75,
      },
      mindmap: {
        padding: 20,
        maxNodeWidth: 200,
      },
    });
  }

  /**
   * Set theme and reinitialize
   */
  setTheme(theme: ThemeConfig): void {
    this.currentTheme = theme;
    this.initialized = false;
  }

  /**
   * Get current theme
   */
  getTheme(): ThemeConfig {
    return this.currentTheme;
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
   * @param theme - Optional theme to use for rendering
   * @returns RenderResult with success status and SVG or error
   */
  async render(code: string, theme?: ThemeConfig): Promise<RenderResult> {
    try {
      const themeToUse = theme || this.currentTheme;
      
      // Reinitialize if theme changed
      if (themeToUse.id !== this.currentTheme.id || !this.initialized) {
        this.currentTheme = themeToUse;
        this.initializeWithTheme(themeToUse);
        this.initialized = true;
      }
      
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
      if (!this.initialized) {
        this.initializeWithTheme(this.currentTheme);
        this.initialized = true;
      }
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
    this.currentTheme = DEFAULT_THEME;
  }
}

// Export singleton instance
export const MermaidService = new MermaidServiceClass();

// Export class for testing purposes
export { MermaidServiceClass };
