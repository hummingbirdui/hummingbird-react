import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent, type TabsListProps } from './tabs';

function Example(
  props: React.ComponentProps<typeof Tabs> & {
    listProps?: TabsListProps;
    triggerProps?: Partial<React.ComponentProps<typeof TabsTrigger>>;
  }
) {
  const { listProps, triggerProps, ...rootProps } = props;
  return (
    <Tabs defaultValue="a" {...rootProps}>
      <TabsList {...listProps}>
        <TabsTrigger value="a" {...triggerProps}>
          Tab A
        </TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
        <TabsTrigger value="c">Tab C</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Panel A</TabsContent>
      <TabsContent value="b">Panel B</TabsContent>
      <TabsContent value="c">Panel C</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  describe('Rendering', () => {
    it('renders the tablist with all tabs', () => {
      render(<Example />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument();
    });

    it('shows only the panel of the selected tab', () => {
      render(<Example />);
      expect(screen.getByText('Panel A')).toBeInTheDocument();
      expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
      expect(screen.queryByText('Panel C')).not.toBeInTheDocument();
    });

    it('selects no tab when no value or defaultValue is given', () => {
      render(
        <Tabs>
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Panel A</TabsContent>
          <TabsContent value="b">Panel B</TabsContent>
        </Tabs>
      );
      expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab A' })).not.toHaveClass('active');
      expect(screen.getByRole('tab', { name: 'Tab B' })).not.toHaveClass('active');
    });
  });

  describe('Structure & classes', () => {
    it('marks the parts with data-slot attributes', () => {
      render(<Example />);
      expect(document.querySelector('[data-slot="tabs"]')).toBeInTheDocument();
      expect(screen.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list');
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute(
        'data-slot',
        'tabs-trigger'
      );
      expect(screen.getByRole('tabpanel')).toHaveAttribute('data-slot', 'tabs-content');
    });

    it('applies nav and nav-tabs to the list by default', () => {
      render(<Example />);
      expect(screen.getByRole('tablist')).toHaveClass('nav', 'nav-tabs');
    });

    it('applies nav-link to every trigger', () => {
      render(<Example />);
      screen.getAllByRole('tab').forEach((tab) => {
        expect(tab).toHaveClass('nav-link');
      });
    });

    it('adds the active class only to the selected trigger', () => {
      render(<Example />);
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveClass('nav-link', 'active');
      expect(screen.getByRole('tab', { name: 'Tab B' })).not.toHaveClass('active');
      expect(screen.getByRole('tab', { name: 'Tab C' })).not.toHaveClass('active');
    });

    it('adds no base class to the root or content', () => {
      render(<Example />);
      const root = document.querySelector('[data-slot="tabs"]') as HTMLElement;
      expect(root.className).toBe('');
      expect(screen.getByRole('tabpanel').className).toBe('');
    });

    it('exposes Radix data-state on triggers and panel', () => {
      render(<Example />);
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('data-state', 'active');
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByRole('tabpanel')).toHaveAttribute('data-state', 'active');
    });
  });

  describe('List variants', () => {
    const variants = [
      { variant: 'default', expected: '' },
      { variant: 'underline', expected: 'nav-underline' },
      { variant: 'tabs', expected: 'nav-tabs' },
    ] as const;

    it('applies the line-style variant classes', () => {
      variants.forEach(({ variant, expected }) => {
        const { unmount } = render(<Example listProps={{ variant }} />);
        const list = screen.getByRole('tablist');
        expect(list).toHaveClass('nav');
        if (expected) {
          expect(list).toHaveClass(expected);
        } else {
          expect(list).not.toHaveClass('nav-tabs', 'nav-underline');
        }
        unmount();
      });
    });
  });

  describe('List colors', () => {
    const colors = [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'neutral',
    ] as const;

    it('applies all color classes', () => {
      colors.forEach((color) => {
        const { unmount } = render(<Example listProps={{ color }} />);
        expect(screen.getByRole('tablist')).toHaveClass('nav', `nav-${color}`);
        unmount();
      });
    });

    it('adds no color class for the default color', () => {
      render(<Example />);
      const list = screen.getByRole('tablist');
      colors.forEach((color) => expect(list).not.toHaveClass(`nav-${color}`));
    });

    it('combines variant and color', () => {
      render(<Example listProps={{ variant: 'underline', color: 'success' }} />);
      expect(screen.getByRole('tablist')).toHaveClass('nav', 'nav-underline', 'nav-success');
    });
  });

  describe('Interactions', () => {
    it('switches tab, active class, and panel on click', async () => {
      const user = userEvent.setup();
      render(<Example />);

      await user.click(screen.getByRole('tab', { name: 'Tab B' }));
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveClass('active');
      expect(screen.getByRole('tab', { name: 'Tab A' })).not.toHaveClass('active');
      expect(screen.getByText('Panel B')).toBeInTheDocument();
      expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
    });

    it('fires onValueChange with the clicked value', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Example onValueChange={onValueChange} />);

      await user.click(screen.getByRole('tab', { name: 'Tab C' }));
      expect(onValueChange).toHaveBeenCalledWith('c');
    });

    it('supports controlled value', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(<Example defaultValue={undefined} value="a" onValueChange={onValueChange} />);
      expect(screen.getByText('Panel A')).toBeInTheDocument();

      // Clicking reports the change but selection (and the active class) stays
      // on the controlled value until the prop is updated.
      await user.click(screen.getByRole('tab', { name: 'Tab B' }));
      expect(onValueChange).toHaveBeenCalledWith('b');
      expect(screen.getByText('Panel A')).toBeInTheDocument();
      expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveClass('active');
      expect(screen.getByRole('tab', { name: 'Tab B' })).not.toHaveClass('active');

      rerender(<Example defaultValue={undefined} value="b" onValueChange={onValueChange} />);
      expect(screen.getByText('Panel B')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveClass('active');
      expect(screen.getByRole('tab', { name: 'Tab A' })).not.toHaveClass('active');
    });

    it('supports uncontrolled usage via defaultValue', async () => {
      const user = userEvent.setup();
      render(<Example defaultValue="c" />);
      expect(screen.getByText('Panel C')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveClass('active');

      await user.click(screen.getByRole('tab', { name: 'Tab A' }));
      expect(screen.getByText('Panel A')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveClass('active');
    });

    it('does not select a disabled trigger', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Example defaultValue="b" onValueChange={onValueChange} triggerProps={{ disabled: true }} />);
      const disabledTab = screen.getByRole('tab', { name: 'Tab A' });
      expect(disabledTab).toBeDisabled();
      expect(disabledTab).toHaveAttribute('data-disabled');

      await user.click(disabledTab);
      expect(onValueChange).not.toHaveBeenCalled();
      expect(screen.getByText('Panel B')).toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('moves focus and selection with ArrowRight/ArrowLeft', async () => {
      const user = userEvent.setup();
      render(<Example />);
      act(() => screen.getByRole('tab', { name: 'Tab A' }).focus());

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveFocus();
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveClass('active');
      expect(screen.getByText('Panel B')).toBeInTheDocument();

      await user.keyboard('{ArrowLeft}');
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus();
      expect(screen.getByText('Panel A')).toBeInTheDocument();
    });

    it('loops from the last tab back to the first by default', async () => {
      const user = userEvent.setup();
      render(<Example defaultValue="c" />);
      act(() => screen.getByRole('tab', { name: 'Tab C' }).focus());

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus();
      expect(screen.getByText('Panel A')).toBeInTheDocument();
    });

    it('moves to first/last tab with Home/End', async () => {
      const user = userEvent.setup();
      render(<Example defaultValue="b" />);
      act(() => screen.getByRole('tab', { name: 'Tab B' }).focus());

      await user.keyboard('{End}');
      expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveFocus();
      expect(screen.getByText('Panel C')).toBeInTheDocument();

      await user.keyboard('{Home}');
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus();
      expect(screen.getByText('Panel A')).toBeInTheDocument();
    });

    it('uses ArrowDown/ArrowUp when orientation is vertical', async () => {
      const user = userEvent.setup();
      render(<Example orientation="vertical" />);
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');

      act(() => screen.getByRole('tab', { name: 'Tab A' }).focus());
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus();
    });

    it('only moves focus in manual activation mode until Enter is pressed', async () => {
      const user = userEvent.setup();
      render(<Example activationMode="manual" />);
      act(() => screen.getByRole('tab', { name: 'Tab A' }).focus());

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveFocus();
      // Focus moved but selection did not.
      expect(screen.getByText('Panel A')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveClass('active');

      await user.keyboard('{Enter}');
      expect(screen.getByText('Panel B')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveClass('active');
    });
  });

  describe('Class Merging', () => {
    it('merges className on the list with the nav classes', () => {
      render(<Example listProps={{ className: 'custom-list' }} />);
      expect(screen.getByRole('tablist')).toHaveClass('nav', 'nav-tabs', 'custom-list');
    });

    it('merges className on the trigger with nav-link and active', () => {
      render(<Example triggerProps={{ className: 'custom-trigger' }} />);
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveClass(
        'nav-link',
        'active',
        'custom-trigger'
      );
    });

    it('passes className through on the root and content', () => {
      render(
        <Tabs defaultValue="a" className="custom-root">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="custom-content">
            Panel A
          </TabsContent>
        </Tabs>
      );
      expect(document.querySelector('[data-slot="tabs"]')).toHaveClass('custom-root');
      expect(screen.getByRole('tabpanel')).toHaveClass('custom-content');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards refs to the underlying elements', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const listRef = React.createRef<HTMLDivElement>();
      const triggerRef = React.createRef<HTMLButtonElement>();
      const contentRef = React.createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="a" ref={rootRef}>
          <TabsList ref={listRef}>
            <TabsTrigger value="a" ref={triggerRef}>
              Tab A
            </TabsTrigger>
          </TabsList>
          <TabsContent value="a" ref={contentRef}>
            Panel A
          </TabsContent>
        </Tabs>
      );
      expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
      expect(listRef.current).toBeInstanceOf(HTMLDivElement);
      expect(listRef.current).toHaveClass('nav');
      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(triggerRef.current?.textContent).toBe('Tab A');
      expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('asChild', () => {
    it('renders the trigger as the supplied child with the nav-link classes', () => {
      render(
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a" asChild>
              <button type="button" className="custom-btn">
                Tab A
              </button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="a">Panel A</TabsContent>
        </Tabs>
      );
      const tab = screen.getByRole('tab', { name: 'Tab A' });
      expect(tab).toHaveClass('nav-link', 'active', 'custom-btn');
      expect(tab).toHaveAttribute('data-slot', 'tabs-trigger');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Tabs, 'Tabs'],
      [TabsList, 'TabsList'],
      [TabsTrigger, 'TabsTrigger'],
      [TabsContent, 'TabsContent'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('exposes tablist, tab, and tabpanel roles', () => {
      render(<Example />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('marks only the selected tab with aria-selected', () => {
      render(<Example />);
      expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveAttribute('aria-selected', 'false');
    });

    it('pairs the trigger and panel via aria-controls/aria-labelledby', () => {
      render(<Example />);
      const tab = screen.getByRole('tab', { name: 'Tab A' });
      const panel = screen.getByRole('tabpanel');
      expect(tab).toHaveAttribute('aria-controls', panel.id);
      expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    });

    it('labels the tabpanel with the selected tab', () => {
      render(<Example />);
      expect(screen.getByRole('tabpanel', { name: 'Tab A' })).toBeInTheDocument();
    });
  });
});
