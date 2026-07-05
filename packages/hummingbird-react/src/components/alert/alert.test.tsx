import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertIcon, alertVariants } from './alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders a div with role alert', () => {
      render(<Alert>Alert message</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toBeInstanceOf(HTMLDivElement);
      expect(alert).toHaveTextContent('Alert message');
    });

    it('has data-slot attribute', () => {
      render(<Alert>Alert</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert');
    });

    it('renders with children elements', () => {
      render(
        <Alert>
          <span>Icon</span>
          <span>Text</span>
        </Alert>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('applies default variant classes (filled + primary)', () => {
      render(<Alert>Default</Alert>);
      expect(screen.getByRole('alert')).toHaveClass('alert', 'alert-primary');
    });
  });

  describe('Variants', () => {
    const variants = ['filled', 'subtle', 'outline'] as const;

    it('applies base class for every variant', () => {
      variants.forEach((variant) => {
        const { unmount } = render(<Alert variant={variant}>{variant}</Alert>);
        expect(screen.getByRole('alert')).toHaveClass('alert');
        unmount();
      });
    });

    it('applies filled variant without a variant modifier class', () => {
      render(
        <Alert variant="filled" color="neutral">
          Filled
        </Alert>
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('alert');
      expect(alert).not.toHaveClass('alert-subtle');
      expect(alert).not.toHaveClass('alert-outline');
    });

    it('applies subtle variant class', () => {
      render(
        <Alert variant="subtle" color="neutral">
          Subtle
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveClass('alert', 'alert-subtle');
    });

    it('applies outline variant class', () => {
      render(
        <Alert variant="outline" color="neutral">
          Outline
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveClass('alert', 'alert-outline');
    });
  });

  describe('Colors', () => {
    const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;

    it('applies filled variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Alert variant="filled" color={color}>
            {color}
          </Alert>
        );
        expect(screen.getByRole('alert')).toHaveClass('alert', `alert-${color}`);
        unmount();
      });
    });

    it('applies subtle variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Alert variant="subtle" color={color}>
            {color}
          </Alert>
        );
        expect(screen.getByRole('alert')).toHaveClass('alert', 'alert-subtle', `alert-subtle-${color}`);
        unmount();
      });
    });

    it('applies outline variant with all color options', () => {
      colors.forEach((color) => {
        const { unmount } = render(
          <Alert variant="outline" color={color}>
            {color}
          </Alert>
        );
        expect(screen.getByRole('alert')).toHaveClass('alert', 'alert-outline', `alert-outline-${color}`);
        unmount();
      });
    });

    it('applies neutral color without a color class in every variant', () => {
      const variants = ['filled', 'subtle', 'outline'] as const;
      variants.forEach((variant) => {
        const { unmount } = render(
          <Alert variant={variant} color="neutral">
            neutral
          </Alert>
        );
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('alert');
        expect(alert.className).not.toMatch(/neutral/);
        unmount();
      });
    });
  });

  describe('Class Merging', () => {
    it('always includes base alert class', () => {
      render(<Alert>Alert</Alert>);
      expect(screen.getByRole('alert')).toHaveClass('alert');
    });

    it('merges custom className with variant classes', () => {
      render(
        <Alert variant="filled" color="primary" className="custom-class">
          Alert
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveClass('alert', 'alert-primary', 'custom-class');
    });

    it('allows custom classes to coexist with Tailwind utilities', () => {
      render(
        <Alert variant="subtle" color="success" className="mt-4 text-red-500">
          Alert
        </Alert>
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('alert', 'alert-subtle-success');
      expect(alert).toHaveClass('mt-4', 'text-red-500');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Alert</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Alert');
    });

    it('allows accessing element properties via ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Alert</Alert>);
      expect(ref.current?.className).toContain('alert');
      expect(ref.current?.getAttribute('role')).toBe('alert');
    });
  });

  describe('asChild Prop', () => {
    it('renders as the child element when asChild is true', () => {
      render(
        <Alert asChild>
          <section>Section alert</section>
        </Alert>
      );
      const alert = screen.getByRole('alert');
      expect(alert.tagName).toBe('SECTION');
      expect(alert).toHaveClass('alert', 'alert-primary');
    });

    it('applies variant classes to the asChild element', () => {
      render(
        <Alert asChild variant="outline" color="danger">
          <article>Danger</article>
        </Alert>
      );
      const alert = screen.getByRole('alert');
      expect(alert.tagName).toBe('ARTICLE');
      expect(alert).toHaveClass('alert', 'alert-outline', 'alert-outline-danger');
    });

    it('preserves child element attributes and classes', () => {
      render(
        <Alert asChild>
          <div id="my-alert" className="custom-child">
            Alert
          </div>
        </Alert>
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('id', 'my-alert');
      expect(alert).toHaveClass('custom-child', 'alert');
    });
  });

  describe('Display Name', () => {
    it('has correct display names', () => {
      expect(Alert.displayName).toBe('Alert');
      expect(AlertIcon.displayName).toBe('AlertIcon');
    });
  });

  describe('Accessibility', () => {
    it('has role alert', () => {
      render(<Alert>Important</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('supports aria-label attribute', () => {
      render(<Alert aria-label="Status message">Alert</Alert>);
      expect(screen.getByLabelText('Status message')).toBeInTheDocument();
    });

    it('supports aria-live attribute', () => {
      render(<Alert aria-live="polite">Alert</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
    });
  });
});

describe('AlertIcon', () => {
  describe('Rendering', () => {
    it('renders a span with the alert-icon class', () => {
      render(<AlertIcon data-testid="icon">!</AlertIcon>);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInstanceOf(HTMLSpanElement);
      expect(icon).toHaveClass('alert-icon');
      expect(icon).toHaveTextContent('!');
    });

    it('has data-slot attribute', () => {
      render(<AlertIcon data-testid="icon" />);
      expect(screen.getByTestId('icon')).toHaveAttribute('data-slot', 'alert-icon');
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with the base class', () => {
      render(<AlertIcon data-testid="icon" className="custom-icon" />);
      expect(screen.getByTestId('icon')).toHaveClass('alert-icon', 'custom-icon');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<AlertIcon ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.className).toContain('alert-icon');
    });
  });

  describe('asChild Prop', () => {
    it('renders as the child element when asChild is true', () => {
      render(
        <AlertIcon asChild>
          <svg data-testid="svg-icon" />
        </AlertIcon>
      );
      const icon = screen.getByTestId('svg-icon');
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveClass('alert-icon');
    });

    it('preserves child element attributes and classes', () => {
      render(
        <AlertIcon asChild>
          <i data-testid="icon" className="fa fa-info" />
        </AlertIcon>
      );
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('alert-icon', 'fa', 'fa-info');
    });
  });
});

describe('alertVariants', () => {
  it('generates correct default classes', () => {
    const classes = alertVariants();
    expect(classes).toContain('alert');
    expect(classes).toContain('alert-primary'); // default filled + primary
  });

  it('generates classes for variant + color combinations', () => {
    const combinations = [
      { variant: 'filled' as const, color: 'success' as const, expected: 'alert-success' },
      { variant: 'subtle' as const, color: 'danger' as const, expected: 'alert-subtle-danger' },
      { variant: 'outline' as const, color: 'info' as const, expected: 'alert-outline-info' },
      { variant: 'subtle' as const, color: 'warning' as const, expected: 'alert-subtle-warning' },
      { variant: 'outline' as const, color: 'secondary' as const, expected: 'alert-outline-secondary' },
    ];

    combinations.forEach(({ variant, color, expected }) => {
      const classes = alertVariants({ variant, color });
      expect(classes).toContain('alert');
      expect(classes).toContain(expected);
    });
  });

  it('generates only the base class for neutral color', () => {
    const classes = alertVariants({ variant: 'filled', color: 'neutral' });
    expect(classes).toContain('alert');
    expect(classes).not.toMatch(/neutral/);
  });

  it('includes variant modifier class for subtle and outline', () => {
    expect(alertVariants({ variant: 'subtle', color: 'neutral' })).toContain('alert-subtle');
    expect(alertVariants({ variant: 'outline', color: 'neutral' })).toContain('alert-outline');
  });
});
