import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';

function Example(props: React.ComponentProps<typeof Collapsible>) {
  const { children, ...rootProps } = props;
  return (
    <Collapsible {...rootProps}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Panel content</CollapsibleContent>
      {children}
    </Collapsible>
  );
}

describe('Collapsible', () => {
  describe('Rendering', () => {
    it('renders the root and trigger', () => {
      render(<Example />);
      expect(document.querySelector('[data-slot="collapsible"]')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
    });

    it('keeps the content closed by default', () => {
      render(<Example />);
      expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
    });

    it('shows the content when defaultOpen', () => {
      render(<Example defaultOpen />);
      expect(screen.getByText('Panel content')).toBeInTheDocument();
    });

    it('opens on trigger click and closes on a second click', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const trigger = screen.getByRole('button', { name: 'Toggle' });

      await user.click(trigger);
      expect(await screen.findByText('Panel content')).toBeInTheDocument();

      await user.click(trigger);
      await waitFor(() => expect(screen.queryByText('Panel content')).not.toBeInTheDocument());
    });
  });

  describe('Structure & classes', () => {
    it('marks the parts with data-slot attributes', () => {
      render(<Example defaultOpen />);
      expect(document.querySelector('[data-slot="collapsible"]')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute(
        'data-slot',
        'collapsible-trigger'
      );
      expect(document.querySelector('[data-slot="collapsible-content"]')).toBeInTheDocument();
    });

    it('applies the overflow and animation utilities to the content', () => {
      render(<Example defaultOpen />);
      const content = document.querySelector('[data-slot="collapsible-content"]') as HTMLElement;
      expect(content).toHaveClass(
        'overflow-hidden',
        'data-[state=open]:animate-collapsible-down',
        'data-[state=closed]:animate-collapsible-up'
      );
    });

    it('adds no styling classes to the root or trigger', () => {
      render(<Example defaultOpen />);
      const root = document.querySelector('[data-slot="collapsible"]') as HTMLElement;
      const trigger = screen.getByRole('button', { name: 'Toggle' });
      expect(root.className).toBe('');
      expect(trigger.className).toBe('');
    });

    it('exposes Radix data-state on root, trigger, and content', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const root = document.querySelector('[data-slot="collapsible"]') as HTMLElement;
      const trigger = screen.getByRole('button', { name: 'Toggle' });
      expect(root).toHaveAttribute('data-state', 'closed');
      expect(trigger).toHaveAttribute('data-state', 'closed');

      await user.click(trigger);
      expect(root).toHaveAttribute('data-state', 'open');
      expect(trigger).toHaveAttribute('data-state', 'open');
      expect(document.querySelector('[data-slot="collapsible-content"]')).toHaveAttribute(
        'data-state',
        'open'
      );
    });
  });

  describe('Interactions', () => {
    it('fires onOpenChange with the next state', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(<Example onOpenChange={onOpenChange} />);
      const trigger = screen.getByRole('button', { name: 'Toggle' });

      await user.click(trigger);
      expect(onOpenChange).toHaveBeenLastCalledWith(true);

      await user.click(trigger);
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it('supports controlled open', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);
      expect(screen.queryByText('Panel content')).not.toBeInTheDocument();

      // Clicking reports the change but the panel stays closed until the
      // controlled prop is updated.
      await user.click(screen.getByRole('button', { name: 'Toggle' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByText('Panel content')).not.toBeInTheDocument();

      rerender(<Example open onOpenChange={onOpenChange} />);
      expect(await screen.findByText('Panel content')).toBeInTheDocument();
    });

    it('does not toggle when disabled', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(<Example disabled onOpenChange={onOpenChange} />);
      const trigger = screen.getByRole('button', { name: 'Toggle' });
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute('data-disabled');

      await user.click(trigger);
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
    });
  });

  describe('Class Merging', () => {
    it('merges className on the content with the animation utilities', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent className="custom-content">Panel content</CollapsibleContent>
        </Collapsible>
      );
      const content = document.querySelector('[data-slot="collapsible-content"]') as HTMLElement;
      expect(content).toHaveClass('overflow-hidden', 'custom-content');
    });

    it('passes className through on the root and trigger', () => {
      render(
        <Collapsible className="custom-root">
          <CollapsibleTrigger className="custom-trigger">Toggle</CollapsibleTrigger>
          <CollapsibleContent>Panel content</CollapsibleContent>
        </Collapsible>
      );
      expect(document.querySelector('[data-slot="collapsible"]')).toHaveClass('custom-root');
      expect(screen.getByRole('button', { name: 'Toggle' })).toHaveClass('custom-trigger');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards refs to the underlying elements', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const triggerRef = React.createRef<HTMLButtonElement>();
      const contentRef = React.createRef<HTMLDivElement>();
      render(
        <Collapsible defaultOpen ref={rootRef}>
          <CollapsibleTrigger ref={triggerRef}>Toggle</CollapsibleTrigger>
          <CollapsibleContent ref={contentRef}>Panel content</CollapsibleContent>
        </Collapsible>
      );
      expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(triggerRef.current?.textContent).toBe('Toggle');
      expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('asChild', () => {
    it('renders the trigger as the supplied child', async () => {
      const user = userEvent.setup();
      render(
        <Collapsible>
          <CollapsibleTrigger asChild>
            <button type="button" className="custom-btn">
              Custom toggle
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>Panel content</CollapsibleContent>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: 'Custom toggle' });
      expect(trigger).toHaveClass('custom-btn');
      expect(trigger).toHaveAttribute('data-slot', 'collapsible-trigger');

      await user.click(trigger);
      expect(await screen.findByText('Panel content')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it.each([
      [Collapsible, 'Collapsible'],
      [CollapsibleTrigger, 'CollapsibleTrigger'],
      [CollapsibleContent, 'CollapsibleContent'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('toggles aria-expanded on the trigger', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const trigger = screen.getByRole('button', { name: 'Toggle' });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('wires trigger aria-controls to the content id', () => {
      render(<Example defaultOpen />);
      const trigger = screen.getByRole('button', { name: 'Toggle' });
      const content = document.querySelector('[data-slot="collapsible-content"]') as HTMLElement;
      expect(trigger).toHaveAttribute('aria-controls', content.id);
    });

    it('toggles with the keyboard', async () => {
      const user = userEvent.setup();
      render(<Example />);
      const trigger = screen.getByRole('button', { name: 'Toggle' });

      trigger.focus();
      await user.keyboard('{Enter}');
      expect(await screen.findByText('Panel content')).toBeInTheDocument();

      await user.keyboard(' ');
      await waitFor(() => expect(screen.queryByText('Panel content')).not.toBeInTheDocument());
    });
  });
});
