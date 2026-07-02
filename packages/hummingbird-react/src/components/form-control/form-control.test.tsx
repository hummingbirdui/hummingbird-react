import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FormControl,
  Textarea,
  FormLabel,
  FormField,
  FormText,
  InputIcon,
  InputIconStart,
  InputIconEnd,
  formControlVariants,
  formTextVariants,
} from './form-control';

describe('FormControl', () => {
  describe('Rendering', () => {
    it('renders an input element', () => {
      render(<FormControl aria-label="Name" />);
      const input = screen.getByRole('textbox', { name: /name/i });
      expect(input).toBeInTheDocument();
      expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it('sets the data-slot attribute', () => {
      render(<FormControl aria-label="Name" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'form-control');
    });

    it('applies the form-control base class by default', () => {
      render(<FormControl aria-label="Name" />);
      expect(screen.getByRole('textbox')).toHaveClass('form-control');
    });

    it('preserves native input attributes', () => {
      render(<FormControl type="email" name="email" placeholder="Enter email" required />);
      const input = screen.getByPlaceholderText('Enter email');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('name', 'email');
      expect(input).toBeRequired();
    });

    it('supports file input type', () => {
      render(<FormControl type="file" data-testid="file-input" />);
      const input = screen.getByTestId('file-input');
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveClass('form-control');
    });
  });

  describe('Interactions', () => {
    it('accepts typed input (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<FormControl aria-label="Name" />);
      const input = screen.getByRole('textbox', { name: /name/i });

      await user.type(input, 'hello');
      expect(input).toHaveValue('hello');
    });

    it('fires onChange for each keystroke', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<FormControl aria-label="Name" onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'abc');
      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('supports uncontrolled defaultValue', () => {
      render(<FormControl aria-label="Name" defaultValue="initial" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');
    });

    it('supports controlled value', () => {
      const { rerender } = render(
        <FormControl aria-label="Name" value="first" onChange={() => {}} />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('first');

      rerender(<FormControl aria-label="Name" value="second" onChange={() => {}} />);
      expect(input).toHaveValue('second');
    });

    it('keeps a controlled value fixed when the parent does not update it', async () => {
      const user = userEvent.setup();
      render(<FormControl aria-label="Name" value="locked" onChange={() => {}} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'x');
      expect(input).toHaveValue('locked');
    });

    it('supports disabled state and blocks typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<FormControl aria-label="Name" disabled onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      expect(input).toBeDisabled();
      await user.type(input, 'nope');
      expect(input).toHaveValue('');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('supports readOnly state and blocks typing', async () => {
      const user = userEvent.setup();
      render(<FormControl aria-label="Name" readOnly defaultValue="fixed" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('readonly');
      await user.type(input, 'nope');
      expect(input).toHaveValue('fixed');
    });
  });

  describe('Variants', () => {
    it('applies the outline variant (default base class)', () => {
      render(<FormControl aria-label="Name" variant="outline" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('form-control');
      expect(input).not.toHaveClass('form-control-fill');
    });

    it('applies the fill variant', () => {
      render(<FormControl aria-label="Name" variant="fill" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('form-control-fill');
      expect(input).not.toHaveClass('form-control');
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'sm', expected: 'form-control-sm' },
      { size: 'md', expected: '' },
      { size: 'lg', expected: 'form-control-lg' },
    ] as const;

    it('applies size classes correctly', () => {
      sizes.forEach(({ size, expected }) => {
        const { unmount } = render(<FormControl aria-label="Name" size={size} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('form-control');
        if (expected) {
          expect(input).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Colors', () => {
    const colors = ['primary', 'secondary', 'info', 'success', 'warning'] as const;

    it('applies color classes correctly', () => {
      colors.forEach((color) => {
        const { unmount } = render(<FormControl aria-label="Name" color={color} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('form-control', `form-control-${color}`);
        unmount();
      });
    });
  });

  describe('Validation States', () => {
    it('applies is-valid for the valid state', () => {
      render(<FormControl aria-label="Name" state="valid" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('is-valid');
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('applies is-invalid and aria-invalid for the invalid state', () => {
      render(<FormControl aria-label="Name" state="invalid" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('is-invalid');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets no aria-invalid without a state', () => {
      render(<FormControl aria-label="Name" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with variant classes', () => {
      render(
        <FormControl aria-label="Name" size="lg" color="success" className="custom-class" />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(
        'form-control',
        'form-control-lg',
        'form-control-success',
        'custom-class'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FormControl ref={ref} aria-label="Name" defaultValue="ref value" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.value).toBe('ref value');
      expect(ref.current?.className).toContain('form-control');
    });
  });

  describe('asChild Prop', () => {
    it('applies form-control classes to the child element', () => {
      render(
        <FormControl asChild size="sm">
          <input type="search" aria-label="Search" className="child-class" />
        </FormControl>
      );
      const input = screen.getByRole('searchbox', { name: /search/i });
      expect(input).toHaveAttribute('type', 'search');
      expect(input).toHaveClass('form-control', 'form-control-sm', 'child-class');
      expect(input).toHaveAttribute('data-slot', 'form-control');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(FormControl.displayName).toBe('FormControl');
    });
  });

  describe('Accessibility', () => {
    it('associates with a FormLabel via htmlFor', () => {
      render(
        <FormField>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormControl id="username" />
        </FormField>
      );
      expect(screen.getByLabelText('Username')).toBeInstanceOf(HTMLInputElement);
    });

    it('supports aria-describedby pointing at helper text', () => {
      render(
        <>
          <FormControl aria-label="Email" aria-describedby="email-help" />
          <FormText id="email-help">We never share your email.</FormText>
        </>
      );
      const input = screen.getByRole('textbox', { name: /email/i });
      expect(input).toHaveAttribute('aria-describedby', 'email-help');
      expect(document.getElementById('email-help')).toHaveTextContent(
        'We never share your email.'
      );
    });

    it('is focusable via keyboard', async () => {
      const user = userEvent.setup();
      render(<FormControl aria-label="Name" />);
      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });
});

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders a textarea element', () => {
      render(<Textarea aria-label="Message" />);
      const textarea = screen.getByRole('textbox', { name: /message/i });
      expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
      expect(textarea).toHaveAttribute('data-slot', 'textarea');
      expect(textarea).toHaveClass('form-control');
    });

    it('preserves native textarea attributes', () => {
      render(<Textarea aria-label="Message" rows={5} placeholder="Type here" />);
      const textarea = screen.getByPlaceholderText('Type here');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });

  describe('Interactions', () => {
    it('accepts typed input', async () => {
      const user = userEvent.setup();
      render(<Textarea aria-label="Message" />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'multi line');
      expect(textarea).toHaveValue('multi line');
    });

    it('supports controlled value', () => {
      const { rerender } = render(<Textarea aria-label="Message" value="a" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('a');

      rerender(<Textarea aria-label="Message" value="b" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('b');
    });

    it('supports disabled state', () => {
      render(<Textarea aria-label="Message" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('applies the fill variant', () => {
      render(<Textarea aria-label="Message" variant="fill" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('form-control-fill');
      expect(textarea).not.toHaveClass('form-control');
    });

    it('applies size and color classes', () => {
      render(<Textarea aria-label="Message" size="sm" color="warning" />);
      expect(screen.getByRole('textbox')).toHaveClass(
        'form-control',
        'form-control-sm',
        'form-control-warning'
      );
    });
  });

  describe('Validation States', () => {
    it('applies is-invalid with aria-invalid', () => {
      render(<Textarea aria-label="Message" state="invalid" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('is-invalid');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies is-valid without aria-invalid', () => {
      render(<Textarea aria-label="Message" state="valid" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('is-valid');
      expect(textarea).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the textarea element', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} aria-label="Message" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Textarea.displayName).toBe('Textarea');
    });
  });
});

describe('FormLabel', () => {
  it('renders a label element with the form-label class', () => {
    render(<FormLabel htmlFor="x">Label text</FormLabel>);
    const label = screen.getByText('Label text');
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label).toHaveClass('form-label');
    expect(label).toHaveAttribute('data-slot', 'form-label');
    expect(label).toHaveAttribute('for', 'x');
  });

  it('merges custom className', () => {
    render(<FormLabel className="custom-label">Label</FormLabel>);
    expect(screen.getByText('Label')).toHaveClass('form-label', 'custom-label');
  });

  it('has correct display name', () => {
    expect(FormLabel.displayName).toBe('FormLabel');
  });
});

describe('FormField', () => {
  it('renders a div with the form-field class', () => {
    render(<FormField data-testid="field">content</FormField>);
    const field = screen.getByTestId('field');
    expect(field).toBeInstanceOf(HTMLDivElement);
    expect(field).toHaveClass('form-field');
    expect(field).toHaveAttribute('data-slot', 'form-field');
  });

  it('merges custom className', () => {
    render(
      <FormField data-testid="field" className="custom-field">
        content
      </FormField>
    );
    expect(screen.getByTestId('field')).toHaveClass('form-field', 'custom-field');
  });

  it('has correct display name', () => {
    expect(FormField.displayName).toBe('FormField');
  });
});

describe('FormText', () => {
  const variants = [
    { variant: 'default', expected: 'form-text' },
    { variant: 'valid', expected: 'valid-feedback' },
    { variant: 'invalid', expected: 'invalid-feedback' },
  ] as const;

  it('renders a p element with the form-text class by default', () => {
    render(<FormText>Helper</FormText>);
    const text = screen.getByText('Helper');
    expect(text).toBeInstanceOf(HTMLParagraphElement);
    expect(text).toHaveClass('form-text');
    expect(text).toHaveAttribute('data-slot', 'form-text');
  });

  it('applies each variant class', () => {
    variants.forEach(({ variant, expected }) => {
      const { unmount } = render(<FormText variant={variant}>{variant}</FormText>);
      expect(screen.getByText(variant)).toHaveClass(expected);
      unmount();
    });
  });

  it('merges custom className', () => {
    render(
      <FormText variant="invalid" className="custom-text">
        Error
      </FormText>
    );
    expect(screen.getByText('Error')).toHaveClass('invalid-feedback', 'custom-text');
  });

  it('has correct display name', () => {
    expect(FormText.displayName).toBe('FormText');
  });
});

describe('InputIcon', () => {
  it('renders a div with the input-group-icon class', () => {
    render(<InputIcon data-testid="wrapper">child</InputIcon>);
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toBeInstanceOf(HTMLDivElement);
    expect(wrapper).toHaveClass('input-group-icon');
    expect(wrapper).toHaveAttribute('data-slot', 'input-icon');
  });

  it('wraps a control with start and end icons', () => {
    render(
      <InputIcon data-testid="wrapper">
        <InputIconStart data-testid="start">S</InputIconStart>
        <FormControl aria-label="Search" />
        <InputIconEnd data-testid="end">E</InputIconEnd>
      </InputIcon>
    );
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toContainElement(screen.getByRole('textbox'));
    expect(wrapper).toContainElement(screen.getByTestId('start'));
    expect(wrapper).toContainElement(screen.getByTestId('end'));
  });

  it('has correct display name', () => {
    expect(InputIcon.displayName).toBe('InputIcon');
  });
});

describe('InputIconStart', () => {
  it('renders a span with the form-control-icon-start class', () => {
    render(<InputIconStart data-testid="start">S</InputIconStart>);
    const icon = screen.getByTestId('start');
    expect(icon).toBeInstanceOf(HTMLSpanElement);
    expect(icon).toHaveClass('form-control-icon-start');
    expect(icon).toHaveAttribute('data-slot', 'input-icon-start');
  });

  it('merges custom className', () => {
    render(
      <InputIconStart data-testid="start" className="custom-icon">
        S
      </InputIconStart>
    );
    expect(screen.getByTestId('start')).toHaveClass('form-control-icon-start', 'custom-icon');
  });

  it('has correct display name', () => {
    expect(InputIconStart.displayName).toBe('InputIconStart');
  });
});

describe('InputIconEnd', () => {
  it('renders a span with the form-control-icon-end class', () => {
    render(<InputIconEnd data-testid="end">E</InputIconEnd>);
    const icon = screen.getByTestId('end');
    expect(icon).toBeInstanceOf(HTMLSpanElement);
    expect(icon).toHaveClass('form-control-icon-end');
    expect(icon).toHaveAttribute('data-slot', 'input-icon-end');
  });

  it('has correct display name', () => {
    expect(InputIconEnd.displayName).toBe('InputIconEnd');
  });
});

describe('formControlVariants', () => {
  it('generates the outline base class by default', () => {
    const classes = formControlVariants();
    expect(classes).toContain('form-control');
    expect(classes).not.toContain('form-control-fill');
  });

  it('generates the fill base class', () => {
    expect(formControlVariants({ variant: 'fill' })).toContain('form-control-fill');
  });

  it('generates size classes', () => {
    expect(formControlVariants({ size: 'sm' })).toContain('form-control-sm');
    expect(formControlVariants({ size: 'lg' })).toContain('form-control-lg');
    expect(formControlVariants({ size: 'md' })).not.toContain('form-control-sm');
  });

  it('generates color classes', () => {
    const colors = ['primary', 'secondary', 'info', 'success', 'warning'] as const;
    colors.forEach((color) => {
      expect(formControlVariants({ color })).toContain(`form-control-${color}`);
    });
  });

  it('generates state classes', () => {
    expect(formControlVariants({ state: 'valid' })).toContain('is-valid');
    expect(formControlVariants({ state: 'invalid' })).toContain('is-invalid');
  });

  it('combines variant, size, color, and state', () => {
    const classes = formControlVariants({
      variant: 'fill',
      size: 'lg',
      color: 'success',
      state: 'invalid',
    });
    expect(classes).toContain('form-control-fill');
    expect(classes).toContain('form-control-lg');
    expect(classes).toContain('form-control-success');
    expect(classes).toContain('is-invalid');
  });
});

describe('formTextVariants', () => {
  it('generates the form-text class by default', () => {
    expect(formTextVariants()).toContain('form-text');
  });

  it('generates feedback classes', () => {
    expect(formTextVariants({ variant: 'valid' })).toContain('valid-feedback');
    expect(formTextVariants({ variant: 'invalid' })).toContain('invalid-feedback');
  });
});
