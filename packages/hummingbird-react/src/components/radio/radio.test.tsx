import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, radioVariants } from './radio';

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders a native radio input', () => {
      render(<Radio aria-label="Option" />);
      const radio = screen.getByRole('radio', { name: /option/i });
      expect(radio).toBeInTheDocument();
      expect(radio).toBeInstanceOf(HTMLInputElement);
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('sets the data-slot attribute', () => {
      render(<Radio aria-label="Option" />);
      expect(screen.getByRole('radio')).toHaveAttribute('data-slot', 'radio');
    });

    it('renders the label text when label is provided', () => {
      render(<Radio label="Option A" />);
      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /option a/i })).toBeInTheDocument();
    });

    it('does not render a label wrapper when label is omitted', () => {
      const { container } = render(<Radio aria-label="Bare" />);
      expect(container.querySelector('label')).not.toBeInTheDocument();
      expect(container.querySelector('[data-slot="form-check"]')).not.toBeInTheDocument();
    });

    it('applies name and value attributes', () => {
      render(<Radio aria-label="Option" name="choice" value="a" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('name', 'choice');
      expect(radio).toHaveAttribute('value', 'a');
    });

    it('supports defaultChecked', () => {
      render(<Radio aria-label="Option" defaultChecked />);
      expect(screen.getByRole('radio')).toBeChecked();
    });
  });

  describe('Structure & classes', () => {
    it('wraps the input in a form-check-input-wrapper span', () => {
      render(<Radio aria-label="Option" />);
      const wrapper = screen.getByRole('radio').parentElement as HTMLElement;
      expect(wrapper.tagName).toBe('SPAN');
      expect(wrapper).toHaveClass('form-check-input-wrapper');
    });

    it('applies the base form-check-input class to the input', () => {
      render(<Radio aria-label="Option" />);
      expect(screen.getByRole('radio')).toHaveClass('form-check-input');
    });

    it('wraps input and label in a form-check label element', () => {
      render(<Radio label="Option" />);
      const label = screen.getByText('Option').closest('label') as HTMLLabelElement;
      expect(label).toHaveClass('form-check');
      expect(label).toHaveAttribute('data-slot', 'form-check');
    });

    it('renders the label text in a form-check-label span', () => {
      render(<Radio label="Option" />);
      const text = screen.getByText('Option');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('form-check-label');
    });

    it('applies form-check-inline instead of form-check when inline', () => {
      render(<Radio label="Inline" inline />);
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
        const { unmount } = render(<Radio aria-label={color} color={color} />);
        const radio = screen.getByRole('radio', { name: color });
        expect(radio).toHaveClass('form-check-input');
        if (color !== 'primary') {
          expect(radio).toHaveClass(`form-check-${color}`);
        } else {
          // Primary is the default and adds no extra class
          expect(radio.className.trim()).toBe('form-check-input');
        }
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Radio aria-label={size} size={size} />);
        const radio = screen.getByRole('radio', { name: size });
        expect(radio).toHaveClass('form-check-input');
        if (size !== 'sm') {
          expect(radio).toHaveClass(`form-check-${size}`);
        } else {
          // Small is the default and adds no extra class
          expect(radio.className.trim()).toBe('form-check-input');
        }
        unmount();
      });
    });

    it('combines color and size classes', () => {
      render(<Radio aria-label="combo" color="warning" size="md" />);
      const radio = screen.getByRole('radio', { name: 'combo' });
      expect(radio).toHaveClass('form-check-input', 'form-check-warning', 'form-check-md');
    });
  });

  describe('Interactions (standalone)', () => {
    it('checks when clicked (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<Radio aria-label="Option" name="choice" />);
      const radio = screen.getByRole('radio');

      await user.click(radio);
      expect(radio).toBeChecked();
    });

    it('fires onChange when selected', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Radio aria-label="Option" name="choice" onChange={handleChange} />);

      await user.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalledOnce();
      expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
    });

    it('selects when the label text is clicked', async () => {
      const user = userEvent.setup();
      render(<Radio label="Pick me" name="choice" />);

      await user.click(screen.getByText('Pick me'));
      expect(screen.getByRole('radio')).toBeChecked();
    });

    it('moves selection between same-name radios', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Radio label="One" name="choice" value="one" defaultChecked />
          <Radio label="Two" name="choice" value="two" />
        </>
      );

      await user.click(screen.getByRole('radio', { name: 'Two' }));
      expect(screen.getByRole('radio', { name: 'Two' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'One' })).not.toBeChecked();
    });

    it('supports controlled checked state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Radio aria-label="Option" checked={false} onChange={handleChange} />
      );
      const radio = screen.getByRole('radio');

      await user.click(radio);
      expect(handleChange).toHaveBeenCalledOnce();
      // Controlled: stays unchecked until the prop changes
      expect(radio).not.toBeChecked();

      rerender(<Radio aria-label="Option" checked onChange={handleChange} />);
      expect(radio).toBeChecked();
    });

    it('supports disabled state and does not fire onChange', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Radio aria-label="Option" disabled onChange={handleChange} />);
      const radio = screen.getByRole('radio');

      expect(radio).toBeDisabled();
      await user.click(radio);
      expect(handleChange).not.toHaveBeenCalled();
      expect(radio).not.toBeChecked();
    });

    it('supports the required attribute', () => {
      render(<Radio aria-label="Option" required />);
      expect(screen.getByRole('radio')).toBeRequired();
    });

    it('submits the selected value with form data', () => {
      render(
        <form data-testid="form">
          <Radio label="One" name="choice" value="one" />
          <Radio label="Two" name="choice" value="two" defaultChecked />
        </form>
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      const data = new FormData(form);
      expect(data.get('choice')).toBe('two');
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with variant classes', () => {
      render(<Radio aria-label="Custom" color="info" className="custom-class" />);
      expect(screen.getByRole('radio')).toHaveClass(
        'form-check-input',
        'form-check-info',
        'custom-class'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio aria-label="Ref" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('radio');
    });

    it('allows reading input state via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio aria-label="Ref" ref={ref} defaultChecked />);
      expect(ref.current?.checked).toBe(true);
      expect(ref.current?.className).toContain('form-check-input');
    });
  });

  describe('Display Name', () => {
    it('has correct display names', () => {
      expect(Radio.displayName).toBe('Radio');
      expect(Radio.Group.displayName).toBe('Radio.Group');
    });
  });

  describe('Accessibility', () => {
    it('has the radio role', () => {
      render(<Radio aria-label="Role" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('selects with the Space key', async () => {
      const user = userEvent.setup();
      render(<Radio aria-label="Space" name="choice" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      await user.keyboard(' ');
      expect(radio).toBeChecked();
    });

    it('supports aria-label', () => {
      render(<Radio aria-label="Choose plan" />);
      expect(screen.getByLabelText('Choose plan')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Radio aria-label="Option" aria-describedby="help" />
          <span id="help">Pick one</span>
        </>
      );
      expect(screen.getByRole('radio')).toHaveAttribute('aria-describedby', 'help');
    });

    it('associates the visible label with the input', () => {
      render(<Radio label="Monthly" />);
      expect(screen.getByRole('radio', { name: 'Monthly' })).toBeInTheDocument();
    });
  });
});

describe('Radio.Group', () => {
  function Example(props: React.ComponentProps<typeof Radio.Group>) {
    return (
      <Radio.Group name="plan" {...props}>
        <Radio label="Free" value="free" />
        <Radio label="Pro" value="pro" />
        <Radio label="Team" value="team" />
      </Radio.Group>
    );
  }

  describe('Rendering', () => {
    it('renders a div with the radiogroup role and data-slot', () => {
      render(<Example />);
      const group = screen.getByRole('radiogroup');
      expect(group).toBeInTheDocument();
      expect(group.tagName).toBe('DIV');
      expect(group).toHaveAttribute('data-slot', 'radio-group');
    });

    it('renders all child radios', () => {
      render(<Example />);
      expect(screen.getAllByRole('radio')).toHaveLength(3);
    });

    it('passes className and other div props through', () => {
      render(<Example className="custom-group" id="plans" />);
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveClass('custom-group');
      expect(group).toHaveAttribute('id', 'plans');
    });
  });

  describe('Name sharing', () => {
    it('applies the group name to every radio', () => {
      render(<Example />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'plan');
      });
    });

    it("lets a radio's own name override the group name", () => {
      render(
        <Radio.Group name="plan">
          <Radio label="Custom" value="custom" name="other" />
        </Radio.Group>
      );
      expect(screen.getByRole('radio')).toHaveAttribute('name', 'other');
    });
  });

  describe('Uncontrolled (defaultValue)', () => {
    it('selects the radio matching defaultValue', () => {
      render(<Example defaultValue="pro" />);
      expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked();
      expect(screen.getByRole('radio', { name: 'Team' })).not.toBeChecked();
    });

    it('updates the selection on click and fires onValueChange', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Example defaultValue="free" onValueChange={onValueChange} />);

      await user.click(screen.getByRole('radio', { name: 'Team' }));
      expect(onValueChange).toHaveBeenCalledOnce();
      expect(onValueChange).toHaveBeenCalledWith('team');
      expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked();
    });

    it('selects via the label text', async () => {
      const user = userEvent.setup();
      render(<Example defaultValue="free" />);

      await user.click(screen.getByText('Pro'));
      expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    });

    it('starts with no selection when defaultValue is omitted and selects without a controlled/uncontrolled warning', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const user = userEvent.setup();
      render(<Example />);

      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).not.toBeChecked();
      });

      await user.click(screen.getByRole('radio', { name: 'Pro' }));
      expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();

      const controlledWarnings = errorSpy.mock.calls.filter((args) =>
        String(args[0]).includes('uncontrolled input to be controlled')
      );
      expect(controlledWarnings).toHaveLength(0);
      errorSpy.mockRestore();
    });
  });

  describe('Controlled (value)', () => {
    it('selects the radio matching value', () => {
      render(<Example value="team" />);
      expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked();
    });

    it('fires onValueChange but keeps the selection until value changes', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(<Example value="free" onValueChange={onValueChange} />);

      await user.click(screen.getByRole('radio', { name: 'Pro' }));
      expect(onValueChange).toHaveBeenCalledWith('pro');
      // Still controlled by the unchanged prop
      expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Pro' })).not.toBeChecked();

      rerender(
        <Radio.Group name="plan" value="pro" onValueChange={onValueChange}>
          <Radio label="Free" value="free" />
          <Radio label="Pro" value="pro" />
          <Radio label="Team" value="team" />
        </Radio.Group>
      );
      expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    });

    it('also calls a radio-level onChange handler', async () => {
      const onValueChange = vi.fn();
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Radio.Group name="plan" value="free" onValueChange={onValueChange}>
          <Radio label="Free" value="free" />
          <Radio label="Pro" value="pro" onChange={onChange} />
        </Radio.Group>
      );

      await user.click(screen.getByRole('radio', { name: 'Pro' }));
      expect(onChange).toHaveBeenCalledOnce();
      expect(onValueChange).toHaveBeenCalledWith('pro');
    });
  });

  describe('Form integration', () => {
    it('submits the group selection with form data', () => {
      render(
        <form data-testid="form">
          <Example defaultValue="team" />
        </form>
      );
      const form = screen.getByTestId('form') as HTMLFormElement;
      const data = new FormData(form);
      expect(data.get('plan')).toBe('team');
    });
  });

  describe('Accessibility', () => {
    it('exposes the radiogroup role with a label', () => {
      render(<Example aria-label="Choose plan" />);
      expect(screen.getByRole('radiogroup', { name: 'Choose plan' })).toBeInTheDocument();
    });

    it('only the selected radio is checked', async () => {
      const user = userEvent.setup();
      render(<Example defaultValue="free" />);

      await user.click(screen.getByRole('radio', { name: 'Team' }));
      const checked = screen.getAllByRole('radio').filter((r) => (r as HTMLInputElement).checked);
      expect(checked).toHaveLength(1);
      expect(checked[0]).toBe(screen.getByRole('radio', { name: 'Team' }));
    });
  });
});

describe('radioVariants', () => {
  it('generates the base class by default', () => {
    const classes = radioVariants();
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
      const classes = radioVariants({ color });
      expect(classes).toContain('form-check-input');
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates size classes', () => {
    expect(radioVariants({ size: 'sm' })).toBe('form-check-input'); // default, no class
    expect(radioVariants({ size: 'md' })).toContain('form-check-md');
    expect(radioVariants({ size: 'lg' })).toContain('form-check-lg');
  });

  it('combines color and size', () => {
    const classes = radioVariants({ color: 'success', size: 'lg' });
    expect(classes).toContain('form-check-input');
    expect(classes).toContain('form-check-success');
    expect(classes).toContain('form-check-lg');
  });
});
