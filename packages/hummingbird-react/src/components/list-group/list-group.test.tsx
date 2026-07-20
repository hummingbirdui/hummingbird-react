import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ListGroup,
  ListGroupItem,
  ListText,
  listGroupVariants,
  listGroupItemVariants,
  listTextVariants,
} from './list-group';

describe('ListGroup', () => {
  describe('Rendering', () => {
    it('renders a ul with the list-group class', () => {
      render(
        <ListGroup>
          <ListGroupItem>Item one</ListGroupItem>
        </ListGroup>
      );
      const list = screen.getByRole('list');
      expect(list).toBeInstanceOf(HTMLUListElement);
      expect(list).toHaveClass('list-group');
      expect(list).toHaveAttribute('data-slot', 'list-group');
    });

    it('renders items as li elements', () => {
      render(
        <ListGroup>
          <ListGroupItem>First</ListGroupItem>
          <ListGroupItem>Second</ListGroupItem>
        </ListGroup>
      );
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(2);
      expect(items[0]).toBeInstanceOf(HTMLLIElement);
      expect(items[0]).toHaveTextContent('First');
      expect(items[1]).toHaveTextContent('Second');
    });

    it('renders list text content', () => {
      render(
        <ListGroup>
          <ListGroupItem>
            <ListText>Primary text</ListText>
            <ListText variant="secondary">Secondary text</ListText>
          </ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByText('Primary text')).toBeInTheDocument();
      expect(screen.getByText('Secondary text')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies list-group-item and data-slot to items', () => {
      render(
        <ListGroup>
          <ListGroupItem>Item</ListGroupItem>
        </ListGroup>
      );
      const item = screen.getByRole('listitem');
      expect(item).toHaveClass('list-group-item');
      expect(item).toHaveAttribute('data-slot', 'list-group-item');
    });

    it('renders ListText as a paragraph with data-slot', () => {
      render(<ListText>Text</ListText>);
      const text = screen.getByText('Text');
      expect(text).toBeInstanceOf(HTMLParagraphElement);
      expect(text).toHaveAttribute('data-slot', 'list-text');
    });
  });

  describe('Variants', () => {
    it('applies no numbered class by default', () => {
      render(<ListGroup data-testid="list" />);
      expect(screen.getByTestId('list').className.trim()).toBe('list-group');
    });

    it('applies list-group-numbered when numbered', () => {
      render(<ListGroup numbered data-testid="list" />);
      expect(screen.getByTestId('list')).toHaveClass('list-group', 'list-group-numbered');
    });

    it('applies list-group-item-action when action', () => {
      render(
        <ListGroup>
          <ListGroupItem action>Item</ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByRole('listitem')).toHaveClass('list-group-item', 'list-group-item-action');
    });

    it('applies list-group-item-pinned when pinned', () => {
      render(
        <ListGroup>
          <ListGroupItem pinned>Item</ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByRole('listitem')).toHaveClass('list-group-item', 'list-group-item-pinned');
    });

    it('applies no extra classes on a plain item', () => {
      render(
        <ListGroup>
          <ListGroupItem>Item</ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByRole('listitem').className.trim()).toBe('list-group-item');
    });
  });

  describe('States', () => {
    it('applies active class and aria-current', () => {
      render(
        <ListGroup>
          <ListGroupItem active>Active item</ListGroupItem>
        </ListGroup>
      );
      const item = screen.getByRole('listitem');
      expect(item).toHaveClass('list-group-item', 'active');
      expect(item).toHaveAttribute('aria-current', 'true');
    });

    it('applies disabled class and aria-disabled', () => {
      render(
        <ListGroup>
          <ListGroupItem disabled>Disabled item</ListGroupItem>
        </ListGroup>
      );
      const item = screen.getByRole('listitem');
      expect(item).toHaveClass('list-group-item', 'disabled');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets neither aria attribute by default', () => {
      render(
        <ListGroup>
          <ListGroupItem>Item</ListGroupItem>
        </ListGroup>
      );
      const item = screen.getByRole('listitem');
      expect(item).not.toHaveAttribute('aria-current');
      expect(item).not.toHaveAttribute('aria-disabled');
    });

    it('combines action, active, and pinned', () => {
      render(
        <ListGroup>
          <ListGroupItem action pinned active>
            Item
          </ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByRole('listitem')).toHaveClass(
        'list-group-item',
        'list-group-item-action',
        'list-group-item-pinned',
        'active'
      );
    });
  });

  describe('ListText Variants', () => {
    const variants = [
      { variant: 'primary', expected: 'list-text-primary' },
      { variant: 'secondary', expected: 'list-text-secondary' },
    ] as const;

    it('applies variant classes correctly', () => {
      variants.forEach(({ variant, expected }) => {
        const { unmount } = render(<ListText variant={variant}>{variant}</ListText>);
        expect(screen.getByText(variant)).toHaveClass(expected);
        unmount();
      });
    });

    it('defaults to the primary variant', () => {
      render(<ListText>Default</ListText>);
      expect(screen.getByText('Default')).toHaveClass('list-text-primary');
    });
  });

  describe('Interactions', () => {
    it('handles clicks on an action item', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <ListGroup>
          <ListGroupItem action onClick={handleClick}>
            Clickable
          </ListGroupItem>
        </ListGroup>
      );

      await user.click(screen.getByRole('listitem'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('renders an action item as a button via asChild and fires clicks', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <ListGroup>
          <ListGroupItem action asChild onClick={handleClick}>
            <button type="button">Button item</button>
          </ListGroupItem>
        </ListGroup>
      );

      const button = screen.getByRole('button', { name: /button item/i });
      expect(button).toHaveClass('list-group-item', 'list-group-item-action');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('does not fire clicks on a disabled asChild button item', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <ListGroup>
          <ListGroupItem action disabled asChild onClick={handleClick}>
            <button type="button" disabled>
              Disabled item
            </button>
          </ListGroupItem>
        </ListGroup>
      );

      const button = screen.getByRole('button', { name: /disabled item/i });
      expect(button).toBeDisabled();
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Class Merging', () => {
    it('merges custom className on the list', () => {
      render(<ListGroup numbered className="custom-list" data-testid="list" />);
      expect(screen.getByTestId('list')).toHaveClass(
        'list-group',
        'list-group-numbered',
        'custom-list'
      );
    });

    it('merges custom className on an item', () => {
      render(
        <ListGroup>
          <ListGroupItem action active className="custom-item">
            Item
          </ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByRole('listitem')).toHaveClass(
        'list-group-item',
        'list-group-item-action',
        'active',
        'custom-item'
      );
    });

    it('merges custom className on ListText', () => {
      render(
        <ListText variant="secondary" className="custom-text">
          Text
        </ListText>
      );
      expect(screen.getByText('Text')).toHaveClass('list-text-secondary', 'custom-text');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the ul element', () => {
      const ref = React.createRef<HTMLUListElement>();
      render(<ListGroup ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
      expect(ref.current?.className).toContain('list-group');
    });

    it('forwards ref to the li element', () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <ListGroup>
          <ListGroupItem ref={ref}>Item</ListGroupItem>
        </ListGroup>
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
      expect(ref.current?.textContent).toBe('Item');
    });

    it('forwards ref to the ListText element', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<ListText ref={ref}>Text</ListText>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('asChild Prop', () => {
    it('renders the list as a nav via asChild', () => {
      render(
        <ListGroup asChild>
          <nav aria-label="Sidebar" />
        </ListGroup>
      );
      const nav = screen.getByRole('navigation', { name: /sidebar/i });
      expect(nav).toHaveClass('list-group');
      expect(nav).toHaveAttribute('data-slot', 'list-group');
    });

    it('renders an item as an anchor and preserves its attributes', () => {
      render(
        <ListGroup asChild>
          <div>
            <ListGroupItem action asChild>
              <a href="/first" className="custom-link">
                Link item
              </a>
            </ListGroupItem>
          </div>
        </ListGroup>
      );
      const link = screen.getByRole('link', { name: /link item/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveClass('list-group-item', 'list-group-item-action', 'custom-link');
      expect(link).toHaveAttribute('href', '/first');
    });

    it('keeps aria-current on an active asChild anchor', () => {
      render(
        <ListGroup asChild>
          <div>
            <ListGroupItem action active asChild>
              <a href="/current">Current</a>
            </ListGroupItem>
          </div>
        </ListGroup>
      );
      const link = screen.getByRole('link', { name: /current/i });
      expect(link).toHaveAttribute('aria-current', 'true');
      expect(link).toHaveClass('active');
    });
  });

  describe('Display Name', () => {
    it.each([
      [ListGroup, 'ListGroup'],
      [ListGroupItem, 'ListGroupItem'],
      [ListText, 'ListText'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes list and listitem roles', () => {
      render(
        <ListGroup>
          <ListGroupItem>One</ListGroupItem>
          <ListGroupItem>Two</ListGroupItem>
        </ListGroup>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('is keyboard accessible when an item is a button', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <ListGroup>
          <ListGroupItem action asChild onClick={handleClick}>
            <button type="button">Item</button>
          </ListGroupItem>
        </ListGroup>
      );

      const button = screen.getByRole('button', { name: /item/i });
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('supports aria-label on the list', () => {
      render(<ListGroup aria-label="Recent files" />);
      expect(screen.getByRole('list', { name: /recent files/i })).toBeInTheDocument();
    });
  });
});

describe('listGroupVariants', () => {
  it('generates the base class by default', () => {
    expect(listGroupVariants().trim()).toBe('list-group');
  });

  it('generates the numbered class', () => {
    expect(listGroupVariants({ numbered: true })).toContain('list-group-numbered');
    expect(listGroupVariants({ numbered: false }).trim()).toBe('list-group');
  });
});

describe('listGroupItemVariants', () => {
  it('generates the base class by default', () => {
    expect(listGroupItemVariants().trim()).toBe('list-group-item');
  });

  it('generates action and pinned classes', () => {
    expect(listGroupItemVariants({ action: true })).toContain('list-group-item-action');
    expect(listGroupItemVariants({ pinned: true })).toContain('list-group-item-pinned');
  });

  it('combines action and pinned', () => {
    const classes = listGroupItemVariants({ action: true, pinned: true });
    expect(classes).toContain('list-group-item');
    expect(classes).toContain('list-group-item-action');
    expect(classes).toContain('list-group-item-pinned');
  });
});

describe('listTextVariants', () => {
  it('generates the primary class by default', () => {
    expect(listTextVariants()).toContain('list-text-primary');
  });

  it('generates classes for each variant', () => {
    expect(listTextVariants({ variant: 'primary' })).toContain('list-text-primary');
    expect(listTextVariants({ variant: 'secondary' })).toContain('list-text-secondary');
  });
});
