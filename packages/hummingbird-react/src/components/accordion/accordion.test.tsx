import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './accordion';

// Three standard items shared by the behavioral tests.
function Items(props: { itemProps?: Partial<React.ComponentProps<typeof Accordion.Item>> }) {
  const { itemProps } = props;
  return (
    <>
      <Accordion.Item value="a" {...itemProps}>
        <Accordion.Header>
          <Accordion.Trigger>Item A</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content A</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Header>
          <Accordion.Trigger>Item B</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content B</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="c">
        <Accordion.Header>
          <Accordion.Trigger>Item C</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content C</Accordion.Content>
      </Accordion.Item>
    </>
  );
}

describe('Accordion', () => {
  describe('Rendering', () => {
    it('renders the root and all item triggers', () => {
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      expect(document.querySelector('[data-slot="accordion"]')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Item A' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Item B' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Item C' })).toBeInTheDocument();
    });

    it('keeps all content closed by default', () => {
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      expect(screen.queryByText('Content A')).not.toBeInTheDocument();
      expect(screen.queryByText('Content B')).not.toBeInTheDocument();
    });

    it('shows the content of the defaultValue item', () => {
      render(
        <Accordion type="single" collapsible defaultValue="b">
          <Items />
        </Accordion>
      );
      expect(screen.queryByText('Content A')).not.toBeInTheDocument();
      expect(screen.getByText('Content B')).toBeInTheDocument();
    });

    it('opens an item when its trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      await user.click(screen.getByRole('button', { name: 'Item A' }));
      expect(await screen.findByText('Content A')).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    function setup() {
      render(
        <Accordion type="single" collapsible defaultValue="a">
          <Items />
        </Accordion>
      );
      return {
        root: document.querySelector('[data-slot="accordion"]') as HTMLElement,
        item: document.querySelector('[data-slot="accordion-item"]') as HTMLElement,
        header: document.querySelector('[data-slot="accordion-header"]') as HTMLElement,
        trigger: screen.getByRole('button', { name: 'Item A' }),
        content: document.querySelector('[data-slot="accordion-content"]') as HTMLElement,
        body: document.querySelector('[data-slot="accordion-body"]') as HTMLElement,
      };
    }

    it('applies accordion to the root', () => {
      const { root } = setup();
      expect(root).toHaveClass('accordion');
    });

    it('applies accordion-item to items', () => {
      const { item } = setup();
      expect(item).toHaveClass('accordion-item');
    });

    it('applies accordion-header to the header', () => {
      const { header } = setup();
      expect(header).toHaveClass('accordion-header');
    });

    it('applies accordion-button and the icon-transform utilities to the trigger', () => {
      const { trigger } = setup();
      expect(trigger).toHaveClass(
        'accordion-button',
        'data-[state=closed]:[&::after]:[transform:none]',
        'data-[state=open]:[&::after]:[transform:var(--accordion-btn-icon-transform)]',
        'disabled:cursor-not-allowed',
        'disabled:opacity-60'
      );
      expect(trigger).toHaveAttribute('data-slot', 'accordion-button');
    });

    it('applies the animation utilities to the content and accordion-body to the inner div', () => {
      const { content, body } = setup();
      expect(content).toHaveClass(
        'overflow-hidden',
        'data-[state=open]:animate-accordion-down',
        'data-[state=closed]:animate-accordion-up'
      );
      expect(body).toHaveClass('accordion-body');
      expect(content).toContainElement(body);
    });

    it('exposes Radix data-state on item, trigger, and content', () => {
      const { item, trigger, content } = setup();
      expect(item).toHaveAttribute('data-state', 'open');
      expect(trigger).toHaveAttribute('data-state', 'open');
      expect(content).toHaveAttribute('data-state', 'open');
      expect(screen.getByRole('button', { name: 'Item B' })).toHaveAttribute(
        'data-state',
        'closed'
      );
    });
  });

  describe('Single type', () => {
    it('only allows one item open at a time', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible defaultValue="a">
          <Items />
        </Accordion>
      );
      expect(screen.getByText('Content A')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Item B' }));
      expect(await screen.findByText('Content B')).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByText('Content A')).not.toBeInTheDocument());
    });

    it('closes the open item on click when collapsible', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible defaultValue="a">
          <Items />
        </Accordion>
      );
      await user.click(screen.getByRole('button', { name: 'Item A' }));
      await waitFor(() => expect(screen.queryByText('Content A')).not.toBeInTheDocument());
    });

    it('keeps the open item open when not collapsible', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" defaultValue="a">
          <Items />
        </Accordion>
      );
      await user.click(screen.getByRole('button', { name: 'Item A' }));
      expect(screen.getByText('Content A')).toBeInTheDocument();
    });

    it('supports uncontrolled usage via defaultValue', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible defaultValue="c">
          <Items />
        </Accordion>
      );
      expect(screen.getByText('Content C')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Item A' }));
      expect(await screen.findByText('Content A')).toBeInTheDocument();
    });

    it('supports controlled usage via value + onValueChange', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Accordion type="single" value="a" onValueChange={onValueChange}>
          <Items />
        </Accordion>
      );
      expect(screen.getByText('Content A')).toBeInTheDocument();

      // Clicking reports the change but the open item does not move until the
      // controlled value is updated.
      await user.click(screen.getByRole('button', { name: 'Item B' }));
      expect(onValueChange).toHaveBeenCalledWith('b');
      expect(screen.getByText('Content A')).toBeInTheDocument();
      expect(screen.queryByText('Content B')).not.toBeInTheDocument();

      rerender(
        <Accordion type="single" value="b" onValueChange={onValueChange}>
          <Items />
        </Accordion>
      );
      expect(await screen.findByText('Content B')).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByText('Content A')).not.toBeInTheDocument());
    });
  });

  describe('Multiple type', () => {
    it('allows several items open at once', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="multiple">
          <Items />
        </Accordion>
      );
      await user.click(screen.getByRole('button', { name: 'Item A' }));
      await user.click(screen.getByRole('button', { name: 'Item B' }));
      expect(screen.getByText('Content A')).toBeInTheDocument();
      expect(screen.getByText('Content B')).toBeInTheDocument();
    });

    it('supports defaultValue as an array', () => {
      render(
        <Accordion type="multiple" defaultValue={['a', 'c']}>
          <Items />
        </Accordion>
      );
      expect(screen.getByText('Content A')).toBeInTheDocument();
      expect(screen.queryByText('Content B')).not.toBeInTheDocument();
      expect(screen.getByText('Content C')).toBeInTheDocument();
    });

    it('reports value changes as an array', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Accordion type="multiple" defaultValue={['a']} onValueChange={onValueChange}>
          <Items />
        </Accordion>
      );
      await user.click(screen.getByRole('button', { name: 'Item B' }));
      expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
    });
  });

  describe('Disabled', () => {
    it('disables every trigger when the root is disabled', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible disabled>
          <Items />
        </Accordion>
      );
      const trigger = screen.getByRole('button', { name: 'Item A' });
      expect(trigger).toBeDisabled();
      await user.click(trigger);
      expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    });

    it('disables a single item via the item disabled prop', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items itemProps={{ disabled: true }} />
        </Accordion>
      );
      const disabledTrigger = screen.getByRole('button', { name: 'Item A' });
      expect(disabledTrigger).toBeDisabled();
      await user.click(disabledTrigger);
      expect(screen.queryByText('Content A')).not.toBeInTheDocument();

      // Other items still work.
      await user.click(screen.getByRole('button', { name: 'Item B' }));
      expect(await screen.findByText('Content B')).toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('toggles an item with Enter', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      screen.getByRole('button', { name: 'Item A' }).focus();
      await user.keyboard('{Enter}');
      expect(await screen.findByText('Content A')).toBeInTheDocument();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(screen.queryByText('Content A')).not.toBeInTheDocument());
    });

    it('toggles an item with Space', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      screen.getByRole('button', { name: 'Item B' }).focus();
      await user.keyboard(' ');
      expect(await screen.findByText('Content B')).toBeInTheDocument();
    });

    it('moves focus between triggers with ArrowDown/ArrowUp', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      screen.getByRole('button', { name: 'Item A' }).focus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('button', { name: 'Item B' })).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('button', { name: 'Item C' })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('button', { name: 'Item B' })).toHaveFocus();
    });

    it('moves focus to first/last trigger with Home/End', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      screen.getByRole('button', { name: 'Item B' }).focus();

      await user.keyboard('{End}');
      expect(screen.getByRole('button', { name: 'Item C' })).toHaveFocus();

      await user.keyboard('{Home}');
      expect(screen.getByRole('button', { name: 'Item A' })).toHaveFocus();
    });

    it('uses ArrowRight/ArrowLeft when orientation is horizontal', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible orientation="horizontal">
          <Items />
        </Accordion>
      );
      const root = document.querySelector('[data-slot="accordion"]') as HTMLElement;
      expect(root).toHaveAttribute('data-orientation', 'horizontal');

      screen.getByRole('button', { name: 'Item A' }).focus();
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('button', { name: 'Item B' })).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(screen.getByRole('button', { name: 'Item A' })).toHaveFocus();
    });
  });

  describe('Class Merging', () => {
    it('merges className on the root with accordion', () => {
      render(
        <Accordion type="single" collapsible className="custom-root">
          <Items />
        </Accordion>
      );
      const root = document.querySelector('[data-slot="accordion"]') as HTMLElement;
      expect(root).toHaveClass('accordion', 'custom-root');
    });

    it('merges className on the item, header, and trigger', () => {
      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="a" className="custom-item">
            <Accordion.Header className="custom-header">
              <Accordion.Trigger className="custom-trigger">Item A</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content A</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      expect(document.querySelector('[data-slot="accordion-item"]')).toHaveClass(
        'accordion-item',
        'custom-item'
      );
      expect(document.querySelector('[data-slot="accordion-header"]')).toHaveClass(
        'accordion-header',
        'custom-header'
      );
      expect(screen.getByRole('button', { name: 'Item A' })).toHaveClass(
        'accordion-button',
        'custom-trigger'
      );
    });

    it('applies Accordion.Content className to the accordion-body div', () => {
      render(
        <Accordion type="single" collapsible defaultValue="a">
          <Accordion.Item value="a">
            <Accordion.Header>
              <Accordion.Trigger>Item A</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="custom-body">Content A</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      const body = document.querySelector('[data-slot="accordion-body"]') as HTMLElement;
      expect(body).toHaveClass('accordion-body', 'custom-body');
      // The outer Radix content wrapper keeps only the fixed animation classes.
      const content = document.querySelector('[data-slot="accordion-content"]') as HTMLElement;
      expect(content).not.toHaveClass('custom-body');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards refs to the underlying elements', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const itemRef = React.createRef<HTMLDivElement>();
      const triggerRef = React.createRef<HTMLButtonElement>();
      const contentRef = React.createRef<HTMLDivElement>();
      render(
        <Accordion type="single" collapsible defaultValue="a" ref={rootRef}>
          <Accordion.Item value="a" ref={itemRef}>
            <Accordion.Header>
              <Accordion.Trigger ref={triggerRef}>Item A</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content ref={contentRef}>Content A</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
      expect(rootRef.current).toHaveClass('accordion');
      expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
      expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
      expect(triggerRef.current?.textContent).toBe('Item A');
      expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('asChild', () => {
    it('renders the trigger as the supplied child with accordion classes', () => {
      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="a">
            <Accordion.Header>
              <Accordion.Trigger asChild>
                <button type="button" className="custom-btn">
                  Item A
                </button>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content A</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      const trigger = screen.getByRole('button', { name: 'Item A' });
      expect(trigger).toHaveClass('accordion-button', 'custom-btn');
      expect(trigger).toHaveAttribute('data-slot', 'accordion-button');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Accordion, 'Accordion'],
      [Accordion.Item, 'Accordion.Item'],
      [Accordion.Header, 'Accordion.Header'],
      [Accordion.Trigger, 'Accordion.Trigger'],
      [Accordion.Content, 'Accordion.Content'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('toggles aria-expanded on the trigger', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      const trigger = screen.getByRole('button', { name: 'Item A' });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders the header as a heading containing the trigger', () => {
      render(
        <Accordion type="single" collapsible>
          <Items />
        </Accordion>
      );
      const heading = screen.getAllByRole('heading')[0];
      expect(heading).toContainElement(screen.getByRole('button', { name: 'Item A' }));
    });

    it('exposes open content as a region labelled by its trigger', () => {
      render(
        <Accordion type="single" collapsible defaultValue="a">
          <Items />
        </Accordion>
      );
      const region = screen.getByRole('region');
      const trigger = screen.getByRole('button', { name: 'Item A' });
      expect(region).toHaveAttribute('aria-labelledby', trigger.id);
    });

    it('wires trigger aria-controls to the content id', () => {
      render(
        <Accordion type="single" collapsible defaultValue="a">
          <Items />
        </Accordion>
      );
      const trigger = screen.getByRole('button', { name: 'Item A' });
      const content = document.querySelector('[data-slot="accordion-content"]') as HTMLElement;
      expect(trigger).toHaveAttribute('aria-controls', content.id);
    });
  });
});
