import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, checkboxVariants } from './checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders a native checkbox input', () => {
      render(<Checkbox aria-label="Accept" />);
      const checkbox = screen.getByRole('checkbox', { name: /accept/i });
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeInstanceOf(HTMLInputElement);
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('sets the data-slot attribute', () => {
      render(<Checkbox aria-label="Accept" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-slot', 'checkbox');
    });

    it('renders the label text when label is provided', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /accept terms/i })).toBeInTheDocument();
    });

    it('renders label as arbitrary React nodes', () => {
      render(<Checkbox label={<em>Fancy label</em>} />);
      expect(screen.getByText('Fancy label')).toBeInTheDocument();
    });

    it('does not render a label wrapper when label is omitted', () => {
      const { container } = render(<Checkbox aria-label="Bare" />);
      expect(container.querySelector('label')).not.toBeInTheDocument();
      expect(container.querySelector('[data-slot="form-check"]')).not.toBeInTheDocument();
    });

    it('is unchecked by default', () => {
      render(<Checkbox aria-label="Accept" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('supports defaultChecked', () => {
      render(<Checkbox aria-label="Accept" defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('Structure & classes', () => {
    it('wraps the input in a form-check-input-wrapper span', () => {
      render(<Checkbox aria-label="Accept" />);
      const wrapper = screen.getByRole('checkbox').parentElement as HTMLElement;
      expect(wrapper.tagName).toBe('SPAN');
      expect(wrapper).toHaveClass('form-check-input-wrapper');
    });

    it('applies the base form-check-input class to the input', () => {
      render(<Checkbox aria-label="Accept" />);
      expect(screen.getByRole('checkbox')).toHaveClass('form-check-input');
    });

    it('wraps input and label in a form-check label element', () => {
      render(<Checkbox label="Accept" />);
      const label = screen.getByText('Accept').closest('label') as HTMLLabelElement;
      expect(label).toHaveClass('form-check');
      expect(label).toHaveAttribute('data-slot', 'form-check');
    });

    it('renders the label text in a form-check-label span', () => {
      render(<Checkbox label="Accept" />);
      const text = screen.getByText('Accept');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('form-check-label');
    });

    it('applies form-check-inline instead of form-check when inline', () => {
      render(<Checkbox label="Inline" inline />);
      const label = screen.getByText('Inline').closest('label') as HTMLLabelElement;
      expect(label).toHaveClass('form-check-inline');
      expect(label).not.toHaveClass('form-check');
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
        const { unmount } = render(<Checkbox aria-label={color} color={color} />);
        const checkbox = screen.getByRole('checkbox', { name: color });
        expect(checkbox).toHaveClass('form-check-input');
        if (color !== 'primary') {
          expect(checkbox).toHaveClass(`form-check-${color}`);
        } else {
          // Primary is the default and adds no extra class
          expect(checkbox.className.trim()).toBe('form-check-input');
        }
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Checkbox aria-label={size} size={size} />);
        const checkbox = screen.getByRole('checkbox', { name: size });
        expect(checkbox).toHaveClass('form-check-input');
        if (size !== 'sm') {
          expect(checkbox).toHaveClass(`form-check-${size}`);
        } else {
          // Small is the default and adds no extra class
          expect(checkbox.className.trim()).toBe('form-check-input');
        }
        unmount();
      });
    });

    it('combines color and size classes', () => {
      render(<Checkbox aria-label="combo" color="success" size="lg" />);
      const checkbox = screen.getByRole('checkbox', { name: 'combo' });
      expect(checkbox).toHaveClass('form-check-input', 'form-check-success', 'form-check-lg');
    });
  });

  describe('Interactions', () => {
    it('toggles when clicked (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="Accept" />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('fires onChange with the new checked state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox aria-label="Accept" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledOnce();
      expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
    });

    it('toggles when the label text is clicked', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Accept terms" />);

      await user.click(screen.getByText('Accept terms'));
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('supports controlled checked state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Checkbox aria-label="Accept" checked={false} onChange={handleChange} />
      );
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledOnce();
      // Controlled: stays unchecked until the prop changes
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox aria-label="Accept" checked onChange={handleChange} />);
      expect(checkbox).toBeChecked();
    });

    it('supports disabled state', () => {
      render(<Checkbox aria-label="Accept" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('does not toggle or fire onChange when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox aria-label="Accept" disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox).not.toBeChecked();
    });

    it('supports the required attribute', () => {
      render(<Checkbox aria-label="Accept" required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });

    it('submits name/value with form data when checked', () => {
      render(
        <form data-testid="form">
          <Checkbox aria-label="Terms" name="terms" value="accepted" defaultChecked />
        </form>
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      const data = new FormData(form);
      expect(data.get('terms')).toBe('accepted');
    });

    it('omits name/value from form data when unchecked', () => {
      render(
        <form data-testid="form">
          <Checkbox aria-label="Terms" name="terms" value="accepted" />
        </form>
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      const data = new FormData(form);
      expect(data.get('terms')).toBeNull();
    });
  });

  describe('Indeterminate', () => {
    it('sets the indeterminate DOM property', () => {
      render(<Checkbox aria-label="Mixed" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('exposes aria-checked="mixed" when indeterminate', () => {
      render(<Checkbox aria-label="Mixed" indeterminate />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
      expect(screen.getByRole('checkbox')).toBePartiallyChecked();
    });

    it('does not set aria-checked when not indeterminate', () => {
      render(<Checkbox aria-label="Plain" />);
      expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-checked');
    });

    it('clears the indeterminate property when the prop turns off', () => {
      const { rerender } = render(<Checkbox aria-label="Mixed" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);

      rerender(<Checkbox aria-label="Mixed" indeterminate={false} />);
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox).not.toHaveAttribute('aria-checked');
    });
  });

  describe('Class Merging', () => {
    it('always includes the base form-check-input class', () => {
      render(<Checkbox aria-label="Base" />);
      expect(screen.getByRole('checkbox')).toHaveClass('form-check-input');
    });

    it('merges custom className with variant classes', () => {
      render(<Checkbox aria-label="Custom" color="danger" className="custom-class" />);
      expect(screen.getByRole('checkbox')).toHaveClass(
        'form-check-input',
        'form-check-danger',
        'custom-class'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards an object ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox aria-label="Ref" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('forwards a callback ref to the input element', () => {
      let node: HTMLInputElement | null = null;
      render(
        <Checkbox
          aria-label="Ref"
          ref={(el) => {
            node = el;
          }}
        />
      );
      expect(node).toBeInstanceOf(HTMLInputElement);
    });

    it('allows reading input state via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox aria-label="Ref" ref={ref} defaultChecked disabled />);
      expect(ref.current?.checked).toBe(true);
      expect(ref.current?.disabled).toBe(true);
      expect(ref.current?.className).toContain('form-check-input');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Checkbox.displayName).toBe('Checkbox');
    });
  });

  describe('Accessibility', () => {
    it('has the checkbox role', () => {
      render(<Checkbox aria-label="Role" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('toggles with the Space key', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="Space" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      await user.keyboard(' ');
      expect(checkbox).toBeChecked();

      await user.keyboard(' ');
      expect(checkbox).not.toBeChecked();
    });

    it('is reachable via keyboard tab', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="Tab" />);

      await user.tab();
      expect(screen.getByRole('checkbox')).toHaveFocus();
    });

    it('supports aria-label', () => {
      render(<Checkbox aria-label="Close notifications" />);
      expect(screen.getByLabelText('Close notifications')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Checkbox aria-label="Terms" aria-describedby="help" />
          <span id="help">Required to continue</span>
        </>
      );
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', 'help');
    });

    it('associates the visible label with the input', () => {
      render(<Checkbox label="Subscribe" />);
      // The input lives inside the label element, so the label is implicit.
      expect(screen.getByRole('checkbox', { name: 'Subscribe' })).toBeInTheDocument();
    });
  });
});

describe('checkboxVariants', () => {
  it('generates the base class by default', () => {
    const classes = checkboxVariants();
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
      const classes = checkboxVariants({ color });
      expect(classes).toContain('form-check-input');
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates size classes', () => {
    expect(checkboxVariants({ size: 'sm' })).toBe('form-check-input'); // default, no class
    expect(checkboxVariants({ size: 'md' })).toContain('form-check-md');
    expect(checkboxVariants({ size: 'lg' })).toContain('form-check-lg');
  });

  it('combines color and size', () => {
    const classes = checkboxVariants({ color: 'danger', size: 'lg' });
    expect(classes).toContain('form-check-input');
    expect(classes).toContain('form-check-danger');
    expect(classes).toContain('form-check-lg');
  });
});
