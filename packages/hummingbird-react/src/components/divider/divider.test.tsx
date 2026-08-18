import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider, dividerVariants } from './divider';

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders a separator', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('has data-slot attribute', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toHaveAttribute('data-slot', 'divider');
    });

    it('is horizontal by default', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders vertically when asked', () => {
      render(<Divider orientation="vertical" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveAttribute('data-orientation', 'vertical');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('merges a custom className rather than replacing the variants', () => {
      render(<Divider className="my-8" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('my-8');
      expect(divider).toHaveClass('divider');
    });

    it('forwards arbitrary props', () => {
      render(<Divider data-testid="rule" id="section-rule" />);
      expect(screen.getByTestId('rule')).toHaveAttribute('id', 'section-rule');
    });
  });

  describe('Accessibility', () => {
    it('exposes the separator role to assistive technology by default', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toBeInTheDocument();
      // horizontal is the implicit default for role="separator", so the
      // attribute is deliberately absent rather than spelled out.
      expect(divider).not.toHaveAttribute('aria-orientation');
    });

    it('drops the role when marked decorative', () => {
      render(<Divider decorative data-testid="rule" />);
      // A purely visual rule should not be announced at all.
      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
      expect(screen.getByTestId('rule')).toHaveAttribute('role', 'none');
    });
  });

  describe('Label', () => {
    it('renders the label between the rules', () => {
      render(<Divider label="OR" />);
      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('is still a single separator to assistive technology', () => {
      render(<Divider label="OR" />);
      // Exactly one -- the two visual rules either side are decorative, so
      // "separator" is not announced three times around one label.
      expect(screen.getAllByRole('separator')).toHaveLength(1);
    });

    it('keeps its orientation when labelled', () => {
      render(<Divider label="OR" orientation="vertical" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('accepts element content, not just text', () => {
      render(
        <Divider
          label={
            <span>
              <strong>OR</strong> continue
            </span>
          }
        />
      );
      expect(screen.getByText('OR')).toBeInTheDocument();
      expect(screen.getByText(/continue/)).toBeInTheDocument();
    });

    it('does not render a label container when no label is given', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('[data-slot="divider-label"]')).toBeNull();
    });
  });

  describe('Variants', () => {
    it('applies the default variant classes', () => {
      expect(dividerVariants()).toContain('divider');
      expect(dividerVariants()).toContain('divider-horizontal');
    });

    it.each([
      ['primary', 'divider-primary'],
      ['success', 'divider-success'],
      ['danger', 'divider-danger'],
    ] as const)('applies the %s colour class', (color, expected) => {
      expect(dividerVariants({ color })).toContain(expected);
    });

    it.each([
      ['dashed', 'divider-dashed'],
      ['dotted', 'divider-dotted'],
    ] as const)('applies the %s line style class', (lineStyle, expected) => {
      expect(dividerVariants({ lineStyle })).toContain(expected);
    });

    it.each([
      ['md', 'divider-thickness-md'],
      ['thick', 'divider-thickness-thick'],
    ] as const)('applies the %s thickness class', (thickness, expected) => {
      expect(dividerVariants({ thickness })).toContain(expected);
    });

    it('puts the variant classes on the rendered element', () => {
      render(<Divider color="danger" lineStyle="dashed" thickness="thick" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider-danger');
      expect(divider).toHaveClass('divider-dashed');
      expect(divider).toHaveClass('divider-thickness-thick');
    });
  });
});
