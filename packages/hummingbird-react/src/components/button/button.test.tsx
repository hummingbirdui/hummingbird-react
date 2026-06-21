import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders button element', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });

    it('renders with correct text content', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('renders with children elements', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });

      await user.click(button);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('supports disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    it('does not fire click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole('button', { name: /disabled/i });

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('preserves button type attribute', () => {
      render(
        <>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
          <Button type="button">Button</Button>
        </>
      );

      expect(screen.getByRole('button', { name: /submit/i })).toHaveAttribute('type', 'submit');
      expect(screen.getByRole('button', { name: /reset/i })).toHaveAttribute('type', 'reset');
      expect(screen.getByRole('button', { name: /button/i })).toHaveAttribute('type', 'button');
    });
  });

  describe('Variants', () => {
    const variants = ['filled', 'subtle', 'outline', 'text', 'link', 'icon'] as const;

    it('applies filled variant correctly', () => {
      render(<Button variant="filled">Filled</Button>);
      const button = screen.getByRole('button', { name: /filled/i });
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn-primary'); // default color
    });

    it('applies all variant types', () => {
      variants.forEach((variant) => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole('button', { name: variant });
        expect(button).toHaveClass('btn');
        unmount();
      });
    });

    it('applies link variant with underline class', () => {
      render(<Button variant="link">Link Button</Button>);
      const button = screen.getByRole('button', { name: /link button/i });
      expect(button).toHaveClass('btn-link');
    });

    it('applies icon variant', () => {
      render(<Button variant="icon">🎨</Button>);
      const button = screen.getByRole('button', { name: /🎨/i });
      expect(button).toHaveClass('btn-icon');
    });
  });

  describe('Colors', () => {
    const colors = [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'neutral',
      'light',
      'dark',
    ] as const;

    it('applies filled variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Button variant="filled" color={color}>
            {color}
          </Button>
        );
        const button = screen.getByRole('button', { name: color });
        expect(button).toHaveClass(`btn-${color}`);
        unmount();
      });
    });

    it('applies subtle variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Button variant="subtle" color={color}>
            {color}
          </Button>
        );
        const button = screen.getByRole('button', { name: color });
        expect(button).toHaveClass(`btn-subtle-${color}`);
        unmount();
      });
    });

    it('applies outline variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Button variant="outline" color={color}>
            {color}
          </Button>
        );
        const button = screen.getByRole('button', { name: color });
        expect(button).toHaveClass(`btn-outline-${color}`);
        unmount();
      });
    });

    it('applies text variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Button variant="text" color={color}>
            {color}
          </Button>
        );
        const button = screen.getByRole('button', { name: color });
        expect(button).toHaveClass(`btn-text-${color}`);
        unmount();
      });
    });

    it('applies icon variant with all color options', () => {
      const iconColors = colors.filter((c) => !['neutral', 'light', 'dark'].includes(c));
      iconColors.forEach((color) => {
        const { unmount } = render(
          <Button variant="icon" color={color}>
            {color}
          </Button>
        );
        const button = screen.getByRole('button', { name: color });
        expect(button).toHaveClass(`btn-icon-${color}`);
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Button size={size}>{size}</Button>);
        const button = screen.getByRole('button', { name: size });
        if (size !== 'md') {
          expect(button).toHaveClass(`btn-${size}`);
        } else {
          // Medium is default, no class
          expect(button).toHaveClass('btn');
        }
        unmount();
      });
    });

    it('combines variant, color, and size', () => {
      render(
        <Button variant="outline" color="success" size="lg">
          Large Success Outline
        </Button>
      );
      const button = screen.getByRole('button', {
        name: /large success outline/i,
      });
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn-outline-success');
      expect(button).toHaveClass('btn-lg');
    });
  });

  describe('Shapes', () => {
    const shapes = ['default', 'square', 'circle'] as const;

    it('applies shape classes correctly', () => {
      shapes.forEach((shape) => {
        const { unmount } = render(<Button shape={shape}>{shape}</Button>);
        const button = screen.getByRole('button', { name: shape });
        if (shape !== 'default') {
          expect(button).toHaveClass(`btn-${shape}`);
        } else {
          // Default has no shape class
          expect(button).toHaveClass('btn');
        }
        unmount();
      });
    });

    it('applies square shape with all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(
          <Button shape="square" size={size}>
            □
          </Button>
        );
        const button = screen.getByRole('button', { name: /□/i });
        expect(button).toHaveClass('btn-square');
        unmount();
      });
    });

    it('applies circle shape with all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(
          <Button shape="circle" size={size}>
            ●
          </Button>
        );
        const button = screen.getByRole('button', { name: /●/i });
        expect(button).toHaveClass('btn-circle');
        unmount();
      });
    });
  });

  describe('Class Merging', () => {
    it('always includes base btn class', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button', { name: /button/i });
      expect(button).toHaveClass('btn');
    });

    it('merges custom className with variant classes', () => {
      render(
        <Button variant="filled" color="primary" className="custom-class">
          Button
        </Button>
      );
      const button = screen.getByRole('button', { name: /button/i });
      expect(button).toHaveClass('btn', 'btn-primary', 'custom-class');
    });

    it('allows custom classes to override Tailwind utilities', () => {
      render(
        <Button variant="filled" color="primary" size="md" className="px-10 py-5 text-red-500">
          Custom Size
        </Button>
      );
      const button = screen.getByRole('button', { name: /custom size/i });
      expect(button).toHaveClass('btn', 'btn-primary');
      expect(button).toHaveClass('px-10', 'py-5', 'text-red-500');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe('Button');
    });

    it('allows accessing button properties via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Button ref={ref} disabled>
          Button
        </Button>
      );
      expect(ref.current?.disabled).toBe(true);
      expect(ref.current?.className).toContain('btn');
    });
  });

  describe('asChild Prop', () => {
    it('renders as anchor element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="https://example.com">Link</a>
        </Button>
      );
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveClass('btn');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('applies button classes to asChild element', () => {
      render(
        <Button asChild variant="filled" color="primary" size="lg">
          <a href="#">Click me</a>
        </Button>
      );
      const link = screen.getByRole('link', { name: /click me/i });
      expect(link).toHaveClass('btn', 'btn-primary', 'btn-lg');
    });

    it('preserves child element attributes', () => {
      render(
        <Button asChild>
          <a href="/test" className="custom-link">
            Link
          </a>
        </Button>
      );
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('custom-link');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Button.displayName).toBe('Button');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole('button', { name: /button/i });

      // Focus and press Enter
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('supports aria-label attribute', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      const button = screen.getByLabelText('Close dialog');
      expect(button).toBeInTheDocument();
    });

    it('supports aria-describedby attribute', () => {
      render(
        <>
          <Button aria-describedby="button-help">Button</Button>
          <span id="button-help">This is helpful text</span>
        </>
      );
      const button = screen.getByRole('button', { name: /button/i });
      expect(button).toHaveAttribute('aria-describedby', 'button-help');
    });

    it('has proper role attribute', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button', { name: /button/i });
      expect(button.tagName).toBe('BUTTON');
    });
  });
});

