import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, avatarVariants } from './avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders the avatar root element', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-slot', 'avatar');
      expect(avatar).toHaveClass('avatar');
    });

    it('renders the fallback content', () => {
      render(
        <Avatar>
          <Avatar.Fallback>KI</Avatar.Fallback>
        </Avatar>
      );
      expect(screen.getByText('KI')).toBeInTheDocument();
    });

    it('does not render the image in jsdom (image never loads), showing the fallback instead', () => {
      // Radix Avatar.Image only renders once the image has actually loaded,
      // which never happens in jsdom — the fallback is shown instead.
      render(
        <Avatar>
          <Avatar.Image src="/avatar.png" alt="User avatar" />
          <Avatar.Fallback>KI</Avatar.Fallback>
        </Avatar>
      );
      expect(document.querySelector('[data-slot="avatar-image"]')).not.toBeInTheDocument();
      expect(screen.getByText('KI')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies the avatar base class and data-slot to the root', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('avatar');
      expect(avatar).toHaveAttribute('data-slot', 'avatar');
    });

    it('applies the fallback classes and data-slot', () => {
      render(
        <Avatar>
          <Avatar.Fallback>KI</Avatar.Fallback>
        </Avatar>
      );
      const fallback = screen.getByText('KI');
      expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
      expect(fallback).toHaveClass('avatar-name', 'rounded-full');
    });

    it('applies the group class and data-slot', () => {
      render(<Avatar.Group data-testid="group" />);
      const group = screen.getByTestId('group');
      expect(group).toBeInstanceOf(HTMLDivElement);
      expect(group).toHaveAttribute('data-slot', 'avatar-group');
      expect(group).toHaveClass('avatar-group');
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    it('applies size classes correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = render(<Avatar size={size} data-testid="avatar" />);
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toHaveClass('avatar');
        if (size !== 'md') {
          expect(avatar).toHaveClass(`avatar-${size}`);
        } else {
          // Medium is the default, no extra class
          expect(avatar.className.trim()).toBe('avatar');
        }
        unmount();
      });
    });
  });

  describe('Status', () => {
    const statuses = ['online', 'offline', 'away', 'busy'] as const;

    it('applies status classes correctly', () => {
      statuses.forEach((status) => {
        const { unmount } = render(<Avatar status={status} data-testid="avatar" />);
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toHaveClass('avatar', `avatar-status-${status}`);
        unmount();
      });
    });

    it('applies no status class by default', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar.className).not.toContain('avatar-status');
    });

    it('combines size and status', () => {
      render(<Avatar size="lg" status="online" data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('avatar', 'avatar-lg', 'avatar-status-online');
    });
  });

  describe('Class Merging', () => {
    it('merges custom className on the root', () => {
      render(<Avatar size="sm" className="custom-class" data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('avatar', 'avatar-sm', 'custom-class');
    });

    it('merges custom className on the fallback', () => {
      render(
        <Avatar>
          <Avatar.Fallback className="custom-fallback">KI</Avatar.Fallback>
        </Avatar>
      );
      expect(screen.getByText('KI')).toHaveClass('avatar-name', 'rounded-full', 'custom-fallback');
    });

    it('merges custom className on the group', () => {
      render(<Avatar.Group className="custom-group" data-testid="group" />);
      expect(screen.getByTestId('group')).toHaveClass('avatar-group', 'custom-group');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the avatar root element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Avatar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.className).toContain('avatar');
    });

    it('forwards ref to the fallback element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        <Avatar>
          <Avatar.Fallback ref={ref}>KI</Avatar.Fallback>
        </Avatar>
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe('KI');
    });

    it('forwards ref to the group element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Avatar.Group ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('avatar-group');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Avatar, 'Avatar'],
      [Avatar.Image, 'Avatar.Image'],
      [Avatar.Fallback, 'Avatar.Fallback'],
      [Avatar.Group, 'Avatar.Group'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('renders the root as a span (decorative container)', () => {
      render(<Avatar data-testid="avatar" />);
      expect(screen.getByTestId('avatar').tagName).toBe('SPAN');
    });

    it('supports aria-label on the root', () => {
      render(
        <Avatar aria-label="User avatar">
          <Avatar.Fallback>KI</Avatar.Fallback>
        </Avatar>
      );
      expect(screen.getByLabelText('User avatar')).toBeInTheDocument();
    });

    it('exposes fallback initials as accessible text', () => {
      render(
        <Avatar>
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>
      );
      expect(screen.getByText('AB')).toBeVisible();
    });
  });
});

describe('avatarVariants', () => {
  it('generates the base class by default', () => {
    const classes = avatarVariants();
    expect(classes).toContain('avatar');
    expect(classes).not.toContain('avatar-status');
  });

  it('generates size classes', () => {
    expect(avatarVariants({ size: 'xs' })).toContain('avatar-xs');
    expect(avatarVariants({ size: 'sm' })).toContain('avatar-sm');
    expect(avatarVariants({ size: 'lg' })).toContain('avatar-lg');
    expect(avatarVariants({ size: 'md' }).trim()).toBe('avatar');
  });

  it('generates status classes', () => {
    expect(avatarVariants({ status: 'online' })).toContain('avatar-status-online');
    expect(avatarVariants({ status: 'offline' })).toContain('avatar-status-offline');
    expect(avatarVariants({ status: 'away' })).toContain('avatar-status-away');
    expect(avatarVariants({ status: 'busy' })).toContain('avatar-status-busy');
  });

  it('combines size and status', () => {
    const classes = avatarVariants({ size: 'lg', status: 'busy' });
    expect(classes).toContain('avatar');
    expect(classes).toContain('avatar-lg');
    expect(classes).toContain('avatar-status-busy');
  });
});
