import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, skeletonVariants } from './skeleton';

const getSkeleton = () => document.querySelector('[data-slot="skeleton"]') as HTMLElement;

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders a div with the base class by default', () => {
      render(<Skeleton />);
      const skeleton = getSkeleton();
      expect(skeleton.tagName).toBe('DIV');
      expect(skeleton).toHaveClass('skeleton');
      expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
    });

    it('applies the text and pulse defaults', () => {
      render(<Skeleton />);
      expect(getSkeleton()).toHaveClass('skeleton', 'skeleton-text', 'skeleton-pulse');
    });

    it('forwards arbitrary props such as style and id', () => {
      render(<Skeleton id="avatar" style={{ width: 200 }} />);
      const skeleton = getSkeleton();
      expect(skeleton).toHaveAttribute('id', 'avatar');
      expect(skeleton).toHaveStyle({ width: '200px' });
    });
  });

  describe('Variants', () => {
    const variants = [
      ['rectangle', ''],
      ['text', 'skeleton-text'],
      ['circle', 'skeleton-circle'],
      ['rounded', 'skeleton-rounded'],
    ] as const;

    variants.forEach(([variant, expected]) => {
      it(`applies "${expected || 'no shape class'}" for the ${variant} variant`, () => {
        const { unmount } = render(<Skeleton variant={variant} animation="none" />);
        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass('skeleton');
        if (expected) {
          expect(skeleton).toHaveClass(expected);
        } else {
          expect(skeleton.className.trim()).toBe('skeleton');
        }
        unmount();
      });
    });
  });

  describe('Animations', () => {
    const animations = [
      ['pulse', 'skeleton-pulse'],
      ['shimmer', 'skeleton-shimmer'],
      ['none', ''],
    ] as const;

    animations.forEach(([animation, expected]) => {
      it(`applies "${expected || 'no animation class'}" for the ${animation} animation`, () => {
        const { unmount } = render(<Skeleton variant="rectangle" animation={animation} />);
        const skeleton = getSkeleton();
        if (expected) {
          expect(skeleton).toHaveClass(expected);
        } else {
          expect(skeleton.className.trim()).toBe('skeleton');
        }
        unmount();
      });
    });
  });

  describe('Class Merging', () => {
    it('merges custom classes with variant classes', () => {
      render(<Skeleton className="w-24 h-24" />);
      expect(getSkeleton()).toHaveClass('skeleton', 'skeleton-text', 'w-24', 'h-24');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('skeleton');
    });
  });

  describe('asChild Prop', () => {
    it('renders the child element with skeleton classes', () => {
      render(
        <Skeleton asChild variant="circle">
          <span data-testid="custom" className="me-2" />
        </Skeleton>
      );
      const el = screen.getByTestId('custom');
      expect(el.tagName).toBe('SPAN');
      expect(el).toHaveClass('skeleton', 'skeleton-circle', 'me-2');
      expect(el).toHaveAttribute('data-slot', 'skeleton');
    });
  });

  describe('Display Name', () => {
    it('has the correct display name', () => {
      expect(Skeleton.displayName).toBe('Skeleton');
    });
  });

  describe('Accessibility', () => {
    it('is hidden from screen readers by default', () => {
      render(<Skeleton />);
      expect(getSkeleton()).toHaveAttribute('aria-hidden', 'true');
    });

    it('can be announced as loading via overriding aria attributes', () => {
      render(<Skeleton aria-hidden={false} role="status" aria-label="Loading" />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading');
      expect(skeleton).not.toHaveAttribute('aria-hidden', 'true');
    });
  });
});

describe('skeletonVariants', () => {
  it('returns the text pulse skeleton by default', () => {
    const classes = skeletonVariants();
    expect(classes).toContain('skeleton');
    expect(classes).toContain('skeleton-text');
    expect(classes).toContain('skeleton-pulse');
  });

  it('maps shape variants to their classes', () => {
    expect(skeletonVariants({ variant: 'circle' })).toContain('skeleton-circle');
    expect(skeletonVariants({ variant: 'rounded' })).toContain('skeleton-rounded');
  });

  it('maps animations to their classes', () => {
    expect(skeletonVariants({ animation: 'shimmer' })).toContain('skeleton-shimmer');
  });

  it('emits only the base class for rectangle with no animation', () => {
    expect(skeletonVariants({ variant: 'rectangle', animation: 'none' }).trim()).toBe('skeleton');
  });
});
