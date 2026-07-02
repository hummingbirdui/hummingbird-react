import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormRange, formRangeVariants } from './form-range';

describe('FormRange', () => {
  describe('Rendering', () => {
    it('renders an input of type range', () => {
      render(<FormRange aria-label="Volume" />);
      const slider = screen.getByRole('slider', { name: /volume/i });
      expect(slider).toBeInTheDocument();
      expect(slider).toBeInstanceOf(HTMLInputElement);
      expect(slider).toHaveAttribute('type', 'range');
    });

    it('applies the form-range base class', () => {
      render(<FormRange aria-label="Volume" />);
      expect(screen.getByRole('slider')).toHaveClass('form-range');
    });

    it('sets the data-slot attribute', () => {
      render(<FormRange aria-label="Volume" />);
      expect(screen.getByRole('slider')).toHaveAttribute('data-slot', 'form-range');
    });

    it('forwards min, max, and step attributes', () => {
      render(<FormRange aria-label="Volume" min={10} max={90} step={5} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('min', '10');
      expect(slider).toHaveAttribute('max', '90');
      expect(slider).toHaveAttribute('step', '5');
    });

    it('preserves other native attributes', () => {
      render(<FormRange aria-label="Volume" name="volume" id="volume-slider" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('name', 'volume');
      expect(slider).toHaveAttribute('id', 'volume-slider');
    });
  });

  describe('Interactions', () => {
    it('supports uncontrolled defaultValue', () => {
      render(<FormRange aria-label="Volume" min={0} max={100} defaultValue={25} />);
      expect(screen.getByRole('slider')).toHaveValue('25');
    });

    it('updates value on change (uncontrolled)', () => {
      render(<FormRange aria-label="Volume" min={0} max={100} defaultValue={0} />);
      const slider = screen.getByRole('slider');

      fireEvent.change(slider, { target: { value: '60' } });
      expect(slider).toHaveValue('60');
    });

    it('fires onChange with the new value', () => {
      const handleChange = vi.fn();
      render(
        <FormRange aria-label="Volume" min={0} max={100} defaultValue={0} onChange={handleChange} />
      );

      fireEvent.change(screen.getByRole('slider'), { target: { value: '42' } });
      expect(handleChange).toHaveBeenCalledOnce();
      expect(
        (handleChange.mock.calls[0][0] as React.ChangeEvent<HTMLInputElement>).target.value
      ).toBe('42');
    });

    it('supports controlled value', () => {
      const { rerender } = render(
        <FormRange aria-label="Volume" min={0} max={100} value={30} onChange={() => {}} />
      );
      const slider = screen.getByRole('slider');
      expect(slider).toHaveValue('30');

      rerender(<FormRange aria-label="Volume" min={0} max={100} value={70} onChange={() => {}} />);
      expect(slider).toHaveValue('70');
    });

    it('supports disabled state', () => {
      render(<FormRange aria-label="Volume" disabled />);
      expect(screen.getByRole('slider')).toBeDisabled();
    });

    it('is focusable when enabled and not when disabled', async () => {
      const user = userEvent.setup();
      const { unmount } = render(<FormRange aria-label="Volume" />);
      await user.tab();
      expect(screen.getByRole('slider')).toHaveFocus();
      unmount();

      render(<FormRange aria-label="Volume" disabled />);
      await user.tab();
      expect(screen.getByRole('slider')).not.toHaveFocus();
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'sm', expected: 'form-range-sm' },
      { size: 'md', expected: '' },
      { size: 'lg', expected: 'form-range-lg' },
    ] as const;

    it('applies size classes correctly', () => {
      sizes.forEach(({ size, expected }) => {
        const { unmount } = render(<FormRange aria-label="Volume" size={size} />);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveClass('form-range');
        if (expected) {
          expect(slider).toHaveClass(expected);
        }
        unmount();
      });
    });
  });

  describe('Colors', () => {
    const colors = [
      { color: 'primary', expected: '' }, // default, no class
      { color: 'secondary', expected: 'form-range-secondary' },
      { color: 'info', expected: 'form-range-info' },
      { color: 'success', expected: 'form-range-success' },
      { color: 'warning', expected: 'form-range-warning' },
      { color: 'danger', expected: 'form-range-danger' },
      { color: 'neutral', expected: 'form-range-neutral' },
    ] as const;

    it('applies color classes correctly', () => {
      colors.forEach(({ color, expected }) => {
        const { unmount } = render(<FormRange aria-label="Volume" color={color} />);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveClass('form-range');
        if (expected) {
          expect(slider).toHaveClass(expected);
        }
        unmount();
      });
    });

    it('combines color and size', () => {
      render(<FormRange aria-label="Volume" color="danger" size="lg" />);
      expect(screen.getByRole('slider')).toHaveClass(
        'form-range',
        'form-range-danger',
        'form-range-lg'
      );
    });
  });

  describe('Class Merging', () => {
    it('always includes the form-range base class', () => {
      render(<FormRange aria-label="Volume" />);
      expect(screen.getByRole('slider')).toHaveClass('form-range');
    });

    it('merges custom className with variant classes', () => {
      render(<FormRange aria-label="Volume" color="success" className="custom-range" />);
      expect(screen.getByRole('slider')).toHaveClass(
        'form-range',
        'form-range-success',
        'custom-range'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FormRange ref={ref} aria-label="Volume" defaultValue={15} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('range');
      expect(ref.current?.value).toBe('15');
      expect(ref.current?.className).toContain('form-range');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(FormRange.displayName).toBe('FormRange');
    });
  });

  describe('Accessibility', () => {
    it('exposes the slider role', () => {
      render(<FormRange aria-label="Volume" />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<FormRange aria-label="Brightness" />);
      expect(screen.getByLabelText('Brightness')).toBeInTheDocument();
    });

    it('associates with an external label via htmlFor', () => {
      render(
        <>
          <label htmlFor="opacity">Opacity</label>
          <FormRange id="opacity" />
        </>
      );
      expect(screen.getByLabelText('Opacity')).toHaveAttribute('type', 'range');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <FormRange aria-label="Volume" aria-describedby="range-help" />
          <span id="range-help">Adjust the volume</span>
        </>
      );
      expect(screen.getByRole('slider')).toHaveAttribute('aria-describedby', 'range-help');
    });

    it('exposes min/max/value to assistive tech via the native range input', () => {
      render(<FormRange aria-label="Volume" min={0} max={200} defaultValue={50} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider.min).toBe('0');
      expect(slider.max).toBe('200');
      expect(slider.value).toBe('50');
    });
  });
});

describe('formRangeVariants', () => {
  it('generates the base class by default', () => {
    const classes = formRangeVariants();
    expect(classes).toContain('form-range');
  });

  it('generates size classes', () => {
    expect(formRangeVariants({ size: 'sm' })).toContain('form-range-sm');
    expect(formRangeVariants({ size: 'lg' })).toContain('form-range-lg');
    expect(formRangeVariants({ size: 'md' })).not.toContain('form-range-sm');
  });

  it('generates color classes (primary has no extra class)', () => {
    expect(formRangeVariants({ color: 'primary' })).toBe('form-range');
    const colors = ['secondary', 'info', 'success', 'warning', 'danger', 'neutral'] as const;
    colors.forEach((color) => {
      expect(formRangeVariants({ color })).toContain(`form-range-${color}`);
    });
  });

  it('combines size and color', () => {
    const classes = formRangeVariants({ size: 'sm', color: 'info' });
    expect(classes).toContain('form-range');
    expect(classes).toContain('form-range-sm');
    expect(classes).toContain('form-range-info');
  });
});
