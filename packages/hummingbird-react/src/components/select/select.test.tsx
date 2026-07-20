import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, selectVariants } from './select';

// The default set of options used across the tests.
const options = (
  <>
    <option value="">Choose…</option>
    <option value="one">One</option>
    <option value="two">Two</option>
    <option value="three">Three</option>
  </>
);

describe('Select', () => {
  describe('Rendering', () => {
    it('renders a native select element', () => {
      render(<Select aria-label="Fruit">{options}</Select>);
      const select = screen.getByRole('combobox', { name: 'Fruit' });
      expect(select).toBeInTheDocument();
      expect(select).toBeInstanceOf(HTMLSelectElement);
      expect(select).toHaveAttribute('data-slot', 'select');
    });

    it('renders the supplied options', () => {
      render(<Select aria-label="Fruit">{options}</Select>);
      expect(screen.getByRole('option', { name: 'One' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Two' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Three' })).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(4);
    });

    it('supports multiple', () => {
      render(
        <Select aria-label="Fruit" multiple>
          {options}
        </Select>
      );
      expect(screen.getByRole('listbox', { name: 'Fruit' })).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies form-select for the default (outline) variant', () => {
      render(<Select aria-label="Fruit">{options}</Select>);
      expect(screen.getByRole('combobox')).toHaveClass('form-select');
    });

    it('applies the base class for each variant', () => {
      const variants = [
        { variant: 'outline', expected: 'form-select' },
        { variant: 'fill', expected: 'form-select-fill' },
      ] as const;

      variants.forEach(({ variant, expected }) => {
        const { unmount } = render(
          <Select aria-label="Fruit" variant={variant}>
            {options}
          </Select>
        );
        expect(screen.getByRole('combobox')).toHaveClass(expected);
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'sm', expected: 'form-select-sm' },
      { size: 'md', expected: '' },
      { size: 'lg', expected: 'form-select-lg' },
    ] as const;

    it('applies size classes correctly', () => {
      sizes.forEach(({ size, expected }) => {
        const { unmount } = render(
          <Select aria-label="Fruit" size={size}>
            {options}
          </Select>
        );
        const select = screen.getByRole('combobox');
        expect(select).toHaveClass('form-select');
        if (expected) {
          expect(select).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Colors', () => {
    const colors = ['secondary', 'info', 'success', 'warning'] as const;

    it('applies color classes correctly', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Select aria-label="Fruit" color={color}>
            {options}
          </Select>
        );
        expect(screen.getByRole('combobox')).toHaveClass(`form-select-${color}`);
        unmount();
      });
    });

    it('applies color with the fill variant', () => {
      render(
        <Select aria-label="Fruit" variant="fill" color="success">
          {options}
        </Select>
      );
      expect(screen.getByRole('combobox')).toHaveClass('form-select-fill', 'form-select-success');
    });
  });

  describe('States', () => {
    it('applies is-valid for the valid state', () => {
      render(
        <Select aria-label="Fruit" state="valid">
          {options}
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('is-valid');
      expect(select).not.toHaveAttribute('aria-invalid');
    });

    it('applies is-invalid and aria-invalid for the invalid state', () => {
      render(
        <Select aria-label="Fruit" state="invalid">
          {options}
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('is-invalid');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('omits aria-invalid when no state is set', () => {
      render(<Select aria-label="Fruit">{options}</Select>);
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Interactions', () => {
    it('changes value on selection', async () => {
      const user = userEvent.setup();
      render(<Select aria-label="Fruit">{options}</Select>);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'two');
      expect(select).toHaveValue('two');
      expect((screen.getByRole('option', { name: 'Two' }) as HTMLOptionElement).selected).toBe(
        true
      );
    });

    it('fires onChange with the selected value', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Select aria-label="Fruit" onChange={handleChange} defaultValue="">
          {options}
        </Select>
      );

      await user.selectOptions(screen.getByRole('combobox'), 'three');
      expect(handleChange).toHaveBeenCalledOnce();
      expect((handleChange.mock.calls[0][0].target as HTMLSelectElement).value).toBe('three');
    });

    it('supports uncontrolled defaultValue', () => {
      render(
        <Select aria-label="Fruit" defaultValue="two">
          {options}
        </Select>
      );
      expect(screen.getByRole('combobox')).toHaveValue('two');
    });

    it('supports controlled value', async () => {
      const user = userEvent.setup();
      function Controlled() {
        const [value, setValue] = React.useState('one');
        return (
          <Select aria-label="Fruit" value={value} onChange={(e) => setValue(e.target.value)}>
            {options}
          </Select>
        );
      }
      render(<Controlled />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('one');

      await user.selectOptions(select, 'three');
      expect(select).toHaveValue('three');
    });

    it('keeps the controlled value when onChange does not update it', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Select aria-label="Fruit" value="one" onChange={handleChange}>
          {options}
        </Select>
      );
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'two');
      expect(handleChange).toHaveBeenCalled();
      expect(select).toHaveValue('one');
    });

    it('supports the disabled state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Select aria-label="Fruit" disabled onChange={handleChange}>
          {options}
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();

      await user.selectOptions(select, 'two').catch(() => {});
      expect(handleChange).not.toHaveBeenCalled();
      expect(select).toHaveValue('');
    });

    it('preserves native attributes', () => {
      render(
        <Select aria-label="Fruit" name="fruit" required>
          {options}
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('name', 'fruit');
      expect(select).toBeRequired();
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with the variant classes', () => {
      render(
        <Select aria-label="Fruit" className="custom-class">
          {options}
        </Select>
      );
      expect(screen.getByRole('combobox')).toHaveClass('form-select', 'custom-class');
    });

    it('coexists with variant, size, color and state classes', () => {
      render(
        <Select
          aria-label="Fruit"
          variant="fill"
          size="lg"
          color="info"
          state="invalid"
          className="w-64"
        >
          {options}
        </Select>
      );
      expect(screen.getByRole('combobox')).toHaveClass(
        'form-select-fill',
        'form-select-lg',
        'form-select-info',
        'is-invalid',
        'w-64'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(
        <Select aria-label="Fruit" ref={ref}>
          {options}
        </Select>
      );
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
      expect(ref.current?.className).toContain('form-select');
    });

    it('allows reading the value via ref', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(
        <Select aria-label="Fruit" ref={ref} defaultValue="two">
          {options}
        </Select>
      );
      expect(ref.current?.value).toBe('two');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Select.displayName).toBe('Select');
    });
  });

  describe('Accessibility', () => {
    it('exposes the combobox role', () => {
      render(<Select aria-label="Fruit">{options}</Select>);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Select aria-label="Pick a fruit">{options}</Select>);
      expect(screen.getByLabelText('Pick a fruit')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Select aria-label="Fruit" aria-describedby="select-help">
            {options}
          </Select>
          <span id="select-help">Helpful text</span>
        </>
      );
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'select-help');
    });

    it('is keyboard operable', async () => {
      const user = userEvent.setup();
      render(<Select aria-label="Fruit">{options}</Select>);
      const select = screen.getByRole('combobox');

      await user.tab();
      expect(select).toHaveFocus();
    });

    it('associates with a label element via id', () => {
      render(
        <>
          <label htmlFor="fruit-select">Fruit</label>
          <Select id="fruit-select">{options}</Select>
        </>
      );
      expect(screen.getByLabelText('Fruit')).toBeInstanceOf(HTMLSelectElement);
    });
  });
});

describe('selectVariants', () => {
  it('generates the outline base class by default', () => {
    const classes = selectVariants();
    expect(classes).toContain('form-select');
    expect(classes).not.toContain('form-select-fill');
  });

  it('generates the fill base class', () => {
    expect(selectVariants({ variant: 'fill' })).toContain('form-select-fill');
  });

  it('generates classes for all size options', () => {
    const sizeTests = [
      { size: 'sm' as const, expected: 'form-select-sm' },
      { size: 'md' as const, expected: '' }, // default, no class
      { size: 'lg' as const, expected: 'form-select-lg' },
    ];

    sizeTests.forEach(({ size, expected }) => {
      const classes = selectVariants({ size });
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates classes for all color options', () => {
    const colors = ['secondary', 'info', 'success', 'warning'] as const;
    colors.forEach((color) => {
      expect(selectVariants({ color })).toContain(`form-select-${color}`);
    });
  });

  it('generates classes for state options', () => {
    expect(selectVariants({ state: 'valid' })).toContain('is-valid');
    expect(selectVariants({ state: 'invalid' })).toContain('is-invalid');
  });

  it('combines variant, size, color, and state', () => {
    const classes = selectVariants({
      variant: 'fill',
      size: 'lg',
      color: 'warning',
      state: 'invalid',
    });
    expect(classes).toContain('form-select-fill');
    expect(classes).toContain('form-select-lg');
    expect(classes).toContain('form-select-warning');
    expect(classes).toContain('is-invalid');
  });
});
