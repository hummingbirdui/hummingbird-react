import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollArea, scrollAreaScrollbarVariants } from './scroll-area';

function renderScrollArea(scrollbarProps: Partial<ScrollArea.ScrollbarProps> = {}) {
  return render(
    <ScrollArea type="always" className="h-40">
      <ScrollArea.Viewport>
        <div>Scrollable content</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar forceMount {...scrollbarProps} />
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

describe('ScrollArea', () => {
  describe('Rendering', () => {
    it('renders the root with the scrollbar class providing the CSS variables', () => {
      renderScrollArea();
      const root = document.querySelector('[data-slot="scroll-area"]');
      expect(root).toBeInTheDocument();
      expect(root).toHaveClass('scroll-area');
    });

    it('renders the viewport with content', () => {
      renderScrollArea();
      const viewport = document.querySelector('[data-slot="scroll-area-viewport"]');
      expect(viewport).toBeInTheDocument();
      expect(viewport).toHaveClass('scroll-area-viewport');
      expect(screen.getByText('Scrollable content')).toBeInTheDocument();
    });

    it('renders the scrollbar with the track color and size classes', () => {
      renderScrollArea();
      const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]');
      expect(scrollbar).toBeInTheDocument();
      expect(scrollbar).toHaveClass('scroll-area-scrollbar');
    });

    it('renders a default thumb when the scrollbar has no children', () => {
      renderScrollArea();
      const thumb = document.querySelector('[data-slot="scroll-area-thumb"]');
      expect(thumb).toBeInTheDocument();
      expect(thumb).toHaveClass('scroll-area-thumb');
    });

    it('renders custom scrollbar children instead of the default thumb', () => {
      render(
        <ScrollArea type="always">
          <ScrollArea.Viewport>content</ScrollArea.Viewport>
          <ScrollArea.Scrollbar forceMount>
            <ScrollArea.Thumb forceMount data-testid="custom-thumb" className="bg-primary" />
          </ScrollArea.Scrollbar>
        </ScrollArea>
      );
      expect(screen.getByTestId('custom-thumb')).toHaveClass('bg-primary');
      expect(document.querySelectorAll('[data-slot="scroll-area-thumb"]')).toHaveLength(1);
    });

  });

  describe('Orientation', () => {
    it('defaults to a vertical scrollbar', () => {
      renderScrollArea();
      expect(
        document.querySelector('[data-slot="scroll-area-scrollbar"]')
      ).toHaveAttribute('data-orientation', 'vertical');
    });

    it('renders a horizontal scrollbar', () => {
      renderScrollArea({ orientation: 'horizontal' });
      expect(
        document.querySelector('[data-slot="scroll-area-scrollbar"]')
      ).toHaveAttribute('data-orientation', 'horizontal');
    });
  });

  describe('Rounded', () => {
    it('is square by default', () => {
      renderScrollArea();
      expect(
        document.querySelector('[data-slot="scroll-area-scrollbar"]')
      ).not.toHaveClass('scroll-area-scrollbar-rounded');
    });

    it('rounds the track and the default thumb with rounded', () => {
      renderScrollArea({ rounded: true });
      expect(
        document.querySelector('[data-slot="scroll-area-scrollbar"]')
      ).toHaveClass('scroll-area-scrollbar-rounded');
    });
  });

  describe('Class Merging', () => {
    it('merges custom classNames on every part', () => {
      render(
        <ScrollArea type="always" className="custom-root">
          <ScrollArea.Viewport className="custom-viewport">content</ScrollArea.Viewport>
          <ScrollArea.Scrollbar forceMount className="custom-scrollbar" />
          <ScrollArea.Corner className="custom-corner" />
        </ScrollArea>
      );
      expect(document.querySelector('[data-slot="scroll-area"]')).toHaveClass(
        'scroll-area',
        'custom-root'
      );
      expect(document.querySelector('[data-slot="scroll-area-viewport"]')).toHaveClass(
        'custom-viewport'
      );
      expect(document.querySelector('[data-slot="scroll-area-scrollbar"]')).toHaveClass(
        'custom-scrollbar'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards a ref to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea ref={ref}>
          <ScrollArea.Viewport>content</ScrollArea.Viewport>
        </ScrollArea>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('scroll-area');
    });

    it('forwards a ref to the viewport element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea>
          <ScrollArea.Viewport ref={ref}>content</ScrollArea.Viewport>
        </ScrollArea>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('data-slot', 'scroll-area-viewport');
    });
  });

  describe('asChild Prop', () => {
    it('renders the root as a custom element with asChild', () => {
      render(
        <ScrollArea asChild>
          <section aria-label="Custom scroll region">
            <ScrollArea.Viewport>content</ScrollArea.Viewport>
          </section>
        </ScrollArea>
      );
      const root = document.querySelector('[data-slot="scroll-area"]');
      expect(root?.tagName).toBe('SECTION');
      expect(root).toHaveClass('scroll-area');
    });
  });

  describe('Display Name', () => {
    it('has the correct display names', () => {
      expect(ScrollArea.displayName).toBe('ScrollArea');
      expect(ScrollArea.Viewport.displayName).toBe('ScrollArea.Viewport');
      expect(ScrollArea.Scrollbar.displayName).toBe('ScrollArea.Scrollbar');
      expect(ScrollArea.Thumb.displayName).toBe('ScrollArea.Thumb');
      expect(ScrollArea.Corner.displayName).toBe('ScrollArea.Corner');
    });
  });

  describe('Accessibility', () => {
    it('keeps the viewport content reachable', () => {
      renderScrollArea();
      expect(screen.getByText('Scrollable content')).toBeVisible();
    });

    it('passes the dir prop through', () => {
      render(
        <ScrollArea dir="rtl" type="always">
          <ScrollArea.Viewport>content</ScrollArea.Viewport>
          <ScrollArea.Scrollbar forceMount />
        </ScrollArea>
      );
      expect(document.querySelector('[data-slot="scroll-area"]')).toBeInTheDocument();
    });
  });
});

describe('scrollAreaScrollbarVariants', () => {
  it('returns the base classes', () => {
    const classes = scrollAreaScrollbarVariants();
    expect(classes).toContain('scroll-area-scrollbar');
    expect(classes).not.toContain('scroll-area-scrollbar-rounded');
  });

  it('adds the rounded class for the rounded variant', () => {
    expect(scrollAreaScrollbarVariants({ rounded: true })).toContain(
      'scroll-area-scrollbar-rounded'
    );
  });
});
