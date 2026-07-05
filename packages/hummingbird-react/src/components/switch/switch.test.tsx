import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch, switchVariants } from './switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders a native checkbox with role switch', () => {
      render(<Switch aria-label="Notifications" />);
      const toggle = screen.getByRole('switch', { name: /notifications/i });
      expect(toggle).toBeInTheDocument();
      expect(toggle).toBeInstanceOf(HTMLInputElement);
      expect(toggle).toHaveAttribute('type', 'checkbox');
      expect(toggle).toHaveAttribute('role', 'switch');
    });

    it('sets the data-slot attribute', () => {
      render(<Switch aria-label="Notifications" />);
      expect(screen.getByRole('switch')).toHaveAttribute('data-slot', 'switch');
    });

    it('renders the label text when label is provided', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
      expect(screen.getByRole('switch', { name: /enable notifications/i })).toBeInTheDocument();
    });

    it('is off by default', () => {
      render(<Switch aria-label="Notifications" />);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('supports defaultChecked', () => {
      render(<Switch aria-label="Notifications" defaultChecked />);
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });

  describe('Structure & classes', () => {
    it('wraps a label-less switch in a form-switch form-check span', () => {
      render(<Switch aria-label="Bare" />);
      const wrapper = screen.getByRole('switch').parentElement as HTMLElement;
      expect(wrapper.tagName).toBe('SPAN');
      expect(wrapper).toHaveClass('form-switch', 'form-check');
      expect(wrapper).toHaveAttribute('data-slot', 'form-check');
    });

    it('wraps a labeled switch in a form-switch form-check label element', () => {
      render(<Switch label="Labeled" />);
      const wrapper = screen.getByText('Labeled').closest('label') as HTMLLabelElement;
      expect(wrapper).toHaveClass('form-switch', 'form-check');
      expect(wrapper).toHaveAttribute('data-slot', 'form-check');
    });

    it('renders the label text in a form-check-label span', () => {
      render(<Switch label="Labeled" />);
      const text = screen.getByText('Labeled');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('form-check-label');
    });

    it('applies form-check-inline instead of form-check when inline', () => {
      render(<Switch label="Inline" inline />);
      const wrapper = screen.getByText('Inline').closest('label') as HTMLLabelElement;
      expect(wrapper).toHaveClass('form-switch', 'form-check-inline');
      expect(wrapper).not.toHaveClass('form-check');
    });

    it('applies form-check-inline on the label-less span wrapper when inline', () => {
      render(<Switch aria-label="Inline bare" inline />);
      const wrapper = screen.getByRole('switch').parentElement as HTMLElement;
      expect(wrapper).toHaveClass('form-switch', 'form-check-inline');
      expect(wrapper).not.toHaveClass('form-check');
    });

    it('applies the base form-check-input class to the input', () => {
      render(<Switch aria-label="Base" />);
      expect(screen.getByRole('switch')).toHaveClass('form-check-input');
    });
  });

  describe('Colors', () => {
    const colors = [
      'primary',
      'secondary',
      'success',
      'info',
      'warning',
      'danger',
      'neutral',
    ] as const;

    it('applies color classes correctly', () => {
      colors.forEach((color) => {
        const { unmount } = render(<Switch aria-label={color} color={color} />);
        const toggle = screen.getByRole('switch', { name: color });
        expect(toggle).toHaveClass('form-check-input');
        if (color !== 'primary') {
          expect(toggle).toHaveClass(`form-check-${color}`);
        } else {
          // Primary is the default and adds no extra class
          expect(toggle.className.trim()).toBe('form-check-input');
        }
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Switch aria-label={size} size={size} />);
        const toggle = screen.getByRole('switch', { name: size });
        expect(toggle).toHaveClass('form-check-input');
        if (size !== 'md') {
          expect(toggle).toHaveClass(`form-check-${size}`);
        } else {
          // Medium is the default and adds no extra class
          expect(toggle.className.trim()).toBe('form-check-input');
        }
        unmount();
      });
    });

    it('combines color and size classes', () => {
      render(<Switch aria-label="combo" color="danger" size="lg" />);
      const toggle = screen.getByRole('switch', { name: 'combo' });
      expect(toggle).toHaveClass('form-check-input', 'form-check-danger', 'form-check-lg');
    });
  });

  describe('Interactions', () => {
    it('toggles when clicked (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" />);
      const toggle = screen.getByRole('switch');

      await user.click(toggle);
      expect(toggle).toBeChecked();

      await user.click(toggle);
      expect(toggle).not.toBeChecked();
    });

    it('fires onChange with the new checked state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" onChange={handleChange} />);

      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledOnce();
      expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
    });

    it('toggles when the label text is clicked', async () => {
      const user = userEvent.setup();
      render(<Switch label="Dark mode" />);

      await user.click(screen.getByText('Dark mode'));
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('supports controlled checked state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Switch aria-label="Toggle" checked={false} onChange={handleChange} />
      );
      const toggle = screen.getByRole('switch');

      await user.click(toggle);
      expect(handleChange).toHaveBeenCalledOnce();
      // Controlled: stays off until the prop changes
      expect(toggle).not.toBeChecked();

      rerender(<Switch aria-label="Toggle" checked onChange={handleChange} />);
      expect(toggle).toBeChecked();
    });

    it('supports disabled state and does not fire onChange', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" disabled onChange={handleChange} />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toBeDisabled();
      await user.click(toggle);
      expect(handleChange).not.toHaveBeenCalled();
      expect(toggle).not.toBeChecked();
    });

    it('supports the required attribute', () => {
      render(<Switch aria-label="Toggle" required />);
      expect(screen.getByRole('switch')).toBeRequired();
    });

    it('submits name/value with form data when on', () => {
      render(
        <form data-testid="form">
          <Switch aria-label="Toggle" name="notifications" value="on" defaultChecked />
        </form>
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      const data = new FormData(form);
      expect(data.get('notifications')).toBe('on');
    });

    it('omits name/value from form data when off', () => {
      render(
        <form data-testid="form">
          <Switch aria-label="Toggle" name="notifications" value="on" />
        </form>
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      const data = new FormData(form);
      expect(data.get('notifications')).toBeNull();
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with variant classes', () => {
      render(<Switch aria-label="Custom" color="success" className="custom-class" />);
      expect(screen.getByRole('switch')).toHaveClass(
        'form-check-input',
        'form-check-success',
        'custom-class'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch aria-label="Ref" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('allows reading input state via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch aria-label="Ref" ref={ref} defaultChecked disabled />);
      expect(ref.current?.checked).toBe(true);
      expect(ref.current?.disabled).toBe(true);
      expect(ref.current?.className).toContain('form-check-input');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Switch.displayName).toBe('Switch');
    });
  });

  describe('Accessibility', () => {
    it('exposes the switch role and checked state', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="State" />);

      expect(screen.getByRole('switch', { checked: false })).toBeInTheDocument();
      await user.click(screen.getByRole('switch'));
      expect(screen.getByRole('switch', { checked: true })).toBeInTheDocument();
    });

    it('toggles with the Space key', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Space" />);
      const toggle = screen.getByRole('switch');

      toggle.focus();
      await user.keyboard(' ');
      expect(toggle).toBeChecked();

      await user.keyboard(' ');
      expect(toggle).not.toBeChecked();
    });

    it('is reachable via keyboard tab', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Tab" />);

      await user.tab();
      expect(screen.getByRole('switch')).toHaveFocus();
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Enable dark mode" />);
      expect(screen.getByLabelText('Enable dark mode')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Switch aria-label="Toggle" aria-describedby="help" />
          <span id="help">Turns notifications on</span>
        </>
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-describedby', 'help');
    });

    it('associates the visible label with the input', () => {
      render(<Switch label="Auto save" />);
      expect(screen.getByRole('switch', { name: 'Auto save' })).toBeInTheDocument();
    });
  });
});

