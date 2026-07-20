import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CloseButton, closeButtonVariants } from './close-button';

describe('CloseButton', () => {
  describe('Rendering', () => {
    it('renders a button element', () => {
      render(<CloseButton />);
      const button = screen.getByRole('button', { name: /close/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });

    it('applies the base btn-close class', () => {
      render(<CloseButton />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveClass('btn-close');
    });

    it('has data-slot attribute', () => {
      render(<CloseButton />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveAttribute(
        'data-slot',
        'close-button'
      );
    });

    it('defaults to type="button"', () => {
      render(<CloseButton />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveAttribute('type', 'button');
    });

    it('allows overriding the type attribute', () => {
      render(<CloseButton type="submit" />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveAttribute('type', 'submit');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<CloseButton onClick={handleClick} />);
      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('supports disabled state', () => {
      render(<CloseButton disabled />);
      expect(screen.getByRole('button', { name: /close/i })).toBeDisabled();
    });

    it('does not fire click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<CloseButton disabled onClick={handleClick} />);
      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'white'] as const;

    it('applies base class for every variant', () => {
      variants.forEach((variant) => {
        const { unmount } = render(<CloseButton variant={variant} />);
        expect(screen.getByRole('button', { name: /close/i })).toHaveClass('btn-close');
        unmount();
      });
    });

    it('applies default variant without a modifier class', () => {
      render(<CloseButton variant="default" />);
      const button = screen.getByRole('button', { name: /close/i });
      expect(button).toHaveClass('btn-close');
      expect(button).not.toHaveClass('btn-close-white');
    });

    it('applies white variant class', () => {
      render(<CloseButton variant="white" />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveClass(
        'btn-close',
        'btn-close-white'
      );
    });
  });

  describe('Shapes', () => {
    const shapes = ['default', 'circle'] as const;

    it('applies shape classes correctly', () => {
      shapes.forEach((shape) => {
        const { unmount } = render(<CloseButton shape={shape} />);
        const button = screen.getByRole('button', { name: /close/i });
        if (shape === 'circle') {
          expect(button).toHaveClass('btn-close-circle');
        } else {
          // Default has no shape class
          expect(button).toHaveClass('btn-close');
          expect(button).not.toHaveClass('btn-close-circle');
        }
        unmount();
      });
    });

    it('combines variant and shape', () => {
      render(<CloseButton variant="white" shape="circle" />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveClass(
        'btn-close',
        'btn-close-white',
        'btn-close-circle'
      );
    });
  });

  describe('Class Merging', () => {
    it('always includes base btn-close class', () => {
      render(<CloseButton />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveClass('btn-close');
    });

    it('merges custom className with variant classes', () => {
      render(<CloseButton variant="white" className="custom-class" />);
      expect(screen.getByRole('button', { name: /close/i })).toHaveClass(
        'btn-close',
        'btn-close-white',
        'custom-class'
      );
    });

    it('allows custom classes to coexist with Tailwind utilities', () => {
      render(<CloseButton className="absolute top-2 right-2" />);
      const button = screen.getByRole('button', { name: /close/i });
      expect(button).toHaveClass('btn-close');
      expect(button).toHaveClass('absolute', 'top-2', 'right-2');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<CloseButton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.className).toContain('btn-close');
    });

    it('allows accessing button properties via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<CloseButton ref={ref} disabled />);
      expect(ref.current?.disabled).toBe(true);
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(CloseButton.displayName).toBe('CloseButton');
    });
  });

  describe('Accessibility', () => {
    it('has a default aria-label of Close', () => {
      render(<CloseButton />);
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('allows overriding the aria-label', () => {
      render(<CloseButton aria-label="Dismiss notification" />);
      expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument();
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });

    it('is keyboard accessible with Enter', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<CloseButton onClick={handleClick} />);
      screen.getByRole('button', { name: /close/i }).focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('is keyboard accessible with Space', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<CloseButton onClick={handleClick} />);
      screen.getByRole('button', { name: /close/i }).focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });

    it('has proper role attribute', () => {
      render(<CloseButton />);
      expect(screen.getByRole('button', { name: /close/i }).tagName).toBe('BUTTON');
    });
  });
});

describe('closeButtonVariants', () => {
  it('generates correct default classes', () => {
    const classes = closeButtonVariants();
    expect(classes).toContain('btn-close');
    expect(classes).not.toContain('btn-close-white');
    expect(classes).not.toContain('btn-close-circle');
  });

  it('generates classes for all variant options', () => {
    const variantTests = [
      { variant: 'default' as const, expected: '' }, // no class
      { variant: 'white' as const, expected: 'btn-close-white' },
    ];

    variantTests.forEach(({ variant, expected }) => {
      const classes = closeButtonVariants({ variant });
      expect(classes).toContain('btn-close');
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates classes for all shape options', () => {
    const shapeTests = [
      { shape: 'default' as const, expected: '' }, // no class
      { shape: 'circle' as const, expected: 'btn-close-circle' },
    ];

    shapeTests.forEach(({ shape, expected }) => {
      const classes = closeButtonVariants({ shape });
      expect(classes).toContain('btn-close');
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('combines variant and shape', () => {
    const classes = closeButtonVariants({ variant: 'white', shape: 'circle' });
    expect(classes).toContain('btn-close');
    expect(classes).toContain('btn-close-white');
    expect(classes).toContain('btn-close-circle');
  });
});
