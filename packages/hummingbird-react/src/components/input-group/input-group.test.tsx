import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputGroup, inputGroupVariants } from './input-group';
import { FormControl } from '../form-control';
import { Button } from '../button';

describe('InputGroup', () => {
  describe('Rendering', () => {
    it('renders a div element with role group', () => {
      render(<InputGroup aria-label="Amount">Content</InputGroup>);
      const group = screen.getByRole('group', { name: /amount/i });
      expect(group).toBeInTheDocument();
      expect(group).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with data-slot attribute', () => {
      render(<InputGroup>Content</InputGroup>);
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('data-slot', 'input-group');
    });

    it('composes a text addon with a form control', () => {
      render(
        <InputGroup>
          <InputGroup.Text>@</InputGroup.Text>
          <FormControl placeholder="Username" />
        </InputGroup>
      );
      const group = screen.getByRole('group');
      const addon = screen.getByText('@');
      const input = screen.getByPlaceholderText('Username');
      expect(group).toContainElement(addon);
      expect(group).toContainElement(input);
      expect(input).toHaveClass('form-control');
    });

    it('composes leading and trailing addons around a control', () => {
      render(
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <FormControl placeholder="Amount" />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
      );
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('.00')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    });

    it('composes a button addon with a control', async () => {
      const user = userEvent.setup();
      render(
        <InputGroup>
          <FormControl placeholder="Search" />
          <Button>Go</Button>
        </InputGroup>
      );
      const input = screen.getByPlaceholderText('Search');
      const button = screen.getByRole('button', { name: /go/i });
      expect(button).toHaveClass('btn');

      await user.type(input, 'hello');
      expect(input).toHaveValue('hello');
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<InputGroup size={size}>{size}</InputGroup>);
        const group = screen.getByRole('group');
        expect(group).toHaveClass('input-group');
        if (size !== 'md') {
          expect(group).toHaveClass(`input-group-${size}`);
        } else {
          // Medium is default, no size class
          expect(group).not.toHaveClass('input-group-sm');
          expect(group).not.toHaveClass('input-group-lg');
        }
        unmount();
      });
    });
  });

  describe('Class Merging', () => {
    it('always includes base input-group class', () => {
      render(<InputGroup>Content</InputGroup>);
      expect(screen.getByRole('group')).toHaveClass('input-group');
    });

    it('merges custom className with variant classes', () => {
      render(
        <InputGroup size="lg" className="custom-class">
          Content
        </InputGroup>
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('input-group', 'input-group-lg', 'custom-class');
    });

    it('allows custom Tailwind utilities alongside group classes', () => {
      render(<InputGroup className="w-full max-w-sm">Content</InputGroup>);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('input-group', 'w-full', 'max-w-sm');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<InputGroup ref={ref}>Content</InputGroup>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Content');
    });

    it('allows accessing element properties via ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<InputGroup ref={ref}>Content</InputGroup>);
      expect(ref.current?.className).toContain('input-group');
      expect(ref.current?.getAttribute('role')).toBe('group');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(InputGroup.displayName).toBe('InputGroup');
    });
  });

  describe('Accessibility', () => {
    it('has role group', () => {
      render(<InputGroup>Content</InputGroup>);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('supports aria-label attribute', () => {
      render(<InputGroup aria-label="Price input">Content</InputGroup>);
      expect(screen.getByLabelText('Price input')).toBeInTheDocument();
    });

    it('addon can describe the control via aria-describedby', () => {
      render(
        <InputGroup>
          <InputGroup.Text id="basic-addon">@</InputGroup.Text>
          <FormControl placeholder="Username" aria-describedby="basic-addon" />
        </InputGroup>
      );
      const input = screen.getByPlaceholderText('Username');
      expect(input).toHaveAttribute('aria-describedby', 'basic-addon');
      expect(input).toHaveAccessibleDescription('@');
    });
  });
});

describe('InputGroup.Text', () => {
  describe('Rendering', () => {
    it('renders a span element with the addon text', () => {
      render(<InputGroup.Text>@</InputGroup.Text>);
      const addon = screen.getByText('@');
      expect(addon).toBeInTheDocument();
      expect(addon).toBeInstanceOf(HTMLSpanElement);
    });

    it('renders with input-group-text class and data-slot attribute', () => {
      render(<InputGroup.Text>@</InputGroup.Text>);
      const addon = screen.getByText('@');
      expect(addon).toHaveClass('input-group-text');
      expect(addon).toHaveAttribute('data-slot', 'input-group-text');
    });

    it('renders children elements', () => {
      render(
        <InputGroup.Text>
          <svg data-testid="addon-icon" />
        </InputGroup.Text>
      );
      expect(screen.getByTestId('addon-icon')).toBeInTheDocument();
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with the base class', () => {
      render(<InputGroup.Text className="custom-addon">@</InputGroup.Text>);
      const addon = screen.getByText('@');
      expect(addon).toHaveClass('input-group-text', 'custom-addon');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<InputGroup.Text ref={ref}>@</InputGroup.Text>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.className).toContain('input-group-text');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(InputGroup.Text.displayName).toBe('InputGroup.Text');
    });
  });
});

describe('inputGroupVariants', () => {
  it('generates correct default classes', () => {
    const classes = inputGroupVariants();
    expect(classes).toContain('input-group');
    expect(classes).not.toContain('input-group-sm');
    expect(classes).not.toContain('input-group-lg');
  });

  it('generates classes for all size options', () => {
    const sizeTests = [
      { size: 'sm' as const, expected: 'input-group-sm' },
      { size: 'md' as const, expected: '' }, // default, no class
      { size: 'lg' as const, expected: 'input-group-lg' },
    ];

    sizeTests.forEach(({ size, expected }) => {
      const classes = inputGroupVariants({ size });
      expect(classes).toContain('input-group');
      if (expected) {
        expect(classes).toContain(expected);
      } else {
        expect(classes).toBe('input-group');
      }
    });
  });
});
