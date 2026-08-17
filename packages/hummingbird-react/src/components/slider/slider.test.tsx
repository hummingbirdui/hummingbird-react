import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider, sliderVariants } from './slider';

describe('Slider', () => {
  describe('Rendering', () => {
    it('renders the root with the slider class', () => {
      render(<Slider defaultValue={[50]} aria-label="Volume" />);
      const root = document.querySelector('[data-slot="slider"]');
      expect(root).toBeInTheDocument();
      expect(root).toHaveClass('slider');
      expect(root).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders the track, range, and thumb parts with their classes', () => {
      render(<Slider defaultValue={[50]} aria-label="Volume" />);
      expect(document.querySelector('[data-slot="slider-track"]')).toHaveClass('slider-track');
      expect(document.querySelector('[data-slot="slider-range"]')).toHaveClass('slider-range');
      expect(document.querySelector('[data-slot="slider-thumb"]')).toHaveClass('slider-thumb');
    });

    it('renders a single thumb by default', () => {
      render(<Slider aria-label="Volume" />);
      expect(document.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(1);
    });

    it('renders one thumb per value for a range', () => {
      render(<Slider defaultValue={[25, 75]} aria-label="Price range" />);
      expect(document.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(2);
      expect(screen.getAllByRole('slider')).toHaveLength(2);
    });
  });

  describe('Colors', () => {
    const colors = [
      ['secondary', 'slider-secondary'],
      ['info', 'slider-info'],
      ['success', 'slider-success'],
      ['warning', 'slider-warning'],
      ['danger', 'slider-danger'],
      ['neutral', 'slider-neutral'],
    ] as const;

    it('applies no color class for the default primary color', () => {
      render(<Slider defaultValue={[50]} aria-label="Volume" />);
      const root = document.querySelector('[data-slot="slider"]');
      expect(root).toHaveClass('slider');
      colors.forEach(([, cls]) => expect(root).not.toHaveClass(cls));
    });

    colors.forEach(([color, expectedClass]) => {
      it(`applies the ${color} color class`, () => {
        const { unmount } = render(
          <Slider defaultValue={[50]} color={color} aria-label="Volume" />
        );
        expect(document.querySelector('[data-slot="slider"]')).toHaveClass(
          'slider',
          expectedClass
        );
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    it('applies no size class for the default md size', () => {
      render(<Slider defaultValue={[50]} aria-label="Volume" />);
      const root = document.querySelector('[data-slot="slider"]');
      expect(root).not.toHaveClass('slider-sm');
      expect(root).not.toHaveClass('slider-lg');
    });

    (['sm', 'lg'] as const).forEach((size) => {
      it(`applies the ${size} size class`, () => {
        const { unmount } = render(
          <Slider defaultValue={[50]} size={size} aria-label="Volume" />
        );
        expect(document.querySelector('[data-slot="slider"]')).toHaveClass(`slider-${size}`);
        unmount();
      });
    });
  });

  describe('Interactions', () => {
    it('changes the value with arrow keys and reports it', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Slider defaultValue={[50]} onValueChange={onValueChange} aria-label="Volume" />
      );
      const thumb = screen.getByRole('slider');
      thumb.focus();
      await user.keyboard('{ArrowRight}');
      expect(onValueChange).toHaveBeenCalledWith([51]);
      await user.keyboard('{Home}');
      expect(onValueChange).toHaveBeenCalledWith([0]);
      await user.keyboard('{End}');
      expect(onValueChange).toHaveBeenCalledWith([100]);
    });

    it('respects the step', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Slider
          defaultValue={[50]}
          step={10}
          onValueChange={onValueChange}
          aria-label="Volume"
        />
      );
      screen.getByRole('slider').focus();
      await user.keyboard('{ArrowRight}');
      expect(onValueChange).toHaveBeenCalledWith([60]);
    });

    it('supports a controlled value', () => {
      render(<Slider value={[30]} onValueChange={() => {}} aria-label="Volume" />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
    });

    it('sets the disabled state on the root', () => {
      render(<Slider defaultValue={[50]} disabled aria-label="Volume" />);
      expect(document.querySelector('[data-slot="slider"]')).toHaveAttribute('data-disabled');
    });
  });

  describe('Orientation', () => {
    it('renders vertically with orientation', () => {
      render(<Slider defaultValue={[50]} orientation="vertical" aria-label="Volume" />);
      const root = document.querySelector('[data-slot="slider"]');
      expect(root).toHaveAttribute('data-orientation', 'vertical');
      expect(document.querySelector('[data-slot="slider-track"]')).toHaveAttribute(
        'data-orientation',
        'vertical'
      );
    });
  });

  describe('Class Merging', () => {
    it('merges a custom className on the root', () => {
      render(<Slider defaultValue={[50]} className="custom-class" aria-label="Volume" />);
      expect(document.querySelector('[data-slot="slider"]')).toHaveClass(
        'slider',
        'custom-class'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards a ref to the root element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Slider defaultValue={[50]} ref={ref} aria-label="Volume" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveClass('slider');
    });
  });

  describe('Display Name', () => {
    it('has the correct display name', () => {
      expect(Slider.displayName).toBe('Slider');
    });
  });

  describe('Accessibility', () => {
    it('exposes the slider role with value attributes', () => {
      render(<Slider defaultValue={[40]} min={0} max={100} aria-label="Volume" />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuenow', '40');
      expect(thumb).toHaveAttribute('aria-valuemin', '0');
      expect(thumb).toHaveAttribute('aria-valuemax', '100');
      expect(thumb).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders a hidden input for form submission when named', () => {
      const { container } = render(
        <form>
          <Slider defaultValue={[50]} name="volume" aria-label="Volume" />
        </form>
      );
      expect(container.querySelector('input[name="volume"]')).toBeInTheDocument();
    });
  });
});

describe('sliderVariants', () => {
  it('returns the base class by default', () => {
    const classes = sliderVariants();
    expect(classes).toContain('slider');
    expect(classes).not.toContain('slider-sm');
    expect(classes).not.toContain('slider-secondary');
  });

  it('combines size and color classes', () => {
    const classes = sliderVariants({ size: 'lg', color: 'danger' });
    expect(classes).toContain('slider');
    expect(classes).toContain('slider-lg');
    expect(classes).toContain('slider-danger');
  });
});
