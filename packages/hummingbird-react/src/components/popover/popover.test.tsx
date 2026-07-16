import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from './popover';

// A complete popover used across the behavioral tests. Props forward to the
// Radix root so open state can be exercised.
function Example(
  props: React.ComponentProps<typeof Popover> & { triggerLabel?: string }
) {
  const { triggerLabel = 'Open', children, ...rootProps } = props;
  return (
    <Popover {...rootProps}>
      <PopoverTrigger>{triggerLabel}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Title</PopoverHeader>
        <PopoverBody>
          <span>Body</span>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

// Opens the popover via its trigger and resolves once the content is on screen.
async function openPopover(ui: React.ReactElement) {
  const user = userEvent.setup();
  render(ui);
  await user.click(screen.getByRole('button', { name: /^open$/i }));
  const content = await waitFor(
    () => document.querySelector('[data-slot="popover-content"]') as HTMLElement
  );
  return { user, content };
}

describe('Popover', () => {
  describe('Rendering', () => {
    it('renders the trigger', () => {
      render(<Example triggerLabel="Open popover" />);
      expect(screen.getByRole('button', { name: /open popover/i })).toBeInTheDocument();
    });

    it('is closed by default', () => {
      render(<Example />);
      expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
    });

    it('opens when the trigger is clicked', async () => {
      const { content } = await openPopover(<Example />);
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-state', 'open');
    });

    it('renders the supplied content parts', async () => {
      await openPopover(
        <Example>
          <span>extra body content</span>
        </Example>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('extra body content')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies the popover panel class to the content', async () => {
      const { content } = await openPopover(<Example />);
      expect(content).toHaveClass('popover');
    });

    it('renders a bordered arrow using the popover tokens', async () => {
      await openPopover(<Example />);
      const arrow = document.querySelector('[data-slot="popover-arrow"]') as HTMLElement;
      expect(arrow).toBeInTheDocument();
      const [borderTriangle, bgTriangle] = Array.from(arrow.querySelectorAll('span'));
      expect(borderTriangle).toHaveClass('border-t-[color:var(--popover-arrow-border-color)]');
      expect(bgTriangle).toHaveClass('border-t-[color:var(--popover-bg)]');
    });

    it('applies the popover header/body classes', async () => {
      await openPopover(<Example />);
      expect(document.querySelector('[data-slot="popover-header"]')).toHaveClass('popover-header');
      expect(document.querySelector('[data-slot="popover-body"]')).toHaveClass('popover-body');
    });
  });

  describe('Interactions', () => {
    it('closes when a PopoverClose is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverClose>Dismiss</PopoverClose>
          </PopoverContent>
        </Popover>
      );
      await user.click(screen.getByRole('button', { name: /^open$/i }));
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).toBeInTheDocument()
      );
      await user.click(screen.getByRole('button', { name: /dismiss/i }));
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument()
      );
    });

    it('closes on Escape', async () => {
      const { user } = await openPopover(<Example />);
      await user.keyboard('{Escape}');
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument()
      );
    });

    it('fires onOpenChange', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(<Example onOpenChange={onOpenChange} />);
      await user.click(screen.getByRole('button', { name: /^open$/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled open', async () => {
      const { rerender } = render(<Example open={false} />);
      expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
      rerender(<Example open />);
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).toBeInTheDocument()
      );
    });
  });

  describe('Class Merging', () => {
    it('merges className onto the content panel', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent className="custom-panel">
            <PopoverBody>Body</PopoverBody>
          </PopoverContent>
        </Popover>
      );
      await user.click(screen.getByRole('button', { name: /^open$/i }));
      const content = await waitFor(
        () => document.querySelector('[data-slot="popover-content"]') as HTMLElement
      );
      expect(content).toHaveClass('popover', 'custom-panel');
    });
  });

  describe('Anchor', () => {
    it('positions against a PopoverAnchor', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverAnchor>
            <span>anchor</span>
          </PopoverAnchor>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverBody>Anchored</PopoverBody>
          </PopoverContent>
        </Popover>
      );
      await user.click(screen.getByRole('button', { name: /^open$/i }));
      expect(await screen.findByText('Anchored')).toBeInTheDocument();
      expect(document.querySelector('[data-slot="popover-anchor"]')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it.each([
      [Popover, 'Popover'],
      [PopoverTrigger, 'PopoverTrigger'],
      [PopoverAnchor, 'PopoverAnchor'],
      [PopoverClose, 'PopoverClose'],
      [PopoverContent, 'PopoverContent'],
      [PopoverHeader, 'PopoverHeader'],
      [PopoverBody, 'PopoverBody'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('wires aria-expanded on the trigger', async () => {
      render(<Example />);
      const trigger = screen.getByRole('button', { name: /^open$/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await userEvent.setup().click(trigger);
      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    });
  });
});
