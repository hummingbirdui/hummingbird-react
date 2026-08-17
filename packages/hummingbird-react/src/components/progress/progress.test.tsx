import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress, progressBarVariants } from './progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders a progressbar with the base classes', () => {
      render(
        <Progress value={25} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      const root = screen.getByRole('progressbar', { name: 'Loading' });
      expect(root).toHaveClass('progress');
      expect(root).toHaveAttribute('data-slot', 'progress');
      const bar = root.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar).toHaveClass('progress-bar');
    });

    it('renders a default bar when no children are given', () => {
      render(<Progress value={40} aria-label="Loading" />);
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar).toHaveClass('progress-bar');
      expect(bar.style.width).toBe('40%');
    });

    it('sizes the bar from value', () => {
      render(
        <Progress value={25} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar.style.width).toBe('25%');
    });

    it('sizes the bar from value relative to max', () => {
      render(
        <Progress value={25} max={50} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar.style.width).toBe('50%');
    });

    it('renders label content inside the bar', () => {
      render(
        <Progress value={75} aria-label="Loading">
          <Progress.Bar>75%</Progress.Bar>
        </Progress>
      );
      expect(screen.getByText('75%')).toHaveAttribute('data-slot', 'progress-bar');
    });

    it('renders an indeterminate bar without a width', () => {
      render(
        <Progress value={null} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar.style.width).toBe('');
    });
  });

  describe('Colors', () => {
    it('applies no extra class for the default primary color', () => {
      render(
        <Progress value={50} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar.className.trim()).toBe('progress-bar');
    });

    const colors = ['secondary', 'info', 'success', 'warning', 'danger'] as const;
    colors.forEach((color) => {
      it(`applies bg-${color} for the ${color} color`, () => {
        const { unmount } = render(
          <Progress value={50} aria-label="Loading">
            <Progress.Bar color={color} />
          </Progress>
        );
        const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
        expect(bar).toHaveClass('progress-bar', `bg-${color}`);
        unmount();
      });
    });
  });

  describe('Striped and Animated', () => {
    it('applies the striped class', () => {
      render(
        <Progress value={50} aria-label="Loading">
          <Progress.Bar striped />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar).toHaveClass('progress-bar', 'progress-bar-striped');
    });

    it('applies the animated class alongside striped', () => {
      render(
        <Progress value={50} aria-label="Loading">
          <Progress.Bar striped animated />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar).toHaveClass('progress-bar-striped', 'progress-bar-animated');
    });
  });

  describe('Stacked', () => {
    it('renders the stacked container with segment widths on the roots', () => {
      render(
        <Progress.Stacked aria-label="Stacked progress">
          <Progress value={20} aria-label="Segment one">
            <Progress.Bar />
          </Progress>
          <Progress value={30} aria-label="Segment two">
            <Progress.Bar color="danger" />
          </Progress>
        </Progress.Stacked>
      );
      const stacked = document.querySelector('[data-slot="progress-stacked"]') as HTMLElement;
      expect(stacked).toHaveClass('progress-stacked');

      const segments = screen.getAllByRole('progressbar');
      expect(segments).toHaveLength(2);
      expect(segments[0].style.width).toBe('20%');
      expect(segments[1].style.width).toBe('30%');

      // in a stacked layout the bars fill their segment via CSS, not inline width
      const bars = stacked.querySelectorAll<HTMLElement>('[data-slot="progress-bar"]');
      expect(bars[0].style.width).toBe('');
      expect(bars[1].style.width).toBe('');
    });
  });

  describe('Class Merging', () => {
    it('merges custom classes on the root', () => {
      render(
        <Progress value={50} aria-label="Loading" className="h-3">
          <Progress.Bar />
        </Progress>
      );
      expect(screen.getByRole('progressbar')).toHaveClass('progress', 'h-3');
    });

    it('merges custom classes on the bar', () => {
      render(
        <Progress value={50} aria-label="Loading">
          <Progress.Bar className="custom-bar" />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar).toHaveClass('progress-bar', 'custom-bar');
    });

    it('lets a custom style override the computed width', () => {
      render(
        <Progress value={50} aria-label="Loading">
          <Progress.Bar style={{ width: '10%' }} />
        </Progress>
      );
      const bar = document.querySelector('[data-slot="progress-bar"]') as HTMLElement;
      expect(bar.style.width).toBe('10%');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Progress value={50} aria-label="Loading" ref={ref}>
          <Progress.Bar />
        </Progress>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('progress');
    });

    it('forwards ref to the bar element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Progress value={50} aria-label="Loading">
          <Progress.Bar ref={ref} />
        </Progress>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('progress-bar');
    });
  });

  describe('Display Names', () => {
    it('has correct display names', () => {
      expect(Progress.displayName).toBe('Progress');
      expect(Progress.Bar.displayName).toBe('Progress.Bar');
      expect(Progress.Stacked.displayName).toBe('Progress.Stacked');
    });
  });

  describe('Accessibility', () => {
    it('exposes progressbar semantics with the current value', () => {
      render(
        <Progress value={25} aria-label="Upload progress">
          <Progress.Bar />
        </Progress>
      );
      const root = screen.getByRole('progressbar', { name: 'Upload progress' });
      expect(root).toHaveAttribute('aria-valuenow', '25');
      expect(root).toHaveAttribute('aria-valuemax', '100');
    });

    it('reflects a custom max', () => {
      render(
        <Progress value={25} max={50} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      const root = screen.getByRole('progressbar');
      expect(root).toHaveAttribute('aria-valuenow', '25');
      expect(root).toHaveAttribute('aria-valuemax', '50');
    });

    it('omits aria-valuenow when indeterminate', () => {
      render(
        <Progress value={null} aria-label="Loading">
          <Progress.Bar />
        </Progress>
      );
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
    });
  });
});

describe('progressBarVariants', () => {
  it('returns the base class by default', () => {
    expect(progressBarVariants().trim()).toBe('progress-bar');
  });

  it('maps colors to bg classes', () => {
    expect(progressBarVariants({ color: 'danger' })).toContain('bg-danger');
    expect(progressBarVariants({ color: 'success' })).toContain('bg-success');
  });

  it('maps striped and animated to their classes', () => {
    const classes = progressBarVariants({ striped: true, animated: true });
    expect(classes).toContain('progress-bar-striped');
    expect(classes).toContain('progress-bar-animated');
  });
});
