import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGroup, ButtonToolbar, buttonGroupVariants } from './button-group';
import { Button } from '../button';

describe('ButtonGroup', () => {
  describe('Rendering', () => {
    it('renders a div element with role group', () => {
      render(<ButtonGroup aria-label="Actions">Content</ButtonGroup>);
      const group = screen.getByRole('group', { name: /actions/i });
      expect(group).toBeInTheDocument();
      expect(group).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with data-slot attribute', () => {
      render(<ButtonGroup>Content</ButtonGroup>);
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('data-slot', 'button-group');
    });

    it('renders Button children', () => {
      render(
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      );
      const group = screen.getByRole('group');
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      buttons.forEach((button) => {
        expect(group).toContainElement(button);
        expect(button).toHaveClass('btn');
      });
      expect(screen.getByRole('button', { name: /left/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /middle/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /right/i })).toBeInTheDocument();
    });

    it('buttons inside a group remain clickable', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <ButtonGroup>
          <Button onClick={handleClick}>First</Button>
          <Button>Second</Button>
        </ButtonGroup>
      );

      await user.click(screen.getByRole('button', { name: /first/i }));
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe('Orientation', () => {
    const orientations = ['horizontal', 'vertical'] as const;

    it('applies btn-group class by default (horizontal)', () => {
      render(<ButtonGroup>Content</ButtonGroup>);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('btn-group');
      expect(group).not.toHaveClass('btn-group-vertical');
    });

    it('applies btn-group-vertical for vertical orientation', () => {
      render(<ButtonGroup orientation="vertical">Content</ButtonGroup>);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('btn-group-vertical');
      expect(group).not.toHaveClass('btn-group');
    });

    it('applies the correct base class for each orientation', () => {
      orientations.forEach((orientation) => {
        const { unmount } = render(
          <ButtonGroup orientation={orientation}>{orientation}</ButtonGroup>
        );
        const group = screen.getByRole('group');
        expect(group).toHaveClass(
          orientation === 'horizontal' ? 'btn-group' : 'btn-group-vertical'
        );
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<ButtonGroup size={size}>{size}</ButtonGroup>);
        const group = screen.getByRole('group');
        expect(group).toHaveClass('btn-group');
        if (size !== 'md') {
          expect(group).toHaveClass(`btn-group-${size}`);
        } else {
          // Medium is default, no size class
          expect(group).not.toHaveClass('btn-group-sm');
          expect(group).not.toHaveClass('btn-group-lg');
        }
        unmount();
      });
    });

    it('combines vertical orientation with size classes', () => {
      sizes.forEach((size) => {
        const { unmount } = render(
          <ButtonGroup orientation="vertical" size={size}>
            {size}
          </ButtonGroup>
        );
        const group = screen.getByRole('group');
        expect(group).toHaveClass('btn-group-vertical');
        if (size !== 'md') {
          expect(group).toHaveClass(`btn-group-${size}`);
        }
        unmount();
      });
    });
  });

  describe('Class Merging', () => {
    it('always includes base btn-group class', () => {
      render(<ButtonGroup>Content</ButtonGroup>);
      expect(screen.getByRole('group')).toHaveClass('btn-group');
    });

    it('merges custom className with variant classes', () => {
      render(
        <ButtonGroup size="lg" className="custom-class">
          Content
        </ButtonGroup>
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('btn-group', 'btn-group-lg', 'custom-class');
    });

    it('allows custom Tailwind utilities alongside group classes', () => {
      render(<ButtonGroup className="gap-4 p-2">Content</ButtonGroup>);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('btn-group', 'gap-4', 'p-2');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ButtonGroup ref={ref}>Content</ButtonGroup>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Content');
    });

    it('allows accessing element properties via ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ButtonGroup ref={ref}>Content</ButtonGroup>);
      expect(ref.current?.className).toContain('btn-group');
      expect(ref.current?.getAttribute('role')).toBe('group');
    });
  });

  describe('asChild Prop', () => {
    it('renders as the child element when asChild is true', () => {
      render(
        <ButtonGroup asChild>
          <nav aria-label="Group nav">Content</nav>
        </ButtonGroup>
      );
      const group = screen.getByRole('group', { name: /group nav/i });
      expect(group.tagName).toBe('NAV');
      expect(group).toHaveClass('btn-group');
      expect(group).toHaveAttribute('data-slot', 'button-group');
    });

    it('preserves child element attributes and classes', () => {
      render(
        <ButtonGroup asChild size="sm">
          <section className="custom-section">Content</section>
        </ButtonGroup>
      );
      const group = screen.getByRole('group');
      expect(group.tagName).toBe('SECTION');
      expect(group).toHaveClass('btn-group', 'btn-group-sm', 'custom-section');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(ButtonGroup.displayName).toBe('ButtonGroup');
    });
  });

  describe('Accessibility', () => {
    it('has role group', () => {
      render(<ButtonGroup>Content</ButtonGroup>);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('supports aria-label attribute', () => {
      render(<ButtonGroup aria-label="Text formatting">Content</ButtonGroup>);
      expect(screen.getByLabelText('Text formatting')).toBeInTheDocument();
    });

    it('buttons within the group are keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <ButtonGroup>
          <Button onClick={handleClick}>Action</Button>
        </ButtonGroup>
      );

      const button = screen.getByRole('button', { name: /action/i });
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

describe('ButtonToolbar', () => {
  describe('Rendering', () => {
    it('renders a div element with role toolbar', () => {
      render(<ButtonToolbar aria-label="Toolbar">Content</ButtonToolbar>);
      const toolbar = screen.getByRole('toolbar', { name: /toolbar/i });
      expect(toolbar).toBeInTheDocument();
      expect(toolbar).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with btn-toolbar class and data-slot attribute', () => {
      render(<ButtonToolbar>Content</ButtonToolbar>);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('btn-toolbar');
      expect(toolbar).toHaveAttribute('data-slot', 'button-toolbar');
    });

    it('wraps multiple button groups', () => {
      render(
        <ButtonToolbar aria-label="Editor toolbar">
          <ButtonGroup aria-label="First group">
            <Button>1</Button>
            <Button>2</Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Second group">
            <Button>3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      );
      const toolbar = screen.getByRole('toolbar');
      const groups = screen.getAllByRole('group');
      expect(groups).toHaveLength(2);
      groups.forEach((group) => expect(toolbar).toContainElement(group));
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });
  });

  describe('Class Merging', () => {
    it('merges custom className with the base class', () => {
      render(<ButtonToolbar className="custom-toolbar">Content</ButtonToolbar>);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('btn-toolbar', 'custom-toolbar');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ButtonToolbar ref={ref}>Content</ButtonToolbar>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('btn-toolbar');
    });
  });

  describe('asChild Prop', () => {
    it('renders as the child element when asChild is true', () => {
      render(
        <ButtonToolbar asChild>
          <section className="custom-section">Content</section>
        </ButtonToolbar>
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.tagName).toBe('SECTION');
      expect(toolbar).toHaveClass('btn-toolbar', 'custom-section');
      expect(toolbar).toHaveAttribute('data-slot', 'button-toolbar');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(ButtonToolbar.displayName).toBe('ButtonToolbar');
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label attribute', () => {
      render(<ButtonToolbar aria-label="Formatting toolbar">Content</ButtonToolbar>);
      expect(screen.getByLabelText('Formatting toolbar')).toBeInTheDocument();
    });
  });
});

describe('buttonGroupVariants', () => {
  it('generates correct default classes', () => {
    const classes = buttonGroupVariants();
    expect(classes).toContain('btn-group');
    expect(classes).not.toContain('btn-group-vertical');
    expect(classes).not.toContain('btn-group-sm');
    expect(classes).not.toContain('btn-group-lg');
  });

  it('generates classes for each orientation', () => {
    expect(buttonGroupVariants({ orientation: 'horizontal' })).toContain('btn-group');
    expect(buttonGroupVariants({ orientation: 'vertical' })).toContain('btn-group-vertical');
  });

  it('generates classes for all size options', () => {
    const sizeTests = [
      { size: 'sm' as const, expected: 'btn-group-sm' },
      { size: 'md' as const, expected: '' }, // default, no class
      { size: 'lg' as const, expected: 'btn-group-lg' },
    ];

    sizeTests.forEach(({ size, expected }) => {
      const classes = buttonGroupVariants({ size });
      if (expected) {
        expect(classes).toContain(expected);
      } else {
        expect(classes).toBe('btn-group');
      }
    });
  });

  it('combines orientation and size', () => {
    const classes = buttonGroupVariants({ orientation: 'vertical', size: 'lg' });
    expect(classes).toContain('btn-group-vertical');
    expect(classes).toContain('btn-group-lg');
  });
});
