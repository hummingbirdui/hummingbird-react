import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker, datePickerTriggerVariants } from './date-picker';
import { Popover } from '../popover';

function Example(
  props: React.ComponentProps<typeof DatePicker> & {
    triggerProps?: DatePicker.TriggerProps;
    contentChildren?: React.ReactNode;
  }
) {
  const { triggerProps, contentChildren = <span>Panel</span>, ...rootProps } = props;
  return (
    <DatePicker {...rootProps}>
      <DatePicker.Trigger placeholder="Pick a date" {...triggerProps} />
      <DatePicker.Content>{contentChildren}</DatePicker.Content>
    </DatePicker>
  );
}

async function openDatePicker(ui: React.ReactElement) {
  const user = userEvent.setup();
  render(ui);
  await user.click(screen.getByRole('button'));
  const content = await waitFor(
    () => document.querySelector('[data-slot="popover-content"]') as HTMLElement
  );
  return { user, content };
}

describe('DatePicker', () => {
  describe('Rendering', () => {
    it('renders the trigger as a type="button" with the input-look classes', () => {
      render(<Example />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('type', 'button');
      expect(trigger).toHaveClass('form-control', 'date-picker-trigger');
      expect(trigger).toHaveAttribute('data-slot', 'date-picker-trigger');
    });

    it('shows the placeholder with data attributes while empty', () => {
      render(<Example />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('data-empty');
      const value = trigger.querySelector('[data-slot="date-picker-value"]') as HTMLElement;
      expect(value).toHaveAttribute('data-placeholder');
      expect(value).toHaveTextContent('Pick a date');
    });

    it('shows children as the value without placeholder attributes', () => {
      render(<Example triggerProps={{ children: 'June 01, 2025' }} />);
      const trigger = screen.getByRole('button');
      expect(trigger).not.toHaveAttribute('data-empty');
      const value = trigger.querySelector('[data-slot="date-picker-value"]') as HTMLElement;
      expect(value).not.toHaveAttribute('data-placeholder');
      expect(value).toHaveTextContent('June 01, 2025');
    });

    it('renders the default calendar icon', () => {
      render(<Example />);
      const icon = screen
        .getByRole('button')
        .querySelector('[data-slot="date-picker-icon"]') as HTMLElement;
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon.querySelector('svg')).toBeInTheDocument();
    });

    it('renders no icon when icon is null', () => {
      render(<Example triggerProps={{ icon: null }} />);
      expect(
        screen.getByRole('button').querySelector('[data-slot="date-picker-icon"]')
      ).not.toBeInTheDocument();
    });

    it('renders a custom icon node', () => {
      render(<Example triggerProps={{ icon: <em data-testid="custom-icon" /> }} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('is closed by default', () => {
      render(<Example />);
      expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('opens when the trigger is clicked', async () => {
      const { content } = await openDatePicker(<Example />);
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-state', 'open');
    });

    it('closes on Escape and returns focus to the trigger', async () => {
      const { user } = await openDatePicker(<Example />);
      await user.keyboard('{Escape}');
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument()
      );
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('supports controlled open state', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);
      expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));
      expect(onOpenChange).toHaveBeenCalledWith(true);

      rerender(<Example open onOpenChange={onOpenChange} />);
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).toBeInTheDocument()
      );
    });

    it('does not open when the trigger is disabled', async () => {
      const user = userEvent.setup();
      render(<Example triggerProps={{ disabled: true }} />);
      await user.click(screen.getByRole('button'));
      expect(document.querySelector('[data-slot="popover-content"]')).not.toBeInTheDocument();
    });
  });

  describe('Sizes and State', () => {
    it('applies size classes', () => {
      const { rerender } = render(<Example triggerProps={{ size: 'sm' }} />);
      expect(screen.getByRole('button')).toHaveClass('form-control-sm');
      rerender(<Example triggerProps={{ size: 'lg' }} />);
      expect(screen.getByRole('button')).toHaveClass('form-control-lg');
    });

    it('applies validation state and aria-invalid', () => {
      render(<Example triggerProps={{ state: 'invalid' }} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('is-invalid');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies the valid state without aria-invalid', () => {
      render(<Example triggerProps={{ state: 'valid' }} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('is-valid');
      expect(trigger).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Class Merging', () => {
    it('merges custom classes with generated classes', () => {
      render(<Example triggerProps={{ className: 'custom-class' }} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('custom-class', 'form-control', 'date-picker-trigger');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the trigger button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Example triggerProps={{ ref }} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute('data-slot', 'date-picker-trigger');
    });
  });

  describe('asChild Prop', () => {
    it('renders the passed child as the trigger with popover behavior', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker>
          <DatePicker.Trigger asChild>
            <button type="button">Custom trigger</button>
          </DatePicker.Trigger>
          <DatePicker.Content>Panel</DatePicker.Content>
        </DatePicker>
      );
      const trigger = screen.getByRole('button', { name: 'Custom trigger' });
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).not.toHaveClass('form-control');
      await user.click(trigger);
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-content"]')).toBeInTheDocument()
      );
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Display Names', () => {
    it('has correct display names', () => {
      expect(DatePicker.displayName).toBe('DatePicker');
      expect(DatePicker.Trigger.displayName).toBe('DatePicker.Trigger');
      expect(DatePicker.Anchor.displayName).toBe('DatePicker.Anchor');
      expect(DatePicker.Content.displayName).toBe('DatePicker.Content');
    });
  });

  describe('Accessibility', () => {
    it('exposes popover semantics on the trigger', async () => {
      const { user } = await openDatePicker(<Example />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await user.keyboard('{Escape}');
      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    });

    it('associates with a label through htmlFor', () => {
      render(
        <>
          <label htmlFor="picker">Date</label>
          <Example triggerProps={{ id: 'picker' }} />
        </>
      );
      expect(screen.getByLabelText('Date')).toBe(screen.getByRole('button'));
    });

    it('renders no arrow in the content, unlike plain Popover.Content', async () => {
      await openDatePicker(<Example />);
      expect(document.querySelector('[data-slot="popover-arrow"]')).not.toBeInTheDocument();
    });

    it('plain Popover.Content still renders its arrow by default', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Body</Popover.Content>
        </Popover>
      );
      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() =>
        expect(document.querySelector('[data-slot="popover-arrow"]')).toBeInTheDocument()
      );
    });
  });
});

describe('datePickerTriggerVariants', () => {
  it('returns base classes with the default size', () => {
    expect(datePickerTriggerVariants()).toContain('form-control');
    expect(datePickerTriggerVariants()).toContain('date-picker-trigger');
  });

  it('maps sizes to form-control size classes', () => {
    expect(datePickerTriggerVariants({ size: 'sm' })).toContain('form-control-sm');
    expect(datePickerTriggerVariants({ size: 'lg' })).toContain('form-control-lg');
  });

  it('maps state to validation classes', () => {
    expect(datePickerTriggerVariants({ state: 'valid' })).toContain('is-valid');
    expect(datePickerTriggerVariants({ state: 'invalid' })).toContain('is-invalid');
  });
});
