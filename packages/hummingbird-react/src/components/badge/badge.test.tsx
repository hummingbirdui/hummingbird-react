import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge, BadgeActionButton, badgeVariants } from './badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders a span element', () => {
      render(<Badge>New</Badge>);
      const badge = screen.getByText('New');
      expect(badge).toBeInTheDocument();
      expect(badge).toBeInstanceOf(HTMLSpanElement);
    });

    it('has data-slot attribute', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveAttribute('data-slot', 'badge');
    });

    it('renders with children elements', () => {
      render(
        <Badge>
          <span>Icon</span>
          <span>Text</span>
        </Badge>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('applies default variant classes (filled + primary + sm)', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('badge', 'badge-primary');
      expect(badge).not.toHaveClass('badge-md');
      expect(badge).not.toHaveClass('badge-lg');
    });
  });

  describe('Variants', () => {
    const variants = ['filled', 'subtle', 'outline'] as const;

    it('applies base class for every variant', () => {
      variants.forEach((variant) => {
        const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
        expect(screen.getByText(variant)).toHaveClass('badge');
        unmount();
      });
    });

    it('applies filled variant without a variant modifier class', () => {
      render(
        <Badge variant="filled" color="neutral">
          Filled
        </Badge>
      );
      const badge = screen.getByText('Filled');
      expect(badge).toHaveClass('badge');
      expect(badge).not.toHaveClass('badge-subtle');
      expect(badge).not.toHaveClass('badge-outline');
    });

    it('applies subtle variant class', () => {
      render(
        <Badge variant="subtle" color="neutral">
          Subtle
        </Badge>
      );
      expect(screen.getByText('Subtle')).toHaveClass('badge', 'badge-subtle');
    });

    it('applies outline variant class', () => {
      render(
        <Badge variant="outline" color="neutral">
          Outline
        </Badge>
      );
      expect(screen.getByText('Outline')).toHaveClass('badge', 'badge-outline');
    });
  });

  describe('Colors', () => {
    const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;

    it('applies filled variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Badge variant="filled" color={color}>
            {color}
          </Badge>
        );
        expect(screen.getByText(color)).toHaveClass('badge', `badge-${color}`);
        unmount();
      });
    });

    it('applies subtle variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Badge variant="subtle" color={color}>
            {color}
          </Badge>
        );
        expect(screen.getByText(color)).toHaveClass(
          'badge',
          'badge-subtle',
          `badge-subtle-${color}`
        );
        unmount();
      });
    });

    it('applies outline variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Badge variant="outline" color={color}>
            {color}
          </Badge>
        );
        expect(screen.getByText(color)).toHaveClass(
          'badge',
          'badge-outline',
          `badge-outline-${color}`
        );
        unmount();
      });
    });

    it('applies neutral color without a color class in every variant', () => {
      const variants = ['filled', 'subtle', 'outline'] as const;
      variants.forEach((variant) => {
        const { unmount } = render(
          <Badge variant={variant} color="neutral">
            neutral
          </Badge>
        );
        const badge = screen.getByText('neutral');
        expect(badge).toHaveClass('badge');
        expect(badge.className).not.toMatch(/neutral/);
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Badge size={size}>{size}</Badge>);
        const badge = screen.getByText(size);
        if (size === 'sm') {
          // Small is default, no class
          expect(badge).toHaveClass('badge');
          expect(badge).not.toHaveClass('badge-sm');
        } else {
          expect(badge).toHaveClass(`badge-${size}`);
        }
        unmount();
      });
    });

    it('combines variant, color, and size', () => {
      render(
        <Badge variant="outline" color="success" size="lg">
          Large Success Outline
        </Badge>
      );
      const badge = screen.getByText('Large Success Outline');
      expect(badge).toHaveClass('badge', 'badge-outline', 'badge-outline-success', 'badge-lg');
    });
  });

  describe('Link Variant', () => {
    it('applies badge-link class when link is true', () => {
      render(<Badge link>Link Badge</Badge>);
      expect(screen.getByText('Link Badge')).toHaveClass('badge', 'badge-link');
    });

    it('does not apply badge-link class by default', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge')).not.toHaveClass('badge-link');
    });

    it('combines link with asChild anchor', () => {
      render(
        <Badge asChild link>
          <a href="https://example.com">Anchor Badge</a>
        </Badge>
      );
      const link = screen.getByRole('link', { name: /anchor badge/i });
      expect(link).toHaveClass('badge', 'badge-link');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('Class Merging', () => {
    it('always includes base badge class', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveClass('badge');
    });

    it('merges custom className with variant classes', () => {
      render(
        <Badge variant="filled" color="primary" className="custom-class">
          Badge
        </Badge>
      );
      expect(screen.getByText('Badge')).toHaveClass('badge', 'badge-primary', 'custom-class');
    });

    it('allows custom classes to coexist with Tailwind utilities', () => {
      render(
        <Badge variant="subtle" color="danger" className="ml-2 text-xs">
          Badge
        </Badge>
      );
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('badge', 'badge-subtle-danger');
      expect(badge).toHaveClass('ml-2', 'text-xs');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe('Badge');
    });

    it('allows accessing element properties via ref', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current?.className).toContain('badge');
    });
  });

  describe('asChild Prop', () => {
    it('renders as anchor element when asChild is true', () => {
      render(
        <Badge asChild>
          <a href="https://example.com">Link</a>
        </Badge>
      );
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveClass('badge');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('applies badge classes to asChild element', () => {
      render(
        <Badge asChild variant="outline" color="warning" size="md">
          <a href="#">Warning</a>
        </Badge>
      );
      const link = screen.getByRole('link', { name: /warning/i });
      expect(link).toHaveClass('badge', 'badge-outline', 'badge-outline-warning', 'badge-md');
    });

    it('preserves child element attributes', () => {
      render(
        <Badge asChild>
          <a href="/test" className="custom-link">
            Link
          </a>
        </Badge>
      );
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('custom-link', 'badge');
    });
  });

  describe('Display Name', () => {
    it('has correct display names', () => {
      expect(Badge.displayName).toBe('Badge');
      expect(BadgeActionButton.displayName).toBe('BadgeActionButton');
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label attribute', () => {
      render(<Badge aria-label="3 unread messages">3</Badge>);
      expect(screen.getByLabelText('3 unread messages')).toBeInTheDocument();
    });

    it('renders as a span by default (non-interactive)', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge').tagName).toBe('SPAN');
    });
  });
});