describe('switchVariants', () => {
  it('generates the base class by default', () => {
    const classes = switchVariants();
    expect(classes).toContain('form-check-input');
  });

  it('generates color classes', () => {
    const colorTests = [
      { color: 'primary' as const, expected: '' }, // default, no class
      { color: 'secondary' as const, expected: 'form-check-secondary' },
      { color: 'success' as const, expected: 'form-check-success' },
      { color: 'info' as const, expected: 'form-check-info' },
      { color: 'warning' as const, expected: 'form-check-warning' },
      { color: 'danger' as const, expected: 'form-check-danger' },
      { color: 'neutral' as const, expected: 'form-check-neutral' },
    ];

    colorTests.forEach(({ color, expected }) => {
      const classes = switchVariants({ color });
      expect(classes).toContain('form-check-input');
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates size classes', () => {
    expect(switchVariants({ size: 'sm' })).toContain('form-check-sm');
    expect(switchVariants({ size: 'md' })).toBe('form-check-input'); // default, no class
    expect(switchVariants({ size: 'lg' })).toContain('form-check-lg');
  });

  it('combines color and size', () => {
    const classes = switchVariants({ color: 'warning', size: 'sm' });
    expect(classes).toContain('form-check-input');
    expect(classes).toContain('form-check-warning');
    expect(classes).toContain('form-check-sm');
  });
});
