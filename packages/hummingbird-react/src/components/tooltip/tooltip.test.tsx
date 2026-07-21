import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './tooltip';

// A complete tooltip used across the behavioral tests. Props forward to the
// Radix root so timing (`delayDuration`) and open state can be exercised.
function Example(
  props: React.ComponentProps<typeof Tooltip> & { triggerLabel?: string; label?: string }
) {
  const { triggerLabel = 'Hover me', label = 'Tooltip label', children, ...rootProps } = props;
  return (
    <Tooltip {...rootProps}>
      <Tooltip.Trigger>{triggerLabel}</Tooltip.Trigger>
      <Tooltip.Content>
        {label}
        {children}
      </Tooltip.Content>
    </Tooltip>
  );
}

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('renders the trigger', () => {
      render(<Example triggerLabel="Hover target" />);
      expect(screen.getByRole('button', { name: /hover target/i })).toBeInTheDocument();
    });

    it('is closed by default', () => {
      render(<Example />);
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('opens on focus and shows the label', async () => {
      const user = userEvent.setup();
      render(<Example label="Helpful hint" />);
      await user.tab(); // focus the trigger -> Radix opens the tooltip
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
      // Radix also renders a visually-hidden a11y copy, so the label appears twice.
      expect(screen.getAllByText('Helpful hint').length).toBeGreaterThan(0);
    });

    it('opens when controlled via the open prop', async () => {
      render(<Example open label="Controlled hint" />);
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
      expect(screen.getAllByText('Controlled hint').length).toBeGreaterThan(0);
    });
  });

  describe('Structure & classes', () => {
    it('applies the tooltip class and the show resting state', async () => {
      render(<Example open />);
      const content = document.querySelector('[data-slot="tooltip-content"]') as HTMLElement;
      await waitFor(() => expect(content).toBeInTheDocument());
      // `.tooltip` (look) + `.show` (resting visible state); Radix drives the
      // fade via its own `data-state` keyframes.
      expect(content).toHaveClass('tooltip', 'show');
    });

    it('wraps the label in a tooltip-inner bubble', async () => {
      render(<Example open label="Inner text" />);
      const inner = await waitFor(() => document.querySelector('.tooltip-inner') as HTMLElement);
      expect(inner).toHaveTextContent('Inner text');
    });

    it('renders an arrow filled with the tooltip background token', async () => {
      render(<Example open />);
      const arrow = await waitFor(
        () => document.querySelector('[data-slot="tooltip-arrow"]') as HTMLElement
      );
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('fill-[var(--tooltip-bg)]');
    });

    it('reflects data-state on the content', async () => {
      render(<Example open />);
      const content = document.querySelector('[data-slot="tooltip-content"]') as HTMLElement;
      await waitFor(() => expect(content).toHaveAttribute('data-state'));
      expect(content.getAttribute('data-state')).toMatch(/open/);
    });
  });

  describe('Interactions', () => {
    it('closes on Escape', async () => {
      const user = userEvent.setup();
      render(<Example />);
      await user.tab();
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    });

    it('fires onOpenChange', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(<Example onOpenChange={onOpenChange} />);
      await user.tab();
      await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    });
  });

  describe('Class Merging', () => {
    it('merges className onto the content', async () => {
      render(
        <Tooltip open>
          <Tooltip.Trigger>Open</Tooltip.Trigger>
          <Tooltip.Content className="custom-tip">Tip</Tooltip.Content>
        </Tooltip>
      );
      const content = await waitFor(
        () => document.querySelector('[data-slot="tooltip-content"]') as HTMLElement
      );
      expect(content).toHaveClass('tooltip', 'custom-tip');
    });
  });

  describe('Provider', () => {
    it('works under a shared Tooltip.Provider', async () => {
      render(
        <Tooltip.Provider>
          <Tooltip open>
            <Tooltip.Trigger>Open</Tooltip.Trigger>
            <Tooltip.Content>Shared</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      );
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it.each([
      [Tooltip, 'Tooltip'],
      [Tooltip.Provider, 'Tooltip.Provider'],
      [Tooltip.Trigger, 'Tooltip.Trigger'],
      [Tooltip.Content, 'Tooltip.Content'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes the tooltip role', async () => {
      render(<Example open />);
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });

    it('associates the trigger with the tooltip via aria-describedby', async () => {
      const user = userEvent.setup();
      render(<Example label="Described" />);
      await user.tab();
      await screen.findByRole('tooltip');
      const trigger = screen.getByRole('button', { name: /hover me/i });
      expect(trigger).toHaveAttribute('aria-describedby');
    });
  });
});