describe('BadgeActionButton', () => {
  describe('Rendering', () => {
    it('renders a button element with the base class', () => {
      render(<BadgeActionButton aria-label="Remove" />);
      const button = screen.getByRole('button', { name: /remove/i });
      expect(button).toBeInstanceOf(HTMLButtonElement);
      expect(button).toHaveClass('badge-action-btn');
    });

    it('has data-slot attribute', () => {
      render(<BadgeActionButton aria-label="Remove" />);
      expect(screen.getByRole('button', { name: /remove/i })).toHaveAttribute(
        'data-slot',
        'badge-action-btn'
      );
    });

    it('defaults to type="button"', () => {
      render(<BadgeActionButton aria-label="Remove" />);
      expect(screen.getByRole('button', { name: /remove/i })).toHaveAttribute('type', 'button');
    });

    it('allows overriding the type attribute', () => {
      render(<BadgeActionButton aria-label="Submit" type="submit" />);
      expect(screen.getByRole('button', { name: /submit/i })).toHaveAttribute('type', 'submit');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<BadgeActionButton aria-label="Remove" onClick={handleClick} />);
      await user.click(screen.getByRole('button', { name: /remove/i }));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('supports disabled state', () => {
      render(<BadgeActionButton aria-label="Remove" disabled />);
      expect(screen.getByRole('button', { name: /remove/i })).toBeDisabled();
    });

    it('does not fire click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<BadgeActionButton aria-label="Remove" disabled onClick={handleClick} />);
      await user.click(screen.getByRole('button', { name: /remove/i }));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('is keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<BadgeActionButton aria-label="Remove" onClick={handleClick} />);
      screen.getByRole('button', { name: /remove/i }).focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with the base class', () => {
      render(<BadgeActionButton aria-label="Remove" className="custom-action" />);
      expect(screen.getByRole('button', { name: /remove/i })).toHaveClass(
        'badge-action-btn',
        'custom-action'
      );
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<BadgeActionButton ref={ref} aria-label="Remove" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.className).toContain('badge-action-btn');
    });
  });
});

describe('badgeVariants', () => {
  it('generates correct default classes', () => {
    const classes = badgeVariants();
    expect(classes).toContain('badge');
    expect(classes).toContain('badge-primary'); // default filled + primary
  });

  it('generates classes for variant + color combinations', () => {
    const combinations = [
      { variant: 'filled' as const, color: 'success' as const, expected: 'badge-success' },
      { variant: 'subtle' as const, color: 'danger' as const, expected: 'badge-subtle-danger' },
      { variant: 'outline' as const, color: 'info' as const, expected: 'badge-outline-info' },
      { variant: 'subtle' as const, color: 'warning' as const, expected: 'badge-subtle-warning' },
      {
        variant: 'outline' as const,
        color: 'secondary' as const,
        expected: 'badge-outline-secondary',
      },
    ];

    combinations.forEach(({ variant, color, expected }) => {
      const classes = badgeVariants({ variant, color });
      expect(classes).toContain('badge');
      expect(classes).toContain(expected);
    });
  });

  it('generates classes for all size options', () => {
    const sizeTests = [
      { size: 'sm' as const, expected: '' }, // default, no class
      { size: 'md' as const, expected: 'badge-md' },
      { size: 'lg' as const, expected: 'badge-lg' },
    ];

    sizeTests.forEach(({ size, expected }) => {
      const classes = badgeVariants({ size });
      if (expected) {
        expect(classes).toContain(expected);
      }
    });
  });

  it('generates the link class', () => {
    expect(badgeVariants({ link: true })).toContain('badge-link');
    expect(badgeVariants({ link: false })).not.toContain('badge-link');
  });

  it('generates only the base class for neutral color', () => {
    const classes = badgeVariants({ variant: 'filled', color: 'neutral' });
    expect(classes).toContain('badge');
    expect(classes).not.toMatch(/neutral/);
  });

  it('combines variant, color, size, and link', () => {
    const classes = badgeVariants({
      variant: 'outline',
      color: 'success',
      size: 'lg',
      link: true,
    });

    expect(classes).toContain('badge');
    expect(classes).toContain('badge-outline-success');
    expect(classes).toContain('badge-lg');
    expect(classes).toContain('badge-link');
  });
});