describe('buttonVariants', () => {
  it('generates correct default classes', () => {
    const classes = buttonVariants();
    expect(classes).toContain('btn');
    expect(classes).toContain('btn-primary'); // default color
  });

  it('generates classes for variant + color combinations', () => {
    const combinations = [
      { variant: 'filled' as const, color: 'primary' as const, expected: 'btn-primary' },
      { variant: 'subtle' as const, color: 'success' as const, expected: 'btn-subtle-success' },
      { variant: 'outline' as const, color: 'danger' as const, expected: 'btn-outline-danger' },
      { variant: 'text' as const, color: 'info' as const, expected: 'btn-text-info' },
      { variant: 'icon' as const, color: 'warning' as const, expected: 'btn-icon-warning' },
    ];

    combinations.forEach(({ variant, color, expected }) => {
      const classes = buttonVariants({ variant, color });
      expect(classes).toContain('btn');
      expect(classes).toContain(expected);
    });
  });

  it('generates classes for all size options', () => {
    const sizeTests = [
      { size: 'sm' as const, expected: 'btn-sm' },
      { size: 'md' as const, expected: '' }, // default, no class
      { size: 'lg' as const, expected: 'btn-lg' },
    ];

    sizeTests.forEach(({ size, expected }) => {
      const classes = buttonVariants({ size });
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates classes for all shape options', () => {
    const shapeTests = [
      { shape: 'default' as const, expected: '' }, // no class
      { shape: 'square' as const, expected: 'btn-square' },
      { shape: 'circle' as const, expected: 'btn-circle' },
    ];

    shapeTests.forEach(({ shape, expected }) => {
      const classes = buttonVariants({ shape });
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('combines variant, color, size, and shape', () => {
    const classes = buttonVariants({
      variant: 'outline',
      color: 'success',
      size: 'lg',
      shape: 'circle',
    });

    expect(classes).toContain('btn');
    expect(classes).toContain('btn-outline-success');
    expect(classes).toContain('btn-lg');
    expect(classes).toContain('btn-circle');
  });
});
